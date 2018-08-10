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

app.controller('baseCtrl', function ($scope, $http, $location, $mdDialog, Spec) {

  $http({
    method: 'GET',
    url: '/user'
  }).success( function (data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
    $scope.user = data;
  }).error( function (data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.warn('> User Request Error');
    console.log(data);

    // debug test user
    $scope.user = 'test';
  });

  // Helpers
  $scope.goto = function (path) {
    $location.path(path);
  }

  /**
   * Project Helpers
   */

  // Duplicate
  $scope.duplicateProject = function (ev, project) {
    ev.preventDefault();
    ev.stopPropagation();

    // Clone project data
    Spec.get({id: project.id}, function (data) {
      var newSpec = {
        group: data.group,
        groupHandle: data.groupHandle,
        title: 'Copy of ' + data.title,
        permissions: {
          privacy: 'public',
          owner: $scope.user,
          editors: [],
          viewers: []
        },
        spec: data.spec
      }

      // Save as new
      Spec.save(newSpec, function (resp) {
        // Redirect to correct URL
        $location.path('/spec/' + resp.id);
      });
    });
  }

  // Delete
  $scope.deleteProject = function (ev, project, callback) {
    ev.preventDefault();
    ev.stopPropagation();

    // Confirmation
    var confirm = $mdDialog.confirm()
      .title('Delete Project')
      .content('Are you sure you want to delete this project?')
      .ok('Yes, delete it')
      .cancel('No, nevermind')
      .targetEvent(ev);

    $mdDialog.show(confirm).then(function () {
      // Delete project
      Spec.delete({ id: project.id }, function (resp) {
        if (callback) {
          callback();
        }
      });
    }, function () {
      // Project deletion cancelled
    });
  }
});
