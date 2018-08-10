#!/usr/bin/env python
#
# Copyright 2018 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import webapp2
import os
import json
import yaml
import jinja2
import urllib
import logging

from models import Spec

from google.appengine.api import memcache
from google.appengine.ext import db
from google.appengine.api import users

template_dir = os.path.join(os.path.dirname(__file__), 'templates')
jinja_environment = jinja2.Environment(
                      loader=jinja2.FileSystemLoader(template_dir),
                      autoescape=True,
                      variable_start_string='{{{',
                      variable_end_string='}}}'
                    )

config = yaml.safe_load(open('config.yaml'))

class BaseHandler(webapp2.RequestHandler):
  def write(self, *a, **kw):
    self.response.out.write(*a,**kw)

  def render_str(self, template, params):
    t = jinja_environment.get_template(template)

    if self.adminCheck():
      params['admin'] = True;

    return t.render(params)

  def render(self, template, kw):
    self.write(self.render_str(template, kw))

  def adminCheck(self):
    user = users.get_current_user()
    if user:
      if users.is_current_user_admin():
        return True;
      else:
        return False
    else:
      return False

class MainHandler(BaseHandler):
  def get(self):
    if config['headers']:
      for key, value in config['headers'].items():
        self.response.headers.add_header(key, value)
    self.render('index.html', {'title': 'Motion Spec'})

class ApiHandler(webapp2.RequestHandler):
  # CREATE
  def post(self):
    find_key = db.Key.from_path('Spec', 1)
    key_batch = db.allocate_ids(find_key, 1)
    spec = Spec(id=key_batch[0])
    new_id = spec.put().id()
    if self.request.body != '':
      self.put(new_id)
    self.response.headers['Content-Type'] = 'application/json'
    self.response.write(json.dumps({'id':new_id}))

  # VIEW
  def get(self, id=None):
    self.response.headers.add_header('Access-Control-Allow-Origin', '*')
    self.response.headers.add_header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    self.response.headers.add_header('Access-Control-Allow-Headers', 'X-Requested-With, content-type')

    if id:
      spec = Spec.get_by_id(int(id))
      if spec:
        self.response.write(spec.json)
      else:
        self.response.set_status('404')
    else:
      group = self.request.get('group')
      sort_by = self.request.get('sortby')
      owner = self.request.get('owner')

      specs = Spec.get_infos(1000, group, sort_by, owner) # TODO: Increased output from 100 to 1000, must implement pagination eventually
      self.response.write(json.dumps(specs))

  # EDIT
  def put(self, id=None):
    if id is None:
      self.response.set_status('404')
      return
    spec = Spec.get_by_id(int(id))
    if spec:
      # Spec Owner
      payload = json.loads(self.request.body)
      owner = payload['permissions']['owner']

      # Current User
      user = users.get_current_user()
      if user and user.nickname() == owner:
        spec.load_json_with_id(self.request.body, id)
        spec.put()
      else:
        self.response.set_status('403')
    else:
      self.response.set_status('404')

  # DELETE
  def delete(self, id=None):
    if id is None:
      self.response.set_status('404')
      return
    spec = Spec.get_by_id(int(id))
    if spec:
      spec.key.delete()
    else:
      self.response.set_status('404')

# Get current user
class UserHandler(webapp2.RequestHandler):
  def get(self, id=None):
    user = users.get_current_user()
    if user:
      self.response.write(user.nickname())
    else:
      # self.response.write('andershaig')
      self.response.set_status('403')

# Setup Routes
app = webapp2.WSGIApplication([
  # CLIENT SIDE PAGES (LET ANGULAR HANDLE ROUTING)
  (r'/', MainHandler),
  # OTHER SERVER PAGES / ENDPOINTS
  (r'/api/spec', ApiHandler),
  (r'/api/spec/(\d+)', ApiHandler),
  (r'/user', UserHandler)
], debug=True)
