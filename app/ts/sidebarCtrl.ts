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

import { app } from "./app.js";

declare const angular;

app.controller("sidebarCtrl", function ($scope, Spec, projectListService) {
  // Project Listing for Sidebar

  // Updates sidebar with new items and edits
  $scope.$on("refreshSidebar", function () {
    $scope.projectGroups = [];
    Spec.query({ owner: $scope.user }, function (specs) {
      $scope.projectGroups = [];
      angular.forEach(specs, function (spec, index) {
        projectListService.addProject($scope, spec);
      });
    });
  });
});
