var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './app-header.js';
import './app-footer.js';
import '@material/mwc-fab';
let AppBase = class AppBase extends LitElement {
    constructor() {
        super(...arguments);
        this.user = '';
    }
    render() {
        return html `<div id="root">
      <app-header></app-header>

      <main role="main" class="main-container">
        <slot></slot>
      </main>

      <mwc-fab
        class="fab md-fab"
        icon="add"
        aria-label="New Spec"
        @click=${() => location.hash = '/spec/'}
      ></mwc-fab>

      <app-footer></app-footer>
    </div>`;
    }
};
AppBase.styles = css `
    #root {
      position: relative;
    }
    /* User / Group Pages */
    .main-container {
      margin: 100px auto;
      width: 100%;
      max-width: 600px;
    }

    .fab {
      position: fixed;
      right: 32px;
      bottom: 32px;
      margin: 6px 8px;
      margin-top: 6px;
      margin-right: 8px;
      margin-bottom: 6px;
      margin-left: 8px;
      --mdc-fab-box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    }
  `;
__decorate([
    property()
], AppBase.prototype, "user", void 0);
AppBase = __decorate([
    customElement('app-base')
], AppBase);
export { AppBase };
