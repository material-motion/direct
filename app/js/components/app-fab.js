var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
let AppFab = class AppFab extends LitElement {
    render() {
        return html ` <mwc-fab
      class="fab md-fab"
      icon="add"
      aria-label="New Spec"
     
    ></mwc-fab>`;
    }
};
AppFab.styles = css `
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
AppFab = __decorate([
    customElement('app-fab')
], AppFab);
export { AppFab };
