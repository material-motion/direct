// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { app } from './app.js';

declare const angular;

/**
 * Spec Canvas Visuals to render bezier curves and other elements
 */
app.directive('specCanvas', function ($timeout) {
  // Bezier Curve Drawing

  // Basic Curves:
  // Fast Out, Slow In: cubic-bezier(0.4, 0.0, 0.2, 1)
  // Linear Out, Slow In: cubic-bezier(0.0, 0.0, 0.2, 1)
  // Fast Out, Linear In: cubic-bezier(0.4, 0.0, 1, 1)

  // Turns hex to RGB then adds an alpha channel while outputting to CSS format
  var lighten = function (hex) {
    hex = hex.replace(/[^0-9A-F]/gi, '');
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return 'rgba(' + r + ',' + g + ',' + b + ',0.15)';
  };

  // Draws the base bar and begin and end circles
  var drawBar = function (ctx, w, h) {
    // ctx.fillRect(0, h-10, 2, 10);   // Left Bar (debug)
    ctx.fillRect(5, h - 6, w - 10, 2); // Bottom Bar
    // ctx.fillRect(w-2, h-10, 2, 10); // Right Bar (debug)

    // Circle Params
    var radius = 5; // Arc radius
    var startAngle = 0; // Starting point on circle
    var endAngle = Math.PI * 2; // End point on circle

    // Left Circle
    ctx.beginPath();
    ctx.arc(5, h - 5, radius, startAngle, endAngle);
    ctx.fill();

    // Right Circle
    ctx.beginPath();
    ctx.arc(w - 5, h - 5, radius, startAngle, endAngle);
    ctx.fill();
  };

  var drawDiamond = function (ctx, w, h) {
    // translate
    ctx.translate(0, 7);

    // rotate
    ctx.rotate((45 * Math.PI) / 180);

    // draw diamond
    ctx.fillRect(12.15, 5, 7.5, 7.5);
    // ctx.fill();

    // reset
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  };

  // Renders the curve on the given canvas
  var render = function (wrap, canvas, spec, totalDuration) {
    var baseColor = spec.color;
    var lightColor = lighten(baseColor);

    var curve = spec.easing.value;
    var inValue = 0;
    var outValue = 0;

    // Set Canvas Positioning and rudimentary prevention of invalid input
    // TODO: better error checking
    if (
      +spec.duration + +spec.delay > +totalDuration ||
      +spec.delay < 0 ||
      +spec.duration > +totalDuration
    ) {
      console.warn('Duration or Delay are invalid!');
      return;
    }

    var duration = (spec.duration / totalDuration) * 100;
    var delay = (spec.delay / totalDuration) * 100;

    wrap.css({
      width: duration + '%',
      marginLeft: delay + '%',
    });

    var wrapWidth = wrap.width();

    canvas.css({
      width: wrapWidth + 10,
      marginLeft: '-5px',
      marginRight: '-5px',
    });

    // Set Canvas Width / Height
    var cw = canvas.width();
    var ch = canvas.height();
    canvas.attr({
      width: cw,
      height: ch,
    });

    // Setup & Reset
    var ctx = canvas.get(0).getContext('2d');
    ctx.clearRect(0, 0, cw, ch);

    // check duration
    if (duration === 0) {
      ctx.fillStyle = baseColor;
      drawDiamond(ctx, cw, ch);
      return;
    }

    // Curve
    // Good Explanation: http://blogs.sitepointstatic.com/examples/tech/canvas-curves/bezier-curve.html
    // http://jsfiddle.net/andershaig/54AsL/
    ctx.fillStyle = lightColor;
    switch (curve) {
      case 'curve':
        ctx.beginPath();
        ctx.moveTo(5, ch - 5);
        ctx.bezierCurveTo(5, ch - 5, cw / 2, (ch - 5) * -1, cw - 5, ch - 5);
        ctx.fill();
        break;
      case 'quantum':
        inValue = 0.8;
        outValue = 0.4;
        ctx.beginPath();
        ctx.moveTo(5, ch - 5);
        ctx.bezierCurveTo(
          cw * outValue + 5,
          ch - 5,
          (1 - inValue) * cw - 5,
          0,
          cw - 5,
          0
        );
        ctx.lineTo(cw - 5, ch - 5);
        ctx.fill();
        break;
      case 'incoming':
        inValue = 0.8;
        outValue = 0;
        ctx.beginPath();
        ctx.moveTo(5, ch - 5);
        ctx.bezierCurveTo(
          cw * outValue + 5,
          ch - 5,
          (1 - inValue) * cw - 5,
          0,
          cw - 5,
          0
        );
        ctx.lineTo(cw - 5, ch - 5);
        ctx.fill();
        break;
      case 'outgoing':
        inValue = 0;
        outValue = 0.4;
        ctx.beginPath();
        ctx.moveTo(5, ch - 5);
        ctx.bezierCurveTo(
          cw * outValue + 5,
          ch - 5,
          (1 - inValue) * cw - 5,
          0,
          cw - 5,
          0
        );
        ctx.lineTo(cw - 5, ch - 5);
        ctx.fill();
        break;
      case 'linear':
        ctx.beginPath();
        ctx.moveTo(5, ch - 5);
        ctx.lineTo(cw - 5, 0);
        ctx.lineTo(cw - 5, ch - 5);
        ctx.fill();
        break;
      case 'custom':
        inValue = spec.easingCustomIncoming / 100;
        outValue = spec.easingCustomOutgoing / 100;
        ctx.beginPath();
        ctx.moveTo(5, ch - 5);
        ctx.bezierCurveTo(
          cw * outValue + 5,
          ch - 5,
          (1 - inValue) * cw - 5,
          0,
          cw - 5,
          0
        );
        ctx.lineTo(cw - 5, ch - 5);
        ctx.fill();
        break;
      case 'none':
        ctx.fillRect(5, 0, cw - 10, ch - 5);
        break;
      default:
        break;
    }

    // Bar
    ctx.fillStyle = baseColor;
    drawBar(ctx, cw, ch);
  };

  return {
    restrict: 'A',
    scope: {
      specCanvas: '=',
      duration: '=',
    },
    link: function (scope, element, attrs) {
      var wrap = angular.element(element[0]);
      var canvas = angular.element(element.find('canvas')[0]);

      // Watch Changes
      scope.$watch(
        'specCanvas',
        function (newValue, oldValue) {
          render(wrap, canvas, scope.specCanvas, scope.duration);
        },
        true
      );

      // Window Width Changes
      $(window).resize(function () {
        render(wrap, canvas, scope.specCanvas, scope.duration);
      });

      // Watch for controller to request redraw
      scope.$on('refreshCanvas', function () {
        $timeout(function () {
          render(wrap, canvas, scope.specCanvas, scope.duration);
        }, 0);
      });
    },
  };
});

