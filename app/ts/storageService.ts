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

app.service(
  'storageService',
  function storageService($timeout, $location, Spec) {
    var saveFinished = function (scope) {
      // Set minimum time to prevent progress bar from disappearing too quickly.
      $timeout(function () {
        scope.uiState.saveInProgress = false;
      }, 150);
      // Remove navigation prompt
      window.onbeforeunload = null;
    };

    // called when scope.data changes
    var onDataChanged = function (newVal, oldVal, scope) {
      if (shouldSave(newVal, oldVal, scope)) {
        scope.uiState.saveInProgress = true;
        // Enable navigation prompt
        window.onbeforeunload = function () {
          return true;
        };
        save(scope);
      }
    };

    // Remove stateful UI properties
    var sanitizedData = function (data) {
      if (typeof data === 'undefined') return data;
      // Clone data
      var sanitizedData = JSON.parse(JSON.stringify(data));

      // spec properties to remove
      delete sanitizedData.spec.canvas.width;
      delete sanitizedData.spec.divisions.minorCount;
      delete sanitizedData.spec.divisions.minorGap;
      delete sanitizedData.spec.divisions.majorCount;
      delete sanitizedData.spec.divisions.majorGap;

      return sanitizedData;
    };

    var autosave = function (scope) {
      scope.uiState.saveInProgress = false;
      scope.$watch('data', onDataChanged, true);
      scope.$watch(
        'data.id',
        function (newVal, oldVal, scope) {
          if (scope.data && !scope.data.id) {
            create(scope);
          }
        },
        true
      );
    };

    // saves to database (debounced to 1 per second)
    var save = function (scope) {
      // Update Spec
      Spec.update(
        { id: scope.data.id },
        sanitizedData(scope.data),
        function (resp) {
          console.log(resp);
          saveFinished(scope);
        },
        function (error) {
          saveFinished(scope);
        }
      );
    }
      // @ts-ignore
      .debounce(1000);

    var create = function (scope) {
      // Create Spec
      Spec.save(
        sanitizedData(scope.data),
        function (resp) {
          console.log(resp);
          // Redirect to correct URL
          $location.path('/spec/' + resp.id);
          $location.search('create', 'true');
          saveFinished(scope);
        },
        function (error) {
          saveFinished(scope);
        }
      );
    };

    // check if properties, excluding stateful UI properties, have changed
    var shouldSave = function (newVal, oldVal, scope) {
      newVal = sanitizedData(newVal);
      oldVal = sanitizedData(oldVal);

      // use angular.equals to compare ignoring angular $ properties
      return oldVal && (scope.addingRow || !angular.equals(newVal, oldVal));
    };

    return {
      autosave: autosave,
    };
  }
);
