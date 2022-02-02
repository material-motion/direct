import {html, css, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('spec-code')
export class SpecCode extends LitElement {
  static styles = css``;

  render() {
    return html`<md-tabs md-border-bottom md-autoselect>
      <div ng-repeat="tab in ['Android', 'iOS', 'CSS']">
        <md-tab label="{{tab}}">
          <div ng-repeat="row in spec.rows">
            <!-- .easing-details -->
            <div class="easing-details" ng-show="!editing">
              <div
                class="spec-comment-detail active"
                ng-class="{hasContent: editing || row.comment || row.detail || row.tag.label && row.tag.label !== 'None' || row.customTag}"
              >
                <div
                  class="spec-property-tag"
                  ng-style="{'backgroundColor': row.color}"
                  ng-hide="(row.tag.label === 'None') ||
                          ((row.tag.label === 'Custom') &&
                          (row.customTag === null || row.customTag === undefined || row.customTag === ''))"
                  ng-class="{margin: row.comment || row.detail}"
                >
                  <span ng-if="row.tag.label === 'Custom'"
                    >{{row.customTag}}</span
                  >
                  <span
                    ng-if="row.tag.label !== 'Custom' && row.tag.label !== 'None'"
                    >{{row.tag.label}}</span
                  >
                </div>
                <div class="spec-comment">
                  <span ng-show="row.comment">{{row.comment}}</span>
                </div>
                <div class="spec-detail">
                  <span ng-show="row.detail">{{row.detail}}</span>
                </div>
              </div>

              <div layout="row">
                <div ng-if="row.delay != null" flex="50">
                  <div class="info-label">Delay</div>
                  <div class="info-data">
                    {{row.delay | number:decimalPlaces}} ms
                  </div>
                </div>

                <div ng-if="row.duration != null" flex="50">
                  <div class="info-label">Duration</div>
                  <div class="info-data">
                    {{row.duration | number:decimalPlaces}} ms
                  </div>
                </div>
              </div>

              <div ng-switch on="row.easing.value">
                <div ng-switch-when="quantum">
                  <div ng-include="'partials/easing-quantum.html'"></div>
                </div>

                <div ng-switch-when="incoming">
                  <div ng-include="'partials/easing-incoming.html'"></div>
                </div>

                <div ng-switch-when="outgoing">
                  <div ng-include="'partials/easing-outgoing.html'"></div>
                </div>

                <div ng-switch-when="none">
                  <div ng-include="'partials/easing-none.html'"></div>
                </div>

                <div ng-switch-when="custom">
                  <div ng-include="'partials/easing-custom.html'"></div>
                </div>

                <div ng-switch-default>
                  <div class="info-label">No easing details</div>
                </div>
              </div>
            </div>
            <!--/ .easing-details -->
          </div>
        </md-tab>
      </div>
    </md-tabs> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'spec-code': SpecCode;
  }
}