/**
 * Grid Background
 */
app.directive('specGrid', function ($timeout) {
  var render = function (canvas, spec) {
    var ms = spec.duration || 300;
    var minorMs = spec.divisions.minor || 15;
    var majorMs = spec.divisions.major || 75;

    // Set Canvas Width / Height
    var cw = canvas.parent().width();
    var ch = canvas.parent().height();
    canvas.attr({
      width: cw,
      height: ch,
    });

    spec.canvas.width = cw;

    // Setup & Reset
    var ctx = canvas.get(0).getContext('2d');
    ctx.clearRect(0, 0, cw, ch);

    // Generate Grid
    var minorDivisions = (spec.divisions.minorCount = ms / minorMs);
    var minorGap = (spec.divisions.minorGap = cw / minorDivisions);

    ctx.beginPath();
    for (var x = 0.5 + minorGap; x <= cw; x += minorGap) {
      // Adding the gap skips the initial line at 0
      var xr = Math.round(x);
      var nx;

      if (xr >= x) {
        nx = xr - 0.5;
      } else {
        nx = xr + 0.5;
      }
      ctx.moveTo(nx, 0);
      ctx.lineTo(nx, ch);
    }

    ctx.strokeStyle = '#EEEEEE';
    ctx.lineWidth = 1;
    ctx.stroke();

    var majorDivisions = (spec.divisions.majorCount = ms / majorMs);
    var majorGap = (spec.divisions.majorGap = cw / majorDivisions);

    ctx.beginPath();
    for (var x = majorGap; x < cw; x += majorGap) {
      // Adding the gap skips the initial line at 0
      var xr = Math.round(x);

      ctx.moveTo(xr, 0);
      ctx.lineTo(xr, ch);
    }

    // Always draw start
    ctx.moveTo(1, 0);
    ctx.lineTo(1, ch);

    // Always draw end
    ctx.moveTo(cw - 1, 0);
    ctx.lineTo(cw - 1, ch);

    ctx.strokeStyle = '#DDDDDD';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  return {
    restrict: 'A',
    scope: {
      specGrid: '=',
    },
    link: function (scope, element, attrs) {
      var canvas = angular.element(element[0]);

      // Watch Changes
      scope.$watch(
        'specGrid',
        function (newValue, oldValue) {
          if (scope.specGrid && scope.specGrid !== undefined) {
            render(canvas, scope.specGrid);
          }
        },
        true
      );

      // Window Width Changes
      $(window).resize(function () {
        if (scope.specGrid && scope.specGrid !== undefined) {
          render(canvas, scope.specGrid);
        }
      });

      // Watch for controller to request redraw
      scope.$on('refreshCanvas', function (type) {
        $timeout(function () {
          if (scope.specGrid && scope.specGrid !== undefined) {
            render(canvas, scope.specGrid);
          }
        }, 0);
      });
    },
  };
});

/**
 * Drawable Canvas to add new items
 * (goes away once drawn and renders using specCanvas' render method)
 */
app.directive('specDraw', function ($timeout, $document) {
  var render = function (canvas, spec) {
    var ms = spec.duration || 300;
    var minorMs = spec.divisions.minor || 15;
    var majorMs = spec.divisions.major || 75;

    // Set Canvas Width / Height
    var cw = canvas.parent().width();
    var ch = canvas.parent().height();
    canvas.attr({
      width: cw,
      height: ch,
    });

    // Setup & Reset
    var ctx = canvas.get(0).getContext('2d');
    ctx.clearRect(0, 0, cw, ch);

    // Add Background
    ctx.fillStyle = '#F8EFF9';
    ctx.fillRect(0, 0, cw, ch);

    // Generate Grid
    var minorDivisions = (spec.divisions.minorCount = ms / minorMs);
    var minorGap = (spec.divisions.minorGap = cw / minorDivisions);

    ctx.beginPath();
    for (var x = 0.5 + minorGap; x <= cw; x += minorGap) {
      // Adding the gap skips the initial line at 0
      var xr = Math.round(x);
      var nx;

      if (xr >= x) {
        nx = xr - 0.5;
      } else {
        nx = xr + 0.5;
      }
      ctx.moveTo(nx, 0);
      ctx.lineTo(nx, ch);
    }

    ctx.strokeStyle = '#E9E0EB';
    ctx.lineWidth = 1;
    ctx.stroke();

    var majorDivisions = (spec.divisions.majorCount = ms / majorMs);
    var majorGap = (spec.divisions.majorGap = cw / majorDivisions);

    ctx.beginPath();
    for (var x = majorGap; x < cw; x += majorGap) {
      // Adding the gap skips the initial line at 0
      var xr = Math.round(x);

      ctx.moveTo(xr, 0);
      ctx.lineTo(xr, ch);
    }

    // Always draw start
    ctx.moveTo(1, 0);
    ctx.lineTo(1, ch);

    // Draw end if the duration is a multiple of 75ms
    if (ms % majorMs === 0) {
      ctx.moveTo(cw - 1, 0);
      ctx.lineTo(cw - 1, ch);
    }

    ctx.strokeStyle = '#E9E0EB';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  var renderCircle = function (canvas, x) {
    var ctx = canvas.get(0).getContext('2d');

    ctx.beginPath();
    var y = 30; // y coordinate
    var radius = 5; // Arc radius
    var startAngle = 0; // Starting point on circle
    var endAngle = Math.PI * 2; // End point on circle

    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.fillStyle = '#CE93D8';
    ctx.fill();
  };

  var renderLine = function (canvas, from, to) {
    var ctx = canvas.get(0).getContext('2d');

    ctx.beginPath();
    ctx.moveTo(from, 30);
    ctx.lineTo(to, 30);
    ctx.strokeStyle = '#CE93D8';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  return {
    restrict: 'A',
    scope: {
      specDraw: '=',
      completeFn: '&',
      position: '=',
    },
    link: function (scope, element, attrs) {
      var addSpecRow = function (delay, duration) {
        var row = {
          delay: delay || 0, // ms
          delayFrames: Math.round(delay / (1000 / scope.specDraw.fps)),
          duration: duration, // ms
          durationFrames: Math.round(duration / (1000 / scope.specDraw.fps)),
          color: '#737373',
          properties: null,
          easing: {
            label: '80% Incoming, 40% Outgoing',
            value: 'quantum',
          },
          easingCustomIncoming: 0,
          easingCustomOutgoing: 0,
          tag: {
            label: 'None',
            value: 'none',
          },
          customTag: null,
          comment: null,
        };

        clearCanvas(() => {});

        scope.$apply(function () {
          scope.specDraw.rows.splice(scope.position + 1, 0, row);
        });

        scope.completeFn();
      };

      var canvas = angular.element(element[0]);

      var creation: {
        startX: number | null;
        endX: number | null;
        delay: number | null;
        duration: number | null;
      } = {
        startX: null,
        endX: null,
        delay: null,
        duration: null,
      };

      var getLeft = function (el) {
        var rect = el.getBoundingClientRect();
        var docEl = document.documentElement;
        var left = rect.left + (window.pageXOffset || docEl.scrollLeft || 0);
        return left;
      };

      var getTop = function (el) {
        var rect = el.getBoundingClientRect();
        var docEl = document.documentElement;
        var top = rect.top + (window.pageYOffset || docEl.scrollTop || 0);
        return top;
      };

      element.on('mouseover', function (event) {
        event.preventDefault();

        $document.on('mousemove', mousemove);
        $document.on('mousedown', mousedown);
        $document.on('mouseup', mouseup);
      });

      var inBounds = function (event) {
        var y = event.pageY;
        var x = event.pageX;
        var offsetLeft = getLeft(element[0]) - x;
        var offsetTop = getTop(element[0]) - y;

        var padding = 20;

        if (
          offsetLeft > padding ||
          offsetLeft < -canvas.width() - padding ||
          offsetTop > padding ||
          offsetTop < -canvas.height() - padding
        ) {
          return false;
        }

        return true;
      };

      var mousemove = function (event) {
        if (!inBounds(event)) {
          clearCanvas(() => {});
          return;
        }

        var x = event.pageX;

        var elementX = x - getLeft(element[0]);

        var mGap = scope.specDraw.divisions.minorGap;
        var numMinorDivisions = Math.round(elementX / mGap);
        // numMinorDivisions * minor ms = delay for first click
        // numMinorDivisions * minor ms - delay = duration for second click
        var snappedX = numMinorDivisions * mGap;

        render(canvas, scope.specDraw);

        if (creation.startX !== null) {
          // Render initial dot + line
          renderLine(canvas, creation.startX, snappedX);
          renderCircle(canvas, creation.startX);
          renderCircle(canvas, snappedX);
        } else {
          // Render hover dot only
          renderCircle(canvas, snappedX);
        }
      };

      var addPoint = function (point, ms) {
        if (creation.startX !== null) {
          // numMinorDivisions * minor ms - delay = duration for second click
          if (creation.delay) creation.duration = ms - creation.delay;
          creation.endX = point;

          // Finalize Row
          addSpecRow(creation.delay, creation.duration);
        } else {
          // numMinorDivisions * minor ms = delay for first click
          creation.delay = ms;
          creation.startX = point;
        }
      };

      var mousedown = function (event) {
        var x = event.pageX;

        var elementX = x - getLeft(element[0]);

        var ms = scope.specDraw.divisions.minor;
        var mGap = scope.specDraw.divisions.minorGap;
        var numMinorDivisions = Math.round(elementX / mGap);
        var snappedX = numMinorDivisions * mGap;
        var snappedMs = numMinorDivisions * ms;

        addPoint(snappedX, snappedMs);
      };

      var mouseup = function (event) {
        var x = event.pageX;

        var elementX = x - getLeft(element[0]);

        var ms = scope.specDraw.divisions.minor;
        var mGap = scope.specDraw.divisions.minorGap;
        var numMinorDivisions = Math.round(elementX / mGap);
        var snappedX = numMinorDivisions * mGap;
        var snappedMs = numMinorDivisions * ms;

        // If there is already a start point and this event's point differs
        if (creation.startX && snappedX !== creation.startX) {
          addPoint(snappedX, snappedMs);
        }
      };

      var clearCanvas = function (event) {
        creation = {
          startX: null,
          endX: null,
          delay: null,
          duration: null,
        };

        // Clear canvas except for grid
        render(canvas, scope.specDraw);

        $document.off('mousemove', mousemove);
        $document.off('mousedown', mousedown);
      };

      // Watch Changes
      scope.$watch(
        'specDraw',
        function (newValue, oldValue) {
          if (scope.specDraw && scope.specDraw !== undefined) {
            render(canvas, scope.specDraw);
          }
        },
        true
      );

      // Window Width Changes
      $(window).resize(function () {
        if (scope.specDraw && scope.specDraw !== undefined) {
          render(canvas, scope.specDraw);
        }
      });

      // Watch for controller to request redraw
      scope.$on('refreshCanvas', function (type) {
        $timeout(function () {
          if (scope.specDraw && scope.specDraw !== undefined) {
            render(canvas, scope.specDraw);
          }
        }, 0);
      });
    },
  };
});

/**
 * Popup & Popup Tip Position
 */
app.directive('specTip', function () {
  var render = function (tip, spec, totalDuration) {
    var duration = spec.duration / totalDuration;
    var delay = spec.delay / totalDuration;
    var containerWidth = $('.spec-item-wrap').width();
    var offset = delay + duration / 2;
    if (containerWidth) {
      var pixelOffset = offset * containerWidth;

      var centerPoint = pixelOffset - 10; // 10 for tip width

      tip.css({
        left: centerPoint,
      });
    }
  };

  return {
    restrict: 'A',
    scope: {
      specTip: '=',
      duration: '=',
    },
    link: function (scope, element, attrs) {
      var tip = angular.element(element[0]);

      // Watch Changes
      scope.$watch(
        'specTip',
        function (newValue, oldValue) {
          render(tip, scope.specTip, scope.duration);
        },
        true
      );

      // Window Width Changes
      $(window).resize(function () {
        render(tip, scope.specTip, scope.duration);
      });
    },
  };
});

/**
 * Spec Item Resizing
 */
app.directive('resizer', function ($document) {
  return {
    restrict: 'A',
    scope: {
      resizerItem: '=',
      resizerSpec: '=',
    },
    link: function (scope, element, attrs) {
      var initial: {
        x: number | null;
        delay: number | null;
        duration: number | null;
      } = {
        x: null,
        delay: null,
        duration: null,
      };

      element.on('mousedown', function (event) {
        event.preventDefault();

        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
        $document.on('contextmenu', mouseup); // cancel on right clicks
      });

      var mousemove = function (event) {
        var item = scope.resizerItem;
        scope.$parent.setResizingRow(item);

        // Get initial values
        if (!initial.x) {
          initial.x = event.pageX;
        }

        if (!initial.delay && initial.delay !== 0) {
          initial.delay = item.delay;
        }

        if (!initial.duration) {
          initial.duration = item.duration;
        }

        var duration = scope.resizerSpec.duration;
        var md = scope.resizerSpec.divisions.minor;
        var mdCount = scope.resizerSpec.divisions.minorCount;
        var mdGap = scope.resizerSpec.canvas.width / mdCount;

        var x = event.pageX;
        if (initial.x) {
          var dx = x - initial.x;

          if (attrs.resizer == 'left') {
            // Handle left resizer

            // Snap to minor divisions
            var changeInDivisions = Math.round(dx / mdGap);

            // If x increases, reduce delay and add to width
            // If x decreases, add to delay and reduce width
            var changeInMs = changeInDivisions * md;

            if (initial.delay && initial.duration) {
              var newDelay = initial.delay + changeInMs;
              var newDuration = initial.duration - changeInMs;

              // Cannot increase if delay + width = 100%
              if (newDelay + newDuration > duration) {
                newDelay = item.delay;
                newDuration = item.duration;
              }

              // Cannot reduce if width is less than 1 minor division
              if (newDuration < md) {
                newDelay = item.delay;
                newDuration = md;
              }

              // Cannot increase if delay is 0 (all the way on the left)
              if (newDelay < 0) {
                newDelay = 0;
                newDuration = item.duration;
              }

              // Apply new width
              scope.$apply(function () {
                item.delay = newDelay;
                item.delayFrames = Math.round(
                  newDelay / (1000 / scope.resizerSpec.fps)
                );
                item.duration = newDuration;
                item.durationFrames = Math.round(
                  newDuration / (1000 / scope.resizerSpec.fps)
                );
              });
            }
          } else if (attrs.resizer == 'right') {
            // Handle right resizer

            // Snap to minor divisions
            var changeInDivisions = Math.round(dx / mdGap);

            // If x increases, add to width
            // If x decreases, reduce width
            var changeInMs = changeInDivisions * md;

            if (initial.duration) {
              var newDuration = initial.duration + changeInMs;

              // Cannot increase if delay + width = 100%
              if (item.delay + newDuration > duration) {
                newDuration = duration - item.delay;
              }

              // Cannot reduce if width is less than 1 minor division
              if (newDuration < md) {
                newDuration = md;
              }

              // Apply new width
              scope.$apply(function () {
                item.duration = newDuration;
                item.durationFrames = Math.round(
                  newDuration / (1000 / scope.resizerSpec.fps)
                );
              });
            }
          }
        }
      };

      var mouseup = function () {
        initial = {
          x: null,
          delay: null,
          duration: null,
        };

        scope.$parent.setResizingRow(null);

        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
        $document.unbind('contextmenu', mouseup);
      };
    },
  };
});
