var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
let SpecEmbedDetails = class SpecEmbedDetails extends LitElement {
    render() {
        return html `<div class="popup-cnt">
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
};
SpecEmbedDetails.styles = css ``;
__decorate([
    property({ type: Object })
], SpecEmbedDetails.prototype, "state", void 0);
SpecEmbedDetails = __decorate([
    customElement('spec-embed-details')
], SpecEmbedDetails);
export { SpecEmbedDetails };
