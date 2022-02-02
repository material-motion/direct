import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {AppState} from '../classes/state.js';

import '../components/app-base.js';
import '../components/project-card.js';

@customElement('user-page')
export class UserPage extends LitElement {
  static styles = css`
    .blank-slate {
      text-align: center;
      color: #737373;
      padding-top: 64px;
    }

    .blank-slate a {
      color: #737373;
    }

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

    .project-list {
      margin: 0;
      padding: 0;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
    }

    .project-checkbox {
      margin: 0;
      margin-right: -48px;
      margin-left: -24px; /* less margin on left due to checkbox */
      padding: 0;
      background-color: #fff;
      border-bottom: 1px solid #eee;
      -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25);
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25);
    }

    .project-checkbox > .md-label {
      display: block;
      margin: 0;
    }

    .project-checkbox > .md-container {
      left: 18px;
      display: none;
    }

    .project-checkbox:hover > .md-container {
      display: block;
    }

    .main-container.selecting .project-checkbox > .md-container {
      display: block;
    }

    .project-checkbox:first-child {
      -webkit-border-radius: 3px 3px 0 0;
      -moz-border-radius: 3px 3px 0 0;
      border-radius: 3px 3px 0 0;
    }

    .project-checkbox:last-child {
      border-bottom: none;
      -webkit-border-radius: 0 0 3px 3px;
      -moz-border-radius: 0 0 3px 3px;
      border-radius: 0 0 3px 3px;
    }

    .project-checkbox .project {
      padding-left: 0;
      padding-right: 48px;
      margin-left: 48px;
      border-bottom: none;
      -webkit-box-shadow: none;
      box-shadow: none;
    }

    .main-container.selecting .project-bottom-bar {
      display: block;
    }

    .project-bottom-bar {
      display: none;
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      background: #6a1b9a;
      text-align: center;
    }

    .project-bottom-bar a {
      display: block;
      line-height: 64px;
      text-decoration: none;
      font-size: 16px;
      font-weight: 500;
      color: #fff;
      text-transform: uppercase;
    }
  `;

  @property({type: Object}) state!: AppState;

  render() {
    const {projects, current} = this.state;
    if (projects.length === 0) {
      return html`<app-base>
        <div class="blank-slate">
          You don't have any projects yet.
          <a href="/#/spec/">Create your first project</a>
        </div>
      </app-base>`;
    }
    return html`<app-base>
      <section class="group" ng-repeat="group in projectGroups">
        <a class="group-title-link" href="/#/group/${current?.groupHandle}"
          ><h3 class="group-title">
            <b>${current?.group || ''}</b> Directions
          </h3></a
        >
        <div class="project-list">
          ${projects.map(project => {
            return html` <project-card
              href="/#/spec/${project.id}"
              .project=${project}
            ></project-card>`;
          })}
        </div>
      </section>
      <div class="project-bottom-bar">
        <a href="/#/spec/{{selectedToRouteParam()}}">
          open selected as group ({{selected.length}})
        </a>
      </div>
    </app-base>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'user-page': UserPage;
  }
}
