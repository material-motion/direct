// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

app.provider("Spec", function () {
  // @ts-ignore
  this.$get = [
    "$resource",
    "envService",
    "localStorageService",
    "$timeout",
    function ($resource, envService, localStorageService, $timeout) {
      if (envService.is("production")) {
        // @ts-ignore
        var Spec = $resource(
          "/api/spec/:id",
          {},
          {
            update: {
              method: "PUT",
            },
          }
        );
      } else {
        // not on a production environment, return mocked Spec with localStorage
        // @ts-ignore
        var Spec = {
          query: function (params, callback) {
            console.log("localstorage query");
            $timeout(function () {
              // simulate async so the callback works
              var specs = [];
              var lsKeys = localStorageService.keys();
              lsKeys.forEach(function (lsKey) {
                var spec = localStorageService.get(lsKey);
                var flat = {
                  group: spec.groupHandle, // match on groupHandle
                  id: spec.id,
                  owner: spec.permissions.owner,
                  privacy: spec.permissions.privacy,
                  timestamp: (Date.now() / 1000) | 0,
                  title: spec.title,
                };
                var isMatch = Object.keys(params).every(function (paramKey) {
                  return flat[paramKey] == params[paramKey];
                });
                if (isMatch) {
                  flat.group = spec.group; // return group name
                  // @ts-ignore
                  specs.push(flat);
                }
              });
              callback(specs);
            }, 0);
          },
          get: function (params, callback) {
            console.log("localstorage get");
            $timeout(function () {
              // simulate async so the callback works
              var data = localStorageService.get(params.id);
              callback(data);
            }, 0);
          },
          save: function (value, callback) {
            console.log("localstorage save");
            $timeout(function () {
              // simulate async so the callback works
              var id = Math.round(Math.random() * 100000000);
              while (localStorageService.get(id))
                id = Math.round(Math.random() * 100000000);

              value.id = id;
              localStorageService.set(id, value);
              callback({ id: id });
            }, 0);
          },
          update: function (params, value, callback) {
            $timeout(function () {
              // simulate async so the callback works
              console.log("localstorage update");
              localStorageService.set(params.id, value);
              callback(value);
            }, 0);
          },
          delete: function (params, callback) {
            console.log("localstorage delete");
            $timeout(function () {
              // simulate async so the callback works
              localStorageService.remove(params.id);
              callback({});
            }, 0);
          },
        };
      }

      return Spec;
    },
  ];
});
