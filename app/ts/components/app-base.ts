import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import './app-header.js';
import './app-footer.js';
import '@material/mwc-fab';

@customElement('app-base')
export class AppBase extends LitElement {
  static styles = css`
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

  @property() user = '';

  render() {
    return html`<div id="root">
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
}

declare global {
  interface HTMLElementTagNameMap {
    'app-base': AppBase;
  }
}
