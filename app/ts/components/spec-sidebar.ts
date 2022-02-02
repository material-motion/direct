import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {AppState} from '../classes/state';

@customElement('spec-sidebar')
export class SpecSidebar extends LitElement {
  static styles = css`
    .sidebar-header {
      padding: 128px 32px 32px;
      background-color: #7b1fa2;
      color: #fff;
      border-bottom: none;
      cursor: pointer;
    }

    .sidebar-header h3 {
      margin: 0;
      padding: 0;
      font-weight: 400;
      font-size: 20px;
    }

    .sidebar-header h4 {
      margin: 0;
      padding: 0;
      font-weight: 300;
      font-size: 16px;
    }

    .sidebar-main {
      overflow-y: auto;
      max-height: calc(100% - 330px);
    }

    .sidebar-section {
      border-bottom: 1px solid #eee;
    }

    .sidebar-section-title {
      color: #a06dbf;
      font-weight: 400;
      font-size: 14px;
      padding: 32px 32px 12px;
      text-transform: uppercase;
    }

    .sidebar-section-title b {
      color: #6a1b9a;
    }

    .group-title-link {
      text-decoration: none;
    }

    .sidebar-section-list {
      margin: 0;
      padding: 0;
      list-style-type: none;
    }

    .sidebar-section-list li {
      margin: 0;
      padding: 0;
    }

    .sidebar-section-list li a {
      display: block;
      text-decoration: none;
      color: #737373;
      font-weight: 400;
      font-size: 16px;
      padding: 8px 32px;
    }

    .sidebar-section-list li:last-child a {
      margin-bottom: 32px;
    }

    .sidebar-section-list li a:hover {
      background: #fafafa;
    }
  `;

  @property({type: Object}) state!: AppState;

  render() {
    const {projectGroups, user} = this.state;
    return html`<section
        class="sidebar-header"
        @click=${() => (location.hash = '/user/' + user)}
      >
        <h3>${user}'s</h3>
        <h4>Directions</h4>
      </section>

      <section class="sidebar-main">
        ${projectGroups.map(
          group => html`<div class="sidebar-section">
            <div class="sidebar-section-title">
              <a class="group-title-link" href="/#/group/${group?.group}"
                ><b>${group?.group}</b> Directions</a
              >
            </div>

            <ul class="sidebar-section-list">
              ${group.projects.map(
                project => html` <li>
                  <a href="/#/spec/${project?.id}">${project?.title}</a>
                </li>`
              )}
            </ul>
          </div>`
        )}
      </section> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'spec-sidebar': SpecSidebar;
  }
}
