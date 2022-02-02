var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
let AppFooter = class AppFooter extends LitElement {
    render() {
        return html `<footer>
      <p>
        <a href="/#/">Direct</a> is a tool that helps motion designers
        provide<br />clear, precise motion direction for engineers at Google.
      </p>
    </footer> `;
    }
};
AppFooter.styles = css `
    footer {
      color: #b5b5b5;
    }

    footer p {
      display: block;
      border-top: 1px solid #cfcfcf;
      width: 600px;
      margin: 40px auto;
      padding: 48px 0;
      text-align: center;
    }

    footer a {
      color: #737373;
      text-decoration: none;
    }
  `;
AppFooter = __decorate([
    customElement('app-footer')
], AppFooter);
export { AppFooter };
