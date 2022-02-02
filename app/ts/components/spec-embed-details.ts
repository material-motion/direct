import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AppState } from "../classes/state";

@customElement('spec-embed-details')
export class SpecEmbedDetails extends LitElement {
  static styles = css``;

  @property({type: Object}) state!: AppState;

  render() {
    return html`<div class="popup-cnt">
      <div class="popup-row">
        <div class="info-data">Embed url</div>
        <div class="info-label">{{embedUrl}}</div>
      </div>
      <div class="popup-row">
        <div class="info-data">Spec tool snippet</div>
        <div class="info-label">&lt;iframe {{embedUrl}} | 500 &gt;</div>
      </div>
    </div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'spec-embed-details': SpecEmbedDetails;
  }
}