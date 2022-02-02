import {html, css, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';

import './spec-header.js';

@customElement('spec-base')
export class SpecBase extends LitElement {
  static styles = css``;

  render() {
    return html`
      <spec-header
        ng-if="!embedded"
        ng-include="'partials/spec-header.html'"
      ></spec-header>

      <main role="main" class="tab-container" ng-class="{embed: embedded}">
        <span
          class="header-action icon-q_menu"
          ng-if="!embedded"
          ng-click="showSidebar()"
        ></span>
        <div layout="row" class="embed-details-icon">
          <md-button
            class="header-action md-icon-button"
            ng-if="!embedded"
            aria-label="Embed details"
            ng-click="toggleEmbedPopup()"
          >
            <i class="material-icons">open_in_new</i>
          </md-button>
        </div>

        <md-tabs md-selected="selectedIndex" md-border-bottom md-autoselect>
          <div ng-repeat="specId in multispec">
            <div class="spec-tab-ctrl-wrap" ng-controller="specTabCtrl">
              <md-tab label="{{data.title}}">
                <div
                  class="tab-content"
                  ng-include="'partials/spec-content.html'"
                  ng-if="spec"
                ></div>
              </md-tab>
            </div>
          </div>
        </md-tabs>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'spec-base': SpecBase;
  }
}
