import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {AppState} from '../classes/state';

import '@material/mwc-icon-button';
import './spec-settings.js';

@customElement('spec-content-header')
export class SpecContentHeader extends LitElement {
  static styles = css`
    /* .content-header */
    .content-header {
      display: flex;
      position: relative;
      width: 100%;
      background: #fff;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      padding: 4px 32px;
    }

    .content-header md-input-container {
      margin: 0;
      padding-bottom: 12px;
    }

    .content-header md-input-container label {
      padding: 0;
    }

    .spec-group {
      font-weight: 500;
    }

    .spec-title,
    .spec-subtitle {
      font-size: 14px;
      line-height: 1;
      font-weight: 400;
      padding-top: 6px;
    }

    .spec-title-link {
      text-decoration: none;
    }

    /* Header Actions */
    .header-actions {
      display: flex;
      font-size: 0;
    }

    .header-actions-left {
      flex: 2;
      text-align: left;
    }

    .header-actions-right {
      flex: 1;
      text-align: right;
    }

    mwc-icon-button {
      color: rgba(0, 0, 0, 0.87);
    }
  `;

  @property({type: Object}) state!: AppState;

  render() {
    const {current} = this.state;
    return html`<div class="content-header" ng-class="{editing: editing}">
      <div class="header-actions-left">
        <div class="spec-title">
          <a
            class="spec-title-link spec-group"
            href="/#/group/${current?.groupHandle}"
            ?hidden=${!current?.group}
            >${current?.group}</a
          >
          <span ?hidden=${!current?.group || !current?.title}>›</span>
          <a
            class="spec-title-link"
            href="/#/spec/${current?.id}"
            ?hidden=${!current?.title}
            >${current?.title}</a
          >
        </div>
        <div class="spec-subtitle" ?hidden=${!current?.spec?.title}>
          ${current?.spec?.title}
        </div>
      </div>

      ${!this.state.embedded
        ? this.renderRightActions()
        : this.renderEmbedRight()}
    </div>`;
  }

  renderEmbedRight() {
    return html` <div>
      <spec-settings
        class="popup settings-popup"
        ng-show="configuring"
        .state=${this.state}
      ></spec-settings>

      <div
        class="popup easing-details-popup"
        ng-show="showingCode"
        ng-include="'partials/spec-code.html'"
      ></div>

      <div id="overlay" ng-show="overlay" ng-click="closeOverlay()"></div>
    </div>`;
  }

  renderRightActions() {
    const {current, canEdit, editing} = this.state;
    return html` <div class="header-actions-right">
      <mwc-icon-button
        icon="delete"
        class="header-action md-icon-button"
        aria-label="Delete"
        ?hidden=${!editing}
      ></mwc-icon-button>

      <span
        id="js-action-settings"
        class="header-action icon-q_settings"
        ?hidden=${!editing}
        @click=${() => this.toggleConfig()}
      ></span>

      <mwc-icon-button
        icon="file_upload"
        class="header-action md-icon-button"
        ?hidden=${!editing}
        aria-label="Import Code"
        @click=${() => this.importJson()}
      ></mwc-icon-button>

      <span
        id="js-action-save"
        class="header-action icon-q_visibility"
        ?hidden=${!editing}
        @click=${() => this.previewSpec()}
      ></span>

      <mwc-icon-button
        icon="code"
        class="header-action md-icon-button"
        ?hidden=${editing}
        aria-label="Export Code"
        @click=${() => this.toggleCodePopup()}
      ></mwc-icon-button>

      <mwc-icon-button
        icon="file_download"
        class="header-action md-icon-button"
        ?hidden=${editing}
        aria-label="Export Code"
        @click=${() => this.exportJson()}
      ></mwc-icon-button>

      <span
        id="js-action-edit"
        class="header-action icon-q_create"
        ?hidden=${editing || !canEdit}
        @click=${() => this.editSpec()}
      ></span>

      <a
        class="header-action spec-title-link"
        href="/#/user/{{data.permissions.owner}}"
        ?hidden=${!current?.permissions?.owner || editing || canEdit}
        >{{data.permissions.owner}}</a
      >
    </div>`;
  }

  exportJson() {}

  toggleCodePopup() {}

  previewSpec() {}

  importJson() {}

  toggleConfig() {}

  editSpec() {}

  deleteProject() {}
}

declare global {
  interface HTMLElementTagNameMap {
    'spec-content-header': SpecContentHeader;
  }
}
