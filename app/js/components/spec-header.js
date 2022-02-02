var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import './spec-sidebar.js';
import './spec-embed-details.js';
import '@material/mwc-linear-progress';
let SpecHeader = class SpecHeader extends LitElement {
    render() {
        const { uiState } = this.state;
        return html `<mwc-linear-progress
        class="header-progress-linear"
        md-mode="indeterminate"
        ?hidden=${!uiState.saveInProgress}
        indeterminate
      ></mwc-linear-progress>

      <spec-sidebar
        id="sidebar"
        class="${classMap({ active: uiState.sidebar })}"
        ng-controller="sidebarCtrl"
        .state=${this.state}
      ></spec-sidebar>

      <spec-embed-details
        class="popup"
        ?hidden=${!uiState.showingEmbedPopup}
        .state=${this.state}
      ></spec-embed-details>

      <div
        id="overlay"
        ?hidden=${!uiState.overlay}
        @click=${() => this.closeOverlay()}
      ></div> `;
    }
    closeOverlay() { }
};
SpecHeader.styles = css `
    .header-progress-linear {
      position: fixed;
      z-index: 999;
    }

    /* Overlay */
    #overlay {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.15);
      z-index: 4;
      cursor: pointer;
      -webkit-transition: opacity linear 0.3s;
      transition: opacity linear 0.3s;
    }

    #overlay.ng-hide {
      opacity: 0;
    }

    /* Popups */
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

    .popup.ng-hide {
      opacity: 0;
    }

    /* Sidebar */
    #sidebar {
      position: fixed;
      top: 0;
      bottom: 0;
      left: -364px;
      width: 344px;
      background: #fff;
      z-index: 10;
      -webkit-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
      -webkit-transition: all ease-out 0.2s;
      transition: all ease-out 0.2s;
    }

    #sidebar.active {
      left: 0;
    }
  `;
__decorate([
    property({ type: Object })
], SpecHeader.prototype, "state", void 0);
SpecHeader = __decorate([
    customElement('spec-header')
], SpecHeader);
export { SpecHeader };
