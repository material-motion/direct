var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let SpecRow = class SpecRow extends LitElement {
    render() {
        const row = this.row;
        return html `<div
      class="spec-item-wrap"
      ng-class="{active: row == selectedRow}"
    >
      <canvas class="spec-grid" spec-grid="spec"></canvas>

      <div
        class="spec-item"
        ng-class="{resizing: row == resizingRow}"
        ng-click="toggleDrawer(row)"
      >
        <div
          class="item-canvas-wrap"
          spec-canvas="row"
          duration="spec.duration"
          colors="colors"
        >
          <div
            spec-property-tag-sizer
            class="spec-property-tag"
            ng-style="{'backgroundColor': row.color}"
            ?hidden=${!(row.comment ||
            !(row.tag.label === 'None' ||
                (row.tag.label === 'Custom' &&
                    (row.customTag === null ||
                        row.customTag === undefined ||
                        row.customTag === ''))))}
          >
            <span ?hidden=${!(row.tag.label === 'Custom')}
              >${row.customTag}</span
            >
            <span
              ?hidden=${!(row.tag.label !== 'Custom' && row.tag.label !== 'None')}
              >${row.tag.label}</span
            >
            <span ?hidden=${!row.comment} class="comment">${row.comment}</span>
          </div>
          <!-- <div class="item-canvas"></div> -->
          <canvas class="item-canvas"></canvas>

          <div
            resizer="left"
            resizer-item="row"
            resizer-spec="spec"
            class="resizer resizer-left"
            ng-hide="!editing"
          ></div>

          <div
            resizer="right"
            resizer-item="row"
            resizer-spec="spec"
            class="resizer resizer-right"
            ng-hide="!editing"
          ></div>
        </div>
      </div>

      <div
        class="new-row-toggle"
        ng-class="{adding: row == addingRow}"
        ng-hide="!editing"
      >
        <span
          class="icon-q_add_circle"
          ng-click="toggleNewRow(row)"
          ng-hide="addingRow && row != addingRow"
        >
          <span class="bg-white"></span>
        </span>
      </div>

      <div class="new-row-line" ng-hide="row == addingRow"></div>

      <div class="new-row-canvas-wrap" ng-class="{adding: row == addingRow}">
        <canvas
          class="new-row-canvas"
          spec-draw="spec"
          complete-fn="toggleNewRow(row)"
          position="$index"
          ng-show="row == addingRow"
        ></canvas>
      </div>
    </div> `;
    }
};
SpecRow.styles = css `
    .spec-item-wrap:not(.active) .spec-property-tag {
      background-color: #e1e1e1 !important;
      color: #212121;
    }

    .item-canvas-wrap .spec-property-tag {
      position: absolute;
      left: 5px;
      bottom: -40px;
      z-index: 2;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow-x: hidden;
    }

    .spec-grid {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      pointer-events: none;
      /*z-index: 0; puts grid behind items */
    }

    .spec-item {
      position: relative;
      height: 70px;
      margin: 12px 0;
    }

    .item-canvas-wrap {
      position: relative;
      height: 30px;
    }

    /* make space for property tag when present */
    .spec-property-tag ~ .item-canvas {
      top: 0;
    }

    .item-canvas {
      position: relative;
      top: 16px;
      height: 30px;
      z-index: 2;
    }

    .resizer {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 48px;
      background: transparent;
      cursor: ew-resize;
      z-index: 3;
    }

    .resizer-left {
      left: -24px;
    }

    .resizer-right {
      right: -24px;
    }

    /* New Row Toggle */
    .new-row-toggle {
      position: absolute;
      width: 36px;
      height: 36px;
      bottom: -18px;
      overflow: hidden;
      text-align: center;
      z-index: 3;
    }

    .new-row-toggle > span {
      display: inline-block;
      font-size: 20px;
      color: #bababa;
      width: 36px;
      height: 36px;
      padding: 7px;
      cursor: pointer;
    }

    .new-row-toggle:hover > span {
      color: #ce93d8;
    }

    .new-row-toggle.adding {
      bottom: 12px;
    }

    .new-row-toggle.adding > span {
      color: #dd4230;
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      transform: rotate(45deg);
    }

    .new-row-toggle > span:before {
      position: relative;
      z-index: 1;
    }

    .new-row-toggle .bg-white {
      width: 16px;
      height: 16px;
      padding: 0;
      background: #fff;
      position: absolute;
      top: 9px;
      left: 10px;
      border-radius: 50%;
    }

    /* New Row Line */
    .new-row-line {
      position: relative;
      left: 0;
      height: 0;
      width: 100%;
      border-bottom: 1px dashed #eee;
      z-index: 2;
    }

    .new-row-toggle:hover + .new-row-line {
      left: -10px;
      width: calc(100% + 10px);
      border-bottom: 1px dashed #ce93d8;
      z-index: 3;
    }

    /* New Row Canvas */
    .new-row-canvas-wrap {
      position: relative;
      height: 0;
      overflow: hidden;
      z-index: 3;
    }

    .new-row-canvas-wrap.adding {
      height: 60px;
      border-top: 1px dashed #e9e0eb;
      border-bottom: 1px dashed #e9e0eb;
    }

    .new-row-canvas {
      width: 100%;
      height: 60px;
      cursor: crosshair;
    }
  `;
__decorate([
    property({ type: Object })
], SpecRow.prototype, "state", void 0);
__decorate([
    property({ type: Object })
], SpecRow.prototype, "row", void 0);
SpecRow = __decorate([
    customElement('spec-row')
], SpecRow);
export { SpecRow };
