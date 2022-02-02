import {html, css, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

import './routes/login.js';
import './routes/spec.js';
import './routes/user.js';
import './routes/index.js';
import {defaultSpec} from './classes/spec.js';
import {AppState, defaultState} from './classes/state.js';

@customElement('direct-app')
export class DirectApp extends LitElement {
  static styles = css``;

  @property() route = '/';
  @property({type: Object}) state: AppState = defaultState;

  render() {
    if (this.route === '/') {
      return html`<home-page .state=${this.state}></home-page>`;
    }
    if (this.route.startsWith('/user/')) {
      return html`<user-page .state=${this.state}></user-page>`;
    }
    if (this.route.startsWith('/spec/')) {
      return html`<direct-spec .state=${this.state}></direct-spec>`;
    }
    return html`<login-page></login-page>`;
  }

  firstUpdated() {
    this.addEventListener('login', () => {
      this.state.user = '123';
      localStorage.setItem('user', this.state.user!);
      this.route = '/';
    });
    window.addEventListener('hashchange', () => this.checkRoute());
    this.checkRoute();
  }

  async checkRoute() {
    const route = window.location.hash.slice(1);
    if (route === '/group/') {
      this.route = `/`;
      history.replaceState(null, '', `#${this.route}`);
      return;
    }
    if (route === '/spec/') {
      // TODO: Create spec
      const spec = {...defaultSpec};
      this.state.projects ??= [];
      this.state.projects.push(spec);
      this.state.current = spec;
      this.route = `/spec/${spec.id}`;
      history.replaceState(null, '', `#${this.route}`);
      return;
    }
    if (route.startsWith('/spec/')) {
      const specId = route.slice(6);
      const specKey = `spec-${specId}`;
      localStorage.setItem(specKey, JSON.stringify(defaultSpec));
      const cache = localStorage.getItem(specKey);
      if (cache) {
        this.state.current = JSON.parse(cache);
      } else {
        // TODO: Api call, for now wait 1 seconds
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.state.current = {...defaultSpec};
      }
    }
    if (route !== this.route) {
      this.route = route;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'direct-app': DirectApp;
  }
}
