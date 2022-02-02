import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("spec-content-info")
export class SpecContentInfo extends LitElement {
  static styles = css``;

  render() {
    return html`<div
      class="spec-bottom-panel-info"
      ng-repeat="row in spec.rows"
    >
      <div
        class="spec-comment-detail"
        ng-class="{active: row == selectedRow, hasContent: editing || row.comment || row.detail || row.tag.label && row.tag.label !== 'None' || row.customTag}"
      >
        <div
          class="spec-property-tag"
          ng-click="toggleDrawer(row)"
          ng-style="{'backgroundColor': row.color}"
          ng-hide="(row.tag.label === 'None') ||
                  ((row.tag.label === 'Custom') &&
                  (row.customTag === null || row.customTag === undefined || row.customTag === ''))"
          ng-class="{margin: row.comment || row.detail}"
        >
          <span ng-if="row.tag.label === 'Custom'">{{row.customTag}}</span>
          <span ng-if="row.tag.label !== 'Custom' && row.tag.label !== 'None'"
            >{{row.tag.label}}</span
          >
        </div>
        <div class="spec-comment" ng-switch on="editing">
          <md-input-container md-no-float ng-switch-when="true">
            <input
              type="text"
              ng-model="row.comment"
              placeholder="Component"
              ng-change="onCommentUpdate(row)"
            />
          </md-input-container>
          <span ng-switch-default ng-show="row.comment">{{row.comment}}</span>
        </div>

        <div class="spec-detail" ng-switch on="editing">
          <md-input-container md-no-float ng-switch-when="true">
            <input
              type="text"
              ng-model="row.detail"
              placeholder="Detail"
              ng-change="onCommentUpdate(row)"
            />
          </md-input-container>
          <span ng-switch-default ng-show="row.detail">{{row.detail}}</span>
        </div>
      </div>

      <div class="spec-info-row" ng-class="{active: row == selectedRow}">
        <div
          flex="25"
          class="spec-info"
          ng-switch
          on="editing"
          ng-hide="editing && !showMs || (row.delay === null || row.delay === undefined)"
        >
          <md-input-container ng-switch-when="true">
            <div class="info-label">Delay</div>
            <input
              aria-label="Delay"
              type="number"
              min="0"
              max="{{spec.duration}}"
              ng-model="row.delay"
            />
          </md-input-container>

          <div ng-switch-default class="info-label">Delay</div>
          <div ng-switch-default class="info-data">
            {{row.delay | number:decimalPlaces}} ms
          </div>
        </div>

        <div
          flex="25"
          class="spec-info"
          ng-switch
          on="editing"
          ng-hide="editing && !showMs || (row.duration === null || row.duration === undefined)"
        >
          <md-input-container ng-switch-when="true">
            <div class="info-label">Duration</div>
            <input
              aria-label="Duration"
              type="number"
              min="0"
              max="{{spec.duration}}"
              ng-model="row.duration"
            />
          </md-input-container>

          <div ng-switch-default class="info-label">Duration</div>
          <div ng-switch-default class="info-data">
            {{row.duration | number:decimalPlaces}} ms
          </div>
        </div>

        <div
          flex="25"
          class="spec-info"
          ng-switch
          on="editing"
          ng-hide="!editing"
        >
          <md-input-container ng-switch-when="true">
            <div class="info-label">Delay (frames)</div>
            <input
              aria-label="Delay"
              type="number"
              id="delay_frames"
              min="0"
              max="{{spec.frames}}"
              ng-model="row.delayFrames"
              ng-change="row.delay = row.delayFrames * (1000 / spec.fps)"
            />
          </md-input-container>

          <div ng-switch-default class="info-label">Delay</div>
          <div ng-switch-default class="info-data">
            {{row.delayFrames}} frames
          </div>
        </div>

        <div
          flex="25"
          class="spec-info"
          ng-switch
          on="editing"
          ng-hide="!editing"
        >
          <md-input-container ng-switch-when="true">
            <div class="info-label">Duration (frames)</div>
            <input
              aria-label="Duration"
              type="number"
              id="duration_frames"
              min="0"
              max="{{spec.frames}}"
              ng-model="row.durationFrames"
              ng-change="row.duration = row.durationFrames * (1000 / spec.fps)"
            />
          </md-input-container>

          <div ng-switch-default class="info-label">Duration</div>
          <div ng-switch-default class="info-data">
            {{row.durationFrames}} frames
          </div>
        </div>

        <div
          flex="50"
          class="spec-info"
          ng-switch
          on="editing"
          ng-hide="!editing && (row.easing === null || row.easing === undefined)"
        >
          <div ng-hide="(row.duration === 0)">
            <div ng-switch-when="true" class="info-label">Easing</div>
            <div ng-switch-when="true">
              <md-input-container>
                <md-select ng-model="row.easing" aria-label="Easing">
                  <md-option
                    ng-value="opt"
                    ng-selected="opt.label == row.easing.label"
                    ng-repeat="opt in easingOptions"
                    >{{opt.label}}</md-option
                  >
                </md-select>
              </md-input-container>
            </div>

            <div ng-switch-default class="info-label">Easing</div>
            <div ng-switch-default class="info-data">
              <div>
                {{row.easing.label}}
                <span
                  ng-if="row.easing.value == 'custom' && (row.easingCustomIncoming || row.easingCustomOutgoing)"
                  >({{row.easingCustomIncoming}}/{{row.easingCustomOutgoing}})</span
                >
              </div>
            </div>
          </div>

          <div class="custom-velocity" ng-show="row.easing.value == 'custom'">
            <div class="info-label">Incoming Velocity</div>
            <md-input-container ng-switch-when="true">
              <input
                aria-label="Incoming Velocity"
                type="number"
                ng-model="row.easingCustomIncoming"
              />
            </md-input-container>
            <div ng-switch-default ng-show="row.easingCustomIncoming !== null">
              <span>{{row.easingCustomIncoming}}</span>%
            </div>

            <div class="info-label">Outgoing Velocity</div>
            <md-input-container ng-switch-when="true">
              <input
                aria-label="Outgoing Velocity"
                type="number"
                ng-model="row.easingCustomOutgoing"
              />
            </md-input-container>
            <div ng-switch-default ng-show="row.easingCustomOutgoing !== null">
              <span>{{row.easingCustomOutgoing}}</span>%
            </div>
          </div>
        </div>
      </div>

      <!-- Property tag -->
      <div
        class="spec-info-row"
        ng-if="editing"
        ng-class="{active: row == selectedRow}"
      >
        <div
          flex="50"
          class="spec-info"
          ng-hide="!editing && (row.tag === null || row.tag === undefined)"
        >
          <span class="info-label">Property</span>
          <md-input-container>
            <md-select ng-model="row.tag" aria-label="Property">
              <md-option
                ng-value="opt"
                ng-selected="opt.label == row.tag.label"
                ng-repeat="opt in tagOptions"
                >{{opt.label}}</md-option
              >
            </md-select>
          </md-input-container>
        </div>

        <div
          flex="50"
          class="spec-info"
          ng-hide="!editing && (row.tag === null || row.tag === undefined)"
        >
          <md-input-container ng-show="row.tag.label == 'Custom'">
            <label class="info-label">Custom Tag</label>
            <input ng-model="row.customTag" />
          </md-input-container>
        </div>
      </div>
      <!--/ Property tag -->

      <div
        class="spec-info-row"
        ng-if="editing"
        ng-class="{active: row == selectedRow}"
      >
        <div class="spec-info">
          <div class="info-label">Color</div>
          <div class="info-data color-input">
            <span
              class="color-opt"
              ng-style="{'background-color': color}"
              ng-class="{'active': color === row.color}"
              ng-repeat="color in colors"
              ng-click="changeColor(row, color)"
            >
              <span class="color-opt-inner"></span>
            </span>
          </div>
        </div>
      </div>

      <div
        class="spec-info-row"
        ng-class="{active: row == selectedRow}"
        ng-if="editing"
      >
        <div class="delete-button">
          <md-button class="md-warn" ng-click="deleteRow(row)"
            >Delete</md-button
          >
        </div>
      </div>
    </div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'spec-content-info': SpecContentInfo;
  }
}