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

app.controller(
  "userCtrl",
  function ($scope, $routeParams, Spec, projectListService) {
    // Config
    $scope.hasProjects = true;
    $scope.projectGroups = [];
    $scope.selected = [];

    // Check if the current user is the owner
    if ($routeParams.user === $scope.user) {
      $scope.isOwner = true;
    } else {
      $scope.isOwner = false;
    }

    Spec.query({ owner: $routeParams.user }, function (specs) {
      // Show new project message if necessary
      if (specs.length < 1) {
        $scope.hasProjects = false;
      }

      angular.forEach(specs, function (spec, index) {
        projectListService.addProject($scope, spec);
      });
    });

    $scope.toggleSelected = function (item) {
      projectListService.toggleSelected($scope, item);
    };

    $scope.isSelected = function (item) {
      return projectListService.isSelected($scope, item);
    };

    $scope.selectedToRouteParam = function () {
      return projectListService.selectedToRouteParam($scope);
    };

    $scope.deleteProject = function (ev, project) {
      $scope.$parent.deleteProject(ev, project, function () {
        projectListService.deleteProject($scope, project);
      });
    };
  }
);
