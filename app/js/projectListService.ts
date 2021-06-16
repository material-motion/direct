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

app.service("projectListService", function () {
  // multispec selection
  // @ts-ignore
  this.toggleSelected = function ($scope, item) {
    var idx = $scope.selected.indexOf(item);
    if (idx > -1) {
      $scope.selected.splice(idx, 1);
    } else {
      $scope.selected.push(item);
    }
  };
  // @ts-ignore
  this.isSelected = function ($scope, item) {
    return $scope.selected.indexOf(item) > -1;
  };
  // @ts-ignore
  this.selectedToRouteParam = function ($scope) {
    return $scope.selected
      .map(function (spec) {
        return spec.id;
      })
      .join("+");
  };

  // project list construction
  // @ts-ignore
  this.addProject = function ($scope, spec) {
    var i = $scope.projectGroups.length;
    var projectAdded = false;

    spec.group = spec.group || "";

    // Loop through all groups
    while (i--) {
      // If title matches, add to projects array
      if (
        $scope.projectGroups[i].title.toLowerCase() === spec.group.toLowerCase()
      ) {
        $scope.projectGroups[i].projects.push(spec);
        projectAdded = true;
      }
    }

    // if not, create the group then add the project
    if (!projectAdded) {
      var grp = {
        title: spec.group,
        projects: [],
        handle: spec.group,
      };
      // @ts-ignore
      grp.projects.push(spec);
      $scope.projectGroups.push(grp);
    }
  };
  // @ts-ignore
  this.deleteProject = function ($scope, project) {
    for (var i = 0; i < $scope.projectGroups.length; i++) {
      if (
        $scope.projectGroups[i].title.toLowerCase() ===
        project.group.toLowerCase()
      ) {
        var group = $scope.projectGroups[i];

        // Delete project from array
        if (group.projects.length > 1) {
          var index = group.projects.indexOf(project);
          if (index > -1) {
            group.projects.splice(index, 1);
          }
        } else {
          if ($scope.projectGroups) {
            var index = $scope.projectGroups.indexOf(group);
            if (index > -1) {
              $scope.projectGroups.splice(index, 1);
            }
          } else {
            var index = group.projects.indexOf(project);
            if (index > -1) {
              group.projects.splice(index, 1);
            }
          }
        }
      }
    }
  };
});
