import {html, css, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('login-page')
export class LoginPage extends LitElement {
  static styles = css`
    main {
      width: 100%;
      height: 100vh;
    }
    
  `;

  render() {
    return html`<main>
      <header>Login</header>
      <section>
        <button
          @click=${() => {
            this.dispatchEvent(
              new CustomEvent('login', {bubbles: true, composed: true})
            );
          }}
        >
          Auth
        </button>
      </section>
    </main>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'login-page': LoginPage;
  }
}
