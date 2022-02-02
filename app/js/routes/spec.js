var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../components/spec-header.js';
import '../components/spec-content.js';
import '@material/mwc-icon';
import '@material/mwc-tab-bar';
import '@material/mwc-tab';
import { classMap } from 'lit/directives/class-map.js';
let DirectSpec = class DirectSpec extends LitElement {
    render() {
        const { embedded, current } = this.state;
        const specs = (current === null || current === void 0 ? void 0 : current.multispec) || current ? [current] : [];
        return html `<spec-header
        ?hidden=${embedded}
        .state=${this.state}
      ></spec-header>

      <main
        role="main"
        class=${classMap({ embed: embedded, 'tab-container': true })}
      >
        <header>
          <mwc-icon
            class="header-action icon-q_menu"
            ?hidden=${embedded}
            @click=${() => this.showSidebar()}
            >menu</mwc-icon
          >
          <mwc-tab-bar
            md-selected="selectedIndex"
            md-border-bottom
            md-autoselect
          >
            ${specs.map(spec => html `<mwc-tab label="${(spec === null || spec === void 0 ? void 0 : spec.title) || ''}"> </mwc-tab>`)}
          </mwc-tab-bar>
          <div layout="row" class="embed-details-icon">
            <mwc-icon
              class="header-action md-icon-button"
              ?hidden=${embedded}
              aria-label="Embed details"
              @click=${() => this.toggleEmbedPopup()}
              >open_in_new
            </mwc-icon>
          </div>
        </header>

        <div>
          <div class="spec-tab-ctrl-wrap" ng-controller="specTabCtrl">
            <spec-content
              class="tab-content"
              ng-if="spec"
              .state=${this.state}
            ></spec-content>
          </div>
        </div>
      </main>`;
    }
    toggleEmbedPopup() { }
    showSidebar() { }
};
DirectSpec.styles = css `
    .tab-container {
      background-color: rgba(0, 0, 0, 0.12);
      height: 100%;
    }

    .tab-container md-tab-content > div,
    .tab-content {
      height: 100%;
      overflow: hidden;
    }

    .tab-container md-tabs {
      height: 100%;
      background-color: #fff;
    }

    .tab-container.embed > md-tabs {
      /* tabs in right half to save screen space in embed view */
      width: 50%;
      margin-left: 50%;
      overflow: visible;
    }

    md-pagination-wrapper {
      /* workaround for a bug in angular material */
      /* https://github.com/angular/material/issues/5439 */
      width: 999999px !important;
    }

    .tab-container.embed > md-tabs > md-tabs-content-wrapper {
      /* tabs in right half to save screen space in embed view */
      margin-left: -100%;
    }

    .tab-container > md-tabs > md-tabs-wrapper {
      border-left: 1px solid rgba(0, 0, 0, 0.12) !important;
      padding-left: 48px; /* leave space for menu button */
      padding-right: 48px; /* leave space for embed button */
    }

    .embed.tab-container > md-tabs > md-tabs-wrapper {
      padding: 0;
    }

    .tab-container md-tab-item:not([disabled]) {
      color: #757575;
    }

    .tab-container md-tab-item:not([disabled]).md-active {
      color: #212121;
    }

    .tab-container md-ink-bar {
      color: #212121;
      background: #212121;
    }

    .tab-container [role='tabpanel'] {
      transition: none;
    }

    *[layout='row'] {
      display: flex;
      flex-direction: row;
    }

    .header-action {
      display: inline-block;
      width: 48px;
      height: 48px;
      padding: 12px;
      opacity: 0.7;
      cursor: pointer;
    }

    .header-action::before {
      font-size: 24px;
    }

    .icon-q_menu {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1;
    }

    .embed-details-icon {
      position: fixed;
      right: 0;
      top: 4px;
      z-index: 1;
    }

    md-pagination-wrapper {
      /* workaround for a bug in angular material */
      /* https://github.com/angular/material/issues/5439 */
      width: 999999px !important;
    }

    .tab-container.embed > md-tabs > md-tabs-content-wrapper {
      /* tabs in right half to save screen space in embed view */
      margin-left: -100%;
    }

    .tab-container > md-tabs > md-tabs-wrapper {
      border-left: 1px solid rgba(0, 0, 0, 0.12) !important;
      padding-left: 48px; /* leave space for menu button */
      padding-right: 48px; /* leave space for embed button */
    }

    .embed.tab-container > md-tabs > md-tabs-wrapper {
      padding: 0;
    }

    .tab-container md-tab-item:not([disabled]) {
      color: #757575;
    }

    .tab-container md-tab-item:not([disabled]).md-active {
      color: #212121;
    }

    .tab-container md-ink-bar {
      color: #212121;
      background: #212121;
    }

    .tab-container [role='tabpanel'] {
      transition: none;
    }

    main {
      position: relative;
    }
    header {
      display: flex;
      flex-direction: row;
    }
    mwc-tab-bar {
      margin-left: 60px;
      margin-right: 90px;
      flex: 1;
    }
  `;
__decorate([
    property({ type: Object })
], DirectSpec.prototype, "state", void 0);
DirectSpec = __decorate([
    customElement('direct-spec')
], DirectSpec);
export { DirectSpec };
