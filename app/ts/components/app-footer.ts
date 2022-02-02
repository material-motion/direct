import {html, css, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('app-footer')
export class AppFooter extends LitElement {
  static styles = css`
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

  render() {
    return html`<footer>
      <p>
        <a href="/#/">Direct</a> is a tool that helps motion designers
        provide<br />clear, precise motion direction for engineers at Google.
      </p>
    </footer> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-footer': AppFooter;
  }
}
