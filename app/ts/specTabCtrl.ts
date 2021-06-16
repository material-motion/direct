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

app.controller(
  "specTabCtrl",
  function ($scope, $location, $filter, $sce, Spec, storageService) {
    // Initial Config
    $scope.canEdit = false;
    $scope.editing = false;
    $scope.overlay = false;
    $scope.configuring = false;
    $scope.showingVideoWarning = false;
    $scope.canScrubVideo = false;
    $scope.showingCode = false;

    $scope.addingRow = null;
    $scope.selectedRow = null;
    $scope.resizingRow = null;

    $scope.getVideoSrc = function (src) {
      var URL_REGEX =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
      var ID_REGEX = /[-\w]{25,}/g;

      if (src && src.search(ID_REGEX) != -1) {
        var videoId = src.match(ID_REGEX);
        console.log("> Video is a Drive ID or Drive URL");
        // Is a drive ID
        return $sce.trustAsResourceUrl(
          "https://docs.google.com/uc?authuser=0&id=" +
            videoId +
            "&export=download"
        );
      } else if (src && src.search(URL_REGEX) != -1) {
        console.log("> Video is a full URL");
        // Is a full URL
        return $sce.trustAsResourceUrl(src);
      } else {
        // Something went wrong
        console.log("Something went wrong trying to load the video");
      }
    };

    $scope.$watch("spec.videoUrl", function () {
      if ($scope.spec) {
        $scope.spec.videoSrc = $scope.getVideoSrc($scope.spec.videoUrl);
      }
    });

    var recalculate = function () {
      if ($scope.spec) {
        var msPerFrame = 1000 / $scope.spec.fps;

        $scope.spec.duration = $scope.spec.frames * msPerFrame;

        $scope.spec.divisions.minor =
          msPerFrame * $scope.spec.divisions.minorFrames;
        $scope.spec.divisions.major =
          msPerFrame * $scope.spec.divisions.majorFrames;

        if ($scope.spec.exactTiming) {
          $scope.decimalPlaces = 2;
        } else {
          $scope.decimalPlaces = 0;
        }

        $scope.createLabels();
      }
    };

    $scope.$watchGroup(
      [
        "spec.exactTiming",
        "spec.fps",
        "spec.frames",
        "spec.divisions.minorFrames",
        "spec.divisions.majorFrames",
      ],
      function () {
        recalculate();
      }
    );

    // Autosave
    storageService.autosave($scope);

    // Initial Data Setup
    if ($scope.specId) {
      Spec.get({ id: $scope.specId }, function (data) {
        // TODO: Handle failure

        console.log(data);
        $scope.data = data;
        $scope.spec = $scope.data.spec;

        // check if can edit
        if ($scope.data.permissions.owner === $scope.user) {
          $scope.canEdit = true;
        }

        // Loop through all rows and set the easing option again
        for (var i = 0; i < $scope.spec.rows.length; i++) {
          var row = $scope.spec.rows[i];
          // Set easing.
          var easing = matchOption($scope.easingOptions, row.easing, {
            label: "Linear",
            value: "linear",
          });
          row.easing = easing;
          // Set tag.
          var tag = matchOption($scope.tagOptions, row.tag, {
            label: "None",
            value: "none",
          });
          row.tag = tag;
        }
      });
      // Check if should be editing.
      if ($location.search().create == "true") {
        $scope.editing = true;
        $scope.configuring = true;
        $scope.overlay = true;
      }
      $location.search("");
    } else {
      $scope.data = {
        group: null,
        groupHandle: null,
        title: null,
        permissions: {
          privacy: "public",
          owner: $scope.user,
          editors: [],
          viewers: [],
        },
        spec: {
          title: null,
          videoUrl: null,
          duration: 500,
          frames: 30,
          fps: 60,
          exactTiming: false,
          canvas: {
            width: 0,
          },
          divisions: {
            minor: 15, // ms
            minorFrames: 1,
            major: 75, // ms
            majorFrames: 5,
            minorCount: null,
            majorCount: null,
            minorGap: null,
            majorGap: null,
          },
          rows: [],
        },
      };

      $scope.spec = $scope.data.spec;

      // Start with editing mode on a new spec
      $scope.editing = true;
    }

    // Watch group name to make sure a handle is generated
    $scope.$watch("data.group", function () {
      if ($scope.data && $scope.data.group) {
        var handle = $scope.data.group.replace(/\s+/g, "-");
        $scope.data.groupHandle = handle.toLowerCase();
        console.log("> New Group Handle: " + $scope.data.groupHandle);
      }
    });

    // keep sidebar up to date
    $scope.$watchGroup(["data.group", "data.title"], function () {
      $scope.refreshSidebar();
    });

    // Changing Config
    $scope.editSpec = function () {
      if ($scope.canEdit) {
        $scope.editing = true;
      }
      $scope.refreshCanvas();
    };

    $scope.previewSpec = function () {
      if ($scope.canEdit) {
        $scope.editing = false;
      }
      if ($scope.configuring) {
        $scope.toggleConfig();
      }
      if ($scope.addingRow) {
        $scope.addingRow = null;
      }
      $scope.refreshCanvas();
      $location.search("");
    };

    $scope.toggleConfig = function () {
      $scope.configuring = !$scope.configuring;
      $scope.overlay = $scope.configuring;
    };

    $scope.toggleVideo = function () {
      if ($scope.editing) {
        // Add a video URL with Google Drive picker
        loadPicker($scope);
      }
    };

    $scope.toggleVideoWarning = function (show) {
      if (typeof show === "undefined") {
        $scope.showingVideoWarning = !$scope.showingVideoWarning;
      } else {
        $scope.showingVideoWarning = show;
      }
    };

    $scope.setCanScrubVideo = function (canScrub) {
      $scope.canScrubVideo = canScrub;
    };

    $scope.toggleCodePopup = function () {
      $scope.showingCode = !$scope.showingCode;
      $scope.overlay = $scope.showingCode;
    };

    $scope.closeOverlay = function () {
      // Turn off settings popup
      if ($scope.configuring) {
        $scope.toggleConfig();
      }
      // Turn off easing details
      if ($scope.showingCode) {
        $scope.toggleCodePopup();
      }
    };

    var matchOption = function (easingOrTagOptions, option, unmatchedOption) {
      if (option) {
        for (var i = 0; i < easingOrTagOptions.length; i++) {
          var opt = easingOrTagOptions[i];
          if (opt.value === option.value) {
            return opt;
          }
        }
      }
      // Not set, therefore return none.
      return unmatchedOption;
    };

    // Special case for first row adding
    $scope.firstRow = {
      adding: false,
    };

    // Grid Labels
    $scope.labels = {
      frames: [],
      ms: [],
    };

    $scope.createLabels = function () {
      $scope.labels.frames.length = 0;
      $scope.labels.ms.length = 0;

      // Calculate frame labels
      if ($scope.spec && $scope.spec.divisions.majorCount) {
        for (var i = 0; i <= $scope.spec.divisions.majorCount; i++) {
          var num = i * $scope.spec.divisions.majorFrames;
          let label = num.toString();

          if (i === 0) {
            label = "Frames";
          }

          $scope.labels.frames.push(label);
        }
      }

      // Calculate ms labels
      if ($scope.spec && $scope.spec.divisions.majorCount) {
        for (var i = 0; i <= $scope.spec.divisions.majorCount; i++) {
          var num = i * $scope.spec.divisions.major;
          let label: string = num.toString();

          if (i === 0) {
            label = "Ms";
          } else {
            label = $filter("number")(label, $scope.decimalPlaces);
          }

          $scope.labels.ms.push(label);
        }
      }
    };

    // Watch for grid computations
    $scope.$watch("spec.divisions.majorCount", function () {
      $scope.createLabels();
    });

    // Toggle drawer
    $scope.toggleDrawer = function (row, isOpen) {
      if ($scope.addingRow) {
        // clear adding row
        $scope.addingRow = null;
      }
      if (row && ($scope.selectedRow != row || isOpen)) {
        // show drawer
        $scope.selectedRow = row;
      } else {
        // hide drawer
        $scope.selectedRow = null;
      }
      $scope.refreshCanvas();
    };

    // Toggle row adder
    $scope.toggleNewRow = function (row, isOpen) {
      if ($scope.selectedRow) {
        // clear selected row
        $scope.selectedRow = null;
      }
      if (row && ($scope.addingRow != row || isOpen)) {
        // show new row
        $scope.addingRow = row;
      } else {
        // hide new row
        $scope.addingRow = null;
      }
      $scope.refreshCanvas();
    };

    // Set resizing row
    $scope.setResizingRow = function (row) {
      $scope.resizingRow = row;
    };

    // Refresh on duration / division change
    $scope.$watchGroup(
      ["spec.duration", "spec.divisions"],
      function (newValues, oldValues, scope) {
        $scope.refreshCanvas();
      }
    );

    // Change Color
    $scope.changeColor = function (row, color) {
      row.color = color;
    };

    // Delete A Row
    $scope.deleteRow = function (row) {
      var index = $scope.spec.rows.indexOf(row);

      if (index > -1) {
        $scope.spec.rows.splice(index, 1);
        $scope.refreshCanvas();
      }
    };
  }
);
