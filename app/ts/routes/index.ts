import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import '../components/app-base.js';
import '../components/project-card.js';

@customElement('home-page')
export class HomePage extends LitElement {
  static styles = css`
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

  @property() user = '';

  render() {
    return html`<app-base>
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
}

declare global {
  interface HTMLElementTagNameMap {
    'home-page': HomePage;
  }
}
