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

const config: { stagingDomain?: string; productionDomain?: string } = {};

// Import variables if present (from config.js)
if (window) {
  // @ts-ignore
  Object.assign(config, window.__directConfig);
}

declare const gapi;
declare const google;
declare const angular;

const app = angular.module("spec", [
  "ngRoute",
  "ngResource",
  "ngMaterial",
  "ngAnimate",
  "angularytics",
  "environment",
  "LocalStorageModule",
  "ui.sortable",
]);

app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "partials/home.html",
    })
    .when("/user/:user", {
      templateUrl: "partials/user.html",
      controller: "userCtrl",
    })
    .when("/group/:group", {
      templateUrl: "partials/group.html",
      controller: "groupCtrl",
    })
    .when("/spec/:id", {
      templateUrl: "partials/spec.html",
      controller: "specCtrl",
      reloadOnSearch: false,
      resolve: {
        validateSpecId: function ($route, $location) {
          var id = $route.current.params.id;
          var multispec = id.split(/\D+/g);
          var length = multispec.length;
          // filter empty and duplicate
          multispec = multispec.filter(function (specId, index) {
            return specId.length && multispec.indexOf(specId) == index;
          });
          // id was malformed, redirect to cleaned url
          if (length !== multispec.length) {
            $location.path("/spec/" + multispec.join("+"));
          }
        },
      },
    })
    .when("/spec/", {
      templateUrl: "partials/spec.html",
      controller: "specCtrl",
    })
    .otherwise({
      redirectTo: "/",
    });
});

app.config(function (envServiceProvider) {
  envServiceProvider.config({
    domains: {
      development: ["localhost"],
      staging: [config.stagingDomain],
      production: [config.productionDomain],
    },
  });
  envServiceProvider.check();
});

app.config(function (AngularyticsProvider) {
  AngularyticsProvider.setEventHandlers(["Console", "GoogleUniversal"]);
});

app.config(function ($mdThemingProvider) {
  $mdThemingProvider.theme("spec-head");
});

app.run([
  "Angularytics",
  function (Angularytics) {
    Angularytics.init();
  },
]);
