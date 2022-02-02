var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import './spec-header.js';
let SpecBase = class SpecBase extends LitElement {
    render() {
        return html `
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
};
SpecBase.styles = css ``;
SpecBase = __decorate([
    customElement('spec-base')
], SpecBase);
export { SpecBase };
