#
# Copyright 2015 - present The Direct Authors. All Rights Reserved.
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
import json
import logging
from google.appengine.ext import ndb

class Permissions(ndb.Model):
  privacy = ndb.StringProperty()
  owner = ndb.StringProperty()
  editors = ndb.StringProperty(repeated=True)
  viewers = ndb.StringProperty(repeated=True)

class Spec(ndb.Model):
  title = ndb.StringProperty()
  group = ndb.StringProperty()
  groupHandle = ndb.StringProperty()
  permissions = ndb.StructuredProperty(Permissions)
  date = ndb.DateTimeProperty(auto_now_add=True)
  json = ndb.StringProperty(indexed=False)

  def load_json_with_id(self, json_string, id):
    obj = json.loads(json_string)
    obj['id'] = id;
    self.title = obj['title']
    self.group = obj['group']
    self.groupHandle = obj['groupHandle']

    # TODO(ispiro): Allow for certain parameters to be null and don't overwrite
    self.permissions = Permissions( privacy=obj['permissions']['privacy'],
                                    owner=obj['permissions']['owner'],
                                    editors=obj['permissions']['editors'],
                                    viewers=obj['permissions']['viewers'])

    self.json = json.dumps(obj)

  @staticmethod
  def get_ids(limit):
    specs = Spec.query().fetch(limit)
    id_list = []

    for k in specs:
      id_list.append(k.key.id())
    return id_list

  @staticmethod
  def get_infos(limit, group=None, sort_by=None, owner=None):
    query = Spec.query()

    if sort_by:
      if sort_by == 'date':
        query = query.order(Spec.date)
      if sort_by == 'title':
        query = query.order(Spec.title)

    if group:
      query = query.filter(Spec.groupHandle == group)

    if owner:
      query = query.filter(Spec.permissions.owner.IN([owner]))

    specs = query.fetch(limit)
    info_list = []

    for s in specs:
      info = {'id': s.key.id()}
      if s.title:
        info['title'] = s.title
      if s.group:
        info['group'] = s.group

      if s.permissions:
        if s.permissions.owner:
          info['owner'] = s.permissions.owner
        if s.permissions.privacy:
          info['privacy'] = s.permissions.privacy

      info['timestamp'] = s.date.strftime('%s')

      info_list.append(info)
    return info_list
