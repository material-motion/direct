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

app.controller('specCtrl', function ($scope, $routeParams, $sce, $location) {
  // Initial Config
  $scope.uiState = {
    overlay: false,
    sidebar: false,
    saveInProgress: false,
    showingEmbedPopup: false,
  };

  // Constants
  $scope.fps66 = 1000 / 15;
  $scope.fps60 = 60;
  $scope.fps30 = 30;

  // Initial Data Setup
  if ($routeParams.id) {
    $scope.multispec = $routeParams.id.split(/\D+/g);
  } else {
    $scope.multispec = [null]; // create an empty spec for editing
  }

  if ($routeParams.embed) {
    $scope.embedded = true;
  }

  $scope.embedUrl = $location.absUrl().split('?')[0] + '?embed';

  // UI state
  $scope.showSidebar = function () {
    $scope.uiState.sidebar = true;
    $scope.uiState.overlay = true;
  };

  $scope.closeOverlay = function () {
    // Close sidebar
    $scope.uiState.sidebar = false;

    // Close embed popup
    $scope.uiState.showingEmbedPopup = false;

    // Close overlay
    $scope.uiState.overlay = false;
  };

  $scope.toggleEmbedPopup = function () {
    $scope.uiState.showingEmbedPopup = !$scope.uiState.showingEmbedPopup;
    $scope.uiState.overlay = $scope.uiState.showingEmbedPopup;
  };

  // Manually redraw grid and grid items
  $scope.refreshCanvas = function () {
    $scope.$broadcast('refreshCanvas');
  }
    // @ts-ignore
    .debounce(100);

  // reload project list in menu (see sidebarCtrl.js)
  $scope.refreshSidebar = function () {
    $scope.$broadcast('refreshSidebar');
  }
    // @ts-ignore
    .debounce(100);

  // Helpers
  $scope.deleteProject = function (ev, data) {
    $scope.$parent.deleteProject(ev, data, function () {
      if ($scope.multispec.length > 1) {
        var deletedIdx = $scope.multispec.indexOf(data.id.toString());
        if (deletedIdx > -1) {
          $scope.multispec.splice(deletedIdx, 1);
        }
        $scope.goto('/spec/' + $scope.multispec.join('+'));
      } else {
        $scope.goto('/user/' + $scope.user);
      }
    });
  };

  // Constants

  // Colors
  $scope.colors = [
    '#E51C23',
    '#9C27B0',
    '#5677FC',
    '#00BCD4',
    '#259B24',
    '#CDDC39',
    '#FFC107',
    '#795548',
    '#737373',
  ];

  // Easing
  $scope.easingOptions = [
    {
      label: '80% Incoming, 40% Outgoing',
      value: 'quantum',
    },
    {
      label: '80% Incoming Only',
      value: 'incoming',
    },
    {
      label: '40% Outgoing Only',
      value: 'outgoing',
    },
    {
      label: 'Linear',
      value: 'linear',
    },
    {
      label: 'Custom Curve',
      value: 'custom',
    },
  ];

  // Property Tags
  $scope.tagOptions = [
    {
      label: 'Position-x',
      value: 'position-x',
    },
    {
      label: 'Position-y',
      value: 'position-y',
    },
    {
      label: 'Position-xy',
      value: 'position-xy',
    },
    {
      label: 'Scale',
      value: 'scale',
    },
    {
      label: 'Opacity',
      value: 'opacity',
    },
    {
      label: 'Rotation',
      value: 'rotation',
    },
    {
      label: 'Mask',
      value: 'mask',
    },
    {
      label: 'Custom',
      value: 'custom',
    },
    {
      label: 'None',
      value: 'none',
    },
  ];
});
