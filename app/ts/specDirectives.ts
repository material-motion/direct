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

/*
 * initializes wrapperElem for specTabCtrl scope
 * element is a jqLite wrapper around an element with class=spec-tab-ctrl-wrap
 */
app.directive("specTabCtrlWrap", function () {
  return {
    restrict: "C",
    link: function ($scope, element, attrs) {
      $scope.wrapperElem = element;
    },
  };
});

/*
 * enables drag-to-reorder rows,
 * and clicking outside of containment to close drawer
 */
app.directive("specGridContainment", function () {
  return {
    restrict: "C",
    link: function ($scope, element, attrs) {
      // options for drag-to-reorder rows
      $scope.sortableOptions = {
        axis: "y",
        handle: ".item-canvas",
        tolerance: "pointer",
        disabled: !$scope.editing,
        containment: element,
      };

      $scope.$watch("editing", function () {
        $scope.sortableOptions.disabled = !$scope.editing;
      });
    },
  };
});

/*
 * sizes the spec property tags on the timeline view
 */
app.directive("specPropertyTagSizer", function ($timeout) {
  return {
    restrict: "A",
    link: function ($scope, element, attrs) {
      var updateSize = function () {
        var itemCanvasWrap = element.parent(".item-canvas-wrap");
        if (itemCanvasWrap.width() > 200) {
          element.css("max-width", "100%");
        } else {
          element.css("max-width", 200);

          var canvasMargin =
            itemCanvasWrap.outerWidth(true) - itemCanvasWrap.outerWidth();
          var specItem = element.closest(".spec-item");
          if (canvasMargin + element.outerWidth() > specItem.width()) {
            var offset =
              specItem.width() - (canvasMargin + element.outerWidth());
            if (Math.abs(offset) < canvasMargin) {
              element.css("margin-left", offset);
            } else {
              element.css("margin-left", 0);
            }
          }
        }
      };
      $(window).resize(updateSize);
      $(document).ready(updateSize);
    },
  };
});

/**
 * Allow stepping through video with arrow keys
 */
app.directive("scrubbable", function () {
  return {
    restrict: "A",
    link: function (scope, element, attrs) {
      var video = element[0];

      /* timeline video scrubbing */
      var gridContainment = $(element[0])
        .parents(".spec-content")
        .find(".spec-grid-containment");

      // convert between timestamp in seconds to pixels from left edge of spec
      var secondsToX = function (videoSeconds) {
        var videoMs = videoSeconds * 1000;
        var numMinorDivisions = videoMs / scope.spec.divisions.minor;
        var coordinateX = numMinorDivisions * scope.spec.divisions.minorGap;
        return coordinateX;
      };

      var xToSeconds = function (coordinateX) {
        var ms = scope.spec.divisions.minor;
        var mGap = scope.spec.divisions.minorGap;
        var timestampMs = (coordinateX / mGap) * ms;
        var timestampSeconds = timestampMs * 0.001;
        return timestampSeconds;
      };

      var onTimeUpdate = function () {
        var x = secondsToX(video.currentTime);
        moveScrubber(x);
        updateTimestamp();
        if (!video.paused || video.seeking) {
          window.requestAnimationFrame(onTimeUpdate);
        }
      };

      var updateTimestamp = function () {
        // request angular to update value for video.currentTime in UI
        scope.$apply();
      }
        // @ts-ignore
        .throttle(); // rate limit this event to one / 100ms (to prevent ui lag)

      video.addEventListener("seeking", function () {
        window.requestAnimationFrame(onTimeUpdate);
      });

      video.addEventListener("play", function () {
        window.requestAnimationFrame(onTimeUpdate);
      });

      var constrainScrubberX = function (x) {
        var gridWidth = $(gridContainment).find(".spec-grid").width();
        var durationX = secondsToX(video.duration);
        // @ts-ignore
        var maxAllowedX = Math.min(durationX, gridWidth);
        x = Math.min(x, maxAllowedX);
        x = Math.max(x, 0);
        return x;
      };

      var scrubber = $(gridContainment).find(".spec-grid-scrubber");
      var moveScrubber = function (x) {
        if (!scrubber.length) {
          scrubber = $(gridContainment).find(".spec-grid-scrubber");
        }
        scope.refreshCanvas();
        scrubber.css("left", constrainScrubberX(x));
      };

      var scrubVideoX = function (x) {
        var timestampSeconds = xToSeconds(x);

        if (timestampSeconds < video.duration) {
          if (!video.paused) {
            video.pause();
          }
          video.currentTime = timestampSeconds;
          window.requestAnimationFrame(onTimeUpdate);
        }
      }
        // @ts-ignore
        .throttle(); // rate limit this event to one / 100ms (to prevent ui lag)

      // listen to mouse events on the scrub handle
      $(gridContainment).one("mouseover", ".spec-grid-scrubber", function () {
        var scrubber = $(this);
        // @ts-ignore
        scrubber.draggable({
          axis: "x",
          cursorAt: { left: 0 },
          drag: function (evt, ui) {
            ui.position.left = constrainScrubberX(ui.position.left);
            scrubVideoX(ui.position.left);
          },
        });
      });

      // show warning message if durations don't match
      var checkDurationMatch = function () {
        if (video.duration && scope.spec.duration) {
          var warn =
            Math.abs(video.duration * 1000 - scope.spec.duration) > 100;
          scope.toggleVideoWarning(warn);
          scope.setCanScrubVideo(!warn);
        }
      };

      scope.$watch("spec.duration", checkDurationMatch);
      video.addEventListener("durationchange", checkDurationMatch);
    },
  };
});

app.directive("loadedData", function () {
  return function ($scope, $element) {
    var parentScope = $scope.$parent;
    parentScope.video = $element[0];

    parentScope.video.addEventListener("loadeddata", function () {
      console.log("Video loaded");
      $scope.$parent.$broadcast("refreshCanvas");

      // attach functions to video play controls
      parentScope.toggleVideoLooping = function () {
        parentScope.video.loop = !parentScope.video.loop;
      };

      parentScope.toggleVideoPaused = function () {
        if (parentScope.video.paused) {
          parentScope.video.play();
        } else {
          parentScope.video.pause();
        }
      };
    });
  };
});
