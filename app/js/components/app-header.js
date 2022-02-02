var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
let AppHeader = class AppHeader extends LitElement {
    render() {
        return html ` <header class="branded">
      <a href="/#/" class="logo">
        <img src="/app/img/direct-header@2x.png" alt="Direct" />
      </a>
    </header>`;
    }
};
AppHeader.styles = css `
    /* Header */
    header {
      background-color: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
      margin: 0;
      padding: 0;
    }

    a {
      color: inherit;
    }

    :focus {
      outline: 0;
    }

    .branded {
      font-size: 0;
      margin-bottom: 120px;
      text-align: center;
      height: 191px;
    }

    .logo {
      display: inline-block;
      width: 600px;
      height: 370px;
    }

    .logo img {
      max-width: 100%;
    }

    .header-progress-linear {
      position: fixed;
      z-index: 999;
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

    .header-action {
      display: inline-block;
      width: 48px;
      height: 48px;
      padding: 12px;
      opacity: 0.7;
      cursor: pointer;
    }

    .header-action::before {
      font-size: 24px;
    }

    a.header-action {
      width: auto;
    }

    button.header-action {
      padding: 0;
    }

    .header-action md-icon,
    .header-action .material-icons {
      vertical-align: text-bottom;
    }

    .header-action md-icon svg {
      fill: rgba(0, 0, 0, 0.87);
    }

    .icon-q_menu {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1;
    }

    .embed-details-icon {
      position: fixed;
      right: 0;
      top: 4px;
      z-index: 1;
    }

    .md-button.md-icon-button {
      margin: 0;
    }

    md-input-container.md-default-theme.md-input-focused input,
    md-input-container.md-default-theme.md-input-focused textarea,
    md-input-container.md-default-theme:not(.md-input-invalid).md-input-focused
      .md-input {
      border-color: #cd90d6;
    }

    md-input-container.md-default-theme.md-input-focused label,
    md-input-container.md-default-theme:not(.md-input-invalid).md-input-focused
      label {
      color: #cd90d6;
    }

    md-input-container.md-spec-head-theme:not(.md-input-invalid).md-input-focused
      label {
      color: #fff;
    }

    md-input-container.md-spec-head-theme:not(.md-input-invalid).md-input-focused
      .md-input {
      color: #fff;
      border-color: #fff;
    }

    md-input-container.md-spec-head-theme .md-input {
      color: #fff;
      border-color: #fff;
    }

    md-input-container.md-spec-head-theme input,
    md-input-container.md-spec-head-theme textarea {
      text-shadow: none;
      font-weight: 300;
      color: #fff;
      border-color: #fff;
    }

    md-input-container.md-spec-head-theme input:-ms-input-placeholder,
    md-input-container.md-spec-head-theme textarea:-ms-input-placeholder {
      color: rgba(255, 255, 255, 0.7);
    }

    md-input-container.md-spec-head-theme input::-webkit-input-placeholder,
    md-input-container.md-spec-head-theme textarea::-webkit-input-placeholder {
      color: rgba(255, 255, 255, 0.7);
    }

    md-input-container.md-spec-head-theme label {
      text-shadow: none;
      color: rgba(255, 255, 255, 0.7);
    }

    md-input-container.md-spec-head-theme.md-input-focused input,
    md-input-container.md-spec-head-theme.md-input-focused textarea {
      border-color: #fff;
    }

    md-input-container.md-spec-head-theme.md-input-focused label {
      color: #fff;
    }

    md-input-container.md-spec-head-theme.md-input-has-value:not(.md-input-focused)
      label {
      color: rgba(255, 255, 255, 0.7);
    }
  `;
AppHeader = __decorate([
    customElement('app-header')
], AppHeader);
export { AppHeader };
