var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let SpecSettings = class SpecSettings extends LitElement {
    render() {
        const { current } = this.state;
        const s = current === null || current === void 0 ? void 0 : current.spec;
        return html `<div class="popup-cnt">
      <div class="popup-row">
        <md-input-container>
          <label>Group</label>
          <input ng-model="data.group" />
        </md-input-container>
        <md-input-container>
          <label>Direction title</label>
          <input ng-model="data.title" />
        </md-input-container>
        <md-input-container>
          <label>Direction description</label>
          <textarea ng-model="spec.title"></textarea>
        </md-input-container>
      </div>

      <div class="popup-row" ng-switch on="editing" ng-show="showMs">
        <md-input-container ng-switch-when="true">
          <label>Duration (in ms)</label>
          <input type="number" ng-model="spec.duration" />
        </md-input-container>

        <span ng-switch-default class="popup-label">Duration (in ms)</span>
        <span ng-switch-default class="popup-input">${s === null || s === void 0 ? void 0 : s.duration}</span>
      </div>

      <div class="popup-row" ng-switch on="editing" ng-show="showMs">
        <md-input-container ng-switch-when="true">
          <label>Minor Divisions (in ms)</label>
          <input type="number" ng-model="spec.divisions.minor" />
        </md-input-container>

        <span ng-switch-default class="popup-label"
          >Minor Divisions (in ms)</span
        >
        <span ng-switch-default class="popup-input">${s === null || s === void 0 ? void 0 : s.divisions.minor}</span>
      </div>

      <div class="popup-row" ng-switch on="editing" ng-show="showMs">
        <md-input-container ng-switch-when="true">
          <label>Major Divisions (in ms)</label>
          <input type="number" ng-model="spec.divisions.major" />
        </md-input-container>

        <span ng-switch-default class="popup-label"
          >Major Divisions (in ms)</span
        >
        <span ng-switch-default class="popup-input">${s === null || s === void 0 ? void 0 : s.divisions.major}</span>
      </div>

      <div class="popup-row" ng-switch on="editing">
        <md-input-container ng-switch-when="true">
          <label>Duration (in frames)</label>
          <input type="number" ng-model="spec.frames" />
        </md-input-container>

        <span ng-switch-default class="popup-label">Duration (in frames)</span>
        <span ng-switch-default class="popup-input">${s === null || s === void 0 ? void 0 : s.frames}</span>
      </div>

      <div class="popup-row" ng-switch on="editing">
        <md-input-container ng-switch-when="true">
          <label>Minor Divisions (in frames)</label>
          <input type="number" ng-model="spec.divisions.minorFrames" />
        </md-input-container>

        <span ng-switch-default class="popup-label"
          >Minor Divisions (in frames)</span
        >
        <span ng-switch-default class="popup-input"
          >${s === null || s === void 0 ? void 0 : s.divisions.minorFrames}</span
        >
      </div>

      <div class="popup-row" ng-switch on="editing">
        <md-input-container ng-switch-when="true">
          <label>Major Divisions (in frames)</label>
          <input type="number" ng-model="spec.divisions.majorFrames" />
        </md-input-container>

        <span ng-switch-default class="popup-label"
          >Major Divisions (in frames)</span
        >
        <span ng-switch-default class="popup-input"
          >${s === null || s === void 0 ? void 0 : s.divisions.majorFrames}</span
        >
      </div>

      <div class="popup-row" ng-switch on="editing">
        <md-radio-group ng-switch-when="true" ng-model="spec.fps">
          <md-radio-button ng-value="fps66"
            >66.67 (15ms / frame)</md-radio-button
          >
          <md-radio-button ng-value="fps60"
            >60 (16.66ms / frame)</md-radio-button
          >
          <md-radio-button ng-value="fps30"
            >30 (33.33ms / frame)</md-radio-button
          >
        </md-radio-group>

        <span ng-switch-default class="popup-label">Frames Per Second</span>
        <span ng-switch-default class="popup-input">${s === null || s === void 0 ? void 0 : s.fps}</span>
      </div>

      <div class="popup-row">
        <md-checkbox ng-model="spec.exactTiming">
          Show exact timings
        </md-checkbox>
      </div>
    </div> `;
    }
};
SpecSettings.styles = css `
    .popup {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      z-index: 6;
      max-width: 90%;
      min-width: 500px;
      max-height: 90%;
      border-radius: 2px;
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.24);
      transition: opacity linear 0.1s;
      padding: 24px 32px;
    }

    .popup-row {
      margin-bottom: 16px;
      font-size: 16px;
    }

    .popup-row:last-child {
      margin-bottom: 0;
    }

    .popup-row md-checkbox {
      margin: 15px;
      margin-left: 0;
    }

    .popup-row md-radio-button {
      margin-left: 0;
    }

    .popup-label {
      display: block;
      text-align: left;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      font-weight: 300;
      color: #737373;
    }

    .popup-input {
      position: relative;
      display: block;
      height: 30px;
      line-height: 30px;
      padding: 0 1px;
      margin: 0;
      font-size: 18px;
      font-weight: 400;
      color: #737373;
    }
  `;
__decorate([
    property({ type: Object })
], SpecSettings.prototype, "state", void 0);
SpecSettings = __decorate([
    customElement('spec-settings')
], SpecSettings);
export { SpecSettings };
