var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let ProjectCard = class ProjectCard extends LitElement {
    constructor() {
        super(...arguments);
        this.href = '#';
        this.selectable = false;
    }
    render() {
        if (this.selectable) {
            return html ` <md-checkbox
        class="project-checkbox"
        ng-checked="isSelected(project)"
        ng-click="toggleSelected(project)"
        ng-repeat="project in group.projects | orderBy:'title'"
      >
        <a class="project" href="/#/spec/{{project.id}}">
          <span class="project-title">{{project.title}}</span>

          <span class="project-owner">
            <span>{{project.owner}}</span>
          </span>

          <span class="project-actions">
            <md-button
              class="md-icon-button"
              aria-label="Duplicate"
              ng-click="duplicateProject($event, project)"
            >
              <md-icon
                md-svg-icon="img/ic_content_copy_grey600_48dp.svg"
              ></md-icon>
            </md-button>

            <md-button
              ng-if="user === project.owner"
              class="md-icon-button"
              aria-label="Delete"
              ng-click="deleteProject($event, project)"
            >
              <md-icon md-svg-icon="img/ic_delete_grey600_48dp.svg"></md-icon>
            </md-button>
          </span>
        </a>
      </md-checkbox>`;
        }
        return html `
      <a class="project" href=${this.href}>
        <span class="project-title">${this.label || this.project.title}</span>
        <span class="project-owner">
          <span class="project-edit">
            <span class="icon-q_arrow_forward"></span>
          </span>
        </span>
      </a>
    `;
    }
};
ProjectCard.styles = css `
    .project {
      position: relative;
      display: flex;
      padding: 20px 24px;
      line-height: 24px;
      /* min-height: 64px; */
      text-decoration: none;
      background-color: #fff;
      border-bottom: 1px solid #eee;
      -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25);
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25);
    }

    .project:hover > .project-owner {
      display: none;
    }

    .project:hover > .project-actions {
      display: block;
    }

    .project-title {
      flex-basis: 75%;
      text-align: left;
      color: #737373;
      font-size: 24px;
      font-weight: 400;
      line-height: 1.2;
      max-width: 75%;
      overflow-wrap: break-word;
    }

    .project-owner {
      flex-grow: 1;
      flex-shrink: 0;
      flex-basis: 25%;
      text-align: right;
      color: #b9b9b9;
      font-size: 16px;
      font-weight: 400;
    }

    .project-actions {
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      padding: 6px 14px 0;
      text-align: right;
      color: #b9b9b9;
    }

    .project-actions .md-button.md-icon-button {
      margin: 0;
      padding: 0;
      width: 36px;
      /*height: 36px;*/
    }

    .icon-q_arrow_forward:before {
      content: 'east';
      font-family: Material Icons;
      font-style: normal;
      font-weight: 400;
    }
  `;
__decorate([
    property({ type: String })
], ProjectCard.prototype, "href", void 0);
__decorate([
    property({ type: String })
], ProjectCard.prototype, "label", void 0);
__decorate([
    property({ type: Object })
], ProjectCard.prototype, "project", void 0);
__decorate([
    property({ type: Boolean })
], ProjectCard.prototype, "selectable", void 0);
ProjectCard = __decorate([
    customElement('project-card')
], ProjectCard);
export { ProjectCard };
