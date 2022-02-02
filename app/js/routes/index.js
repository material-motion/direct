var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../components/app-base.js';
import '../components/project-card.js';
let HomePage = class HomePage extends LitElement {
    constructor() {
        super(...arguments);
        this.user = '';
    }
    render() {
        return html `<app-base>
      <section class="group">
        <h3 class="group-title">Quick Links</h3>

        <project-card
          href="/#/user/${this.user}"
          label="My Directions"
        ></project-card>

        <project-card
          href="/tutorial"
          label="How do I use Direct?"
        ></project-card>
      </section>
    </app-base>`;
    }
};
HomePage.styles = css `
    .group-title {
      margin: 0;
      padding: 24px;
      font-size: 16px;
      font-weight: 500;
      color: #bababa;
      text-transform: uppercase;
    }

    .group-title-link {
      text-decoration: none;
    }

    .group-title b {
      color: #737373;
    }
  `;
__decorate([
    property()
], HomePage.prototype, "user", void 0);
HomePage = __decorate([
    customElement('home-page')
], HomePage);
export { HomePage };
