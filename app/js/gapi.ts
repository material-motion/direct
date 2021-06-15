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

/*
  These API keys are Javascript API keys that must be included client side.
  We have an HTTP referrer whitelist server-side to prevent quota misuse.
 */
var developerKey = "AIzaSyAwMg3spfEqfQyCUR1OXfyCAse3GzxpxJM";
var clientId =
  "103309234391-nak808obap92p3i1cslqi1oubsfnub1m.apps.googleusercontent.com";
var appId = "103309234391";
var scope = ["https://www.googleapis.com/auth/drive.readonly"];

var pickerApiLoaded = false;
var oauthToken;
var scopeModel;

declare const gapi;
declare const google;

function onApiLoad() {
  gapi.load("auth");
  gapi.load("picker", { callback: onPickerApiLoad });
}

function loadPicker(model) {
  scopeModel = model;
  authorize(true);
}

function authorize(immediate) {
  // @ts-ignore
  window.gapi.auth.authorize(
    {
      client_id: clientId,
      scope: scope,
      immediate: immediate,
    },
    showPicker
  );
}

function onPickerApiLoad() {
  pickerApiLoaded = true;
}

function showPicker(authResult) {
  if (authResult && !authResult.error) {
    oauthToken = authResult.access_token;

    var myDriveView = new google.picker.DocsView(google.picker.ViewId.FOLDERS);
    myDriveView.setMode(google.picker.DocsViewMode.LIST);

    if (pickerApiLoaded && oauthToken) {
      var picker = new google.picker.PickerBuilder()
        .addView(myDriveView)
        .addView(google.picker.ViewId.DOCS_VIDEOS)
        .addView(google.picker.ViewId.RECENTLY_PICKED)
        .enableFeature(google.picker.Feature.MINE_ONLY)
        .setAppId(appId)
        .setOAuthToken(oauthToken)
        .setDeveloperKey(developerKey)
        .setCallback(pickerCallback)
        .setTitle("Select a Video")
        .build();
      picker.setVisible(true);
    }
  } else if (authResult.error === "immediate_failed") {
    debugger;
    authorize(false);
  }
}

function pickerCallback(data) {
  if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
    var doc = data[google.picker.Response.DOCUMENTS][0];
    var url = doc[google.picker.Document.URL];
    scopeModel.spec.videoUrl = url;
    scopeModel.spec.videoSrc = scopeModel.getVideoSrc(scopeModel.spec.videoUrl);
    scopeModel.$apply();
  }
}
