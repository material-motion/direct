var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import './spec-content-header.js';
import './spec-content-info.js';
import './spec-row.js';
import '@material/mwc-icon-button';
let SpecContent = class SpecContent extends LitElement {
    render() {
        const { current } = this.state;
        const { spec } = current || {};
        const hasVideo = spec && spec.videoSrc;
        return html `<div class="spec-content">
      ${hasVideo
            ? html ` <div class="video-view">
            <video
              preload="auto"
              loaded-data
              scrubbable="spec"
              src="${spec === null || spec === void 0 ? void 0 : spec.videoSrc}"
            ></video>
          </div>`
            : html ``}

      <div class="timeline-view">
        <!-- .content-header (only display on non-embed views) -->
        <spec-content-header
          ?hidden=${this.state.embedded}
          .state=${this.state}
        ></spec-content-header>
        <!-- .spec-top-panel-->
        <div class="spec-top-panel">
          <div
            class="add-video"
            class=${classMap({ 'no-video': !hasVideo })}
            ng-show="editing"
          >
            <mwc-icon-button
              class="add-video-fab md-fab"
              aria-label="Add Video"
              @click=${() => this.toggleVideo()}
              icon="movie"
            >
            </mwc-icon-button>
          </div>
          <div class="spec-grid-containment">
            <div class="spec-grid-spacer" ng-click="toggleDrawer(null, false)">
              <canvas class="spec-grid" spec-grid="spec"></canvas>
            </div>

            <!-- Fake first row just for adding -->
            <div class="spec-row first-row">
              <div class="spec-item-wrap">
                <canvas class="spec-grid" spec-grid="spec"></canvas>

                <div
                  class="new-row-toggle"
                  ng-class="{adding: firstRow == addingRow}"
                  ng-hide="!editing"
                >
                  <span
                    class="icon-q_add_circle"
                    ng-click="toggleNewRow(firstRow)"
                    ng-hide="addingRow && firstRow != addingRow"
                  >
                    <span class="bg-white"></span>
                  </span>
                </div>

                <div class="new-row-line" ng-hide="firstRow == addingRow"></div>

                <div
                  class="new-row-canvas-wrap"
                  ng-class="{adding: firstRow == addingRow}"
                >
                  <canvas
                    class="new-row-canvas"
                    spec-draw="spec"
                    complete-fn="toggleNewRow(firstRow)"
                    position="-1"
                    ng-show="firstRow == addingRow"
                  ></canvas>
                </div>
              </div>
            </div>
            <!-- End fake first row -->

            <div
              class="spec-row-wrap"
              ui-sortable="sortableOptions"
              ng-model="spec.rows"
            >
              <!-- Start Single Row -->
              ${spec === null || spec === void 0 ? void 0 : spec.rows.map(row => html `<spec-row
                    class="spec-row"
                    .row=${row}
                    .state=${this.state}
                  ></spec-row>`)}
              <!-- End Single Row -->
            </div>

            <div
              class="spec-grid-spacer bottom"
              ng-click="toggleDrawer(null, false)"
            >
              <canvas class="spec-grid" spec-grid="spec"></canvas>
            </div>

            <!-- video scrub handle-->
            <div class="spec-grid-scrubber" ng-if="canScrubVideo">
              <div class="spec-grid-scrubber-bar"></div>
              <div class="spec-grid-scrubber-handle">
                <div class="spec-grid-scrubber-handle-shape"></div>
              </div>
            </div>
            <!--/ video scrub handle-->
          </div>
        </div>
        <!--/ .spec-top-panel-->

        <div class="spec-labels-wrap">
          <div class="spec-row">
            <div class="spec-grid-labels labels-frames">
              <div
                class="grid-label"
                ng-repeat="label in labels.frames track by $index"
              >
                {{label}}
              </div>
            </div>
          </div>

          <div class="spec-row">
            <div class="spec-grid-labels labels-ms">
              <div
                class="grid-label"
                ng-repeat="label in labels.ms track by $index"
              >
                {{label}}
              </div>
            </div>
          </div>

          <!-- video playback controls -->
          <div class="video-controls" ng-if="spec.videoSrc">
            <div class="video-control-group">
              <md-button
                class="md-icon-button play-pause-button"
                ng-click="toggleVideoPaused()"
                aria-label="Play/Pause"
              >
                <i class="material-icons" ng-if="video.paused">play_arrow</i>
                <i class="material-icons" ng-if="!video.paused">pause</i>
              </md-button>
              <span class="info-label current-time"
                >{{(video.currentTime * 1000) | number:2}} / {{(video.duration *
                1000) | number:2}} ms</span
              >
            </div>
            <div class="video-control-group">
              <md-input-container class="playback-rate-container">
                <md-select
                  class="info-label playback-rate"
                  ng-model="video.playbackRate"
                  aria-label="Video playback rate"
                >
                  <md-option ng-value="0.25">0.25x</md-option>
                  <md-option ng-value="0.5">0.5x</md-option>
                  <md-option ng-value="1">1x</md-option>
                  <md-option ng-value="2">2x</md-option>
                </md-select>
              </md-input-container>

              <md-button
                class="md-icon-button loop-button"
                ng-class="{active: video.loop}"
                @click=${() => this.toggleVideoLooping()}
              >
                <i class="material-icons">loop</i>
              </md-button>
            </div>
          </div>
          <!--/ video playback controls -->
        </div>

        <!--.spec-bottom-panel -->
        <div class="spec-bottom-panel">
          <spec-content-info .state=${this.state}></spec-content-info>
        </div>
        <!--/ .spec-bottom-panel -->
      </div>
      <!--/ .timeline-view -->
    </div> `;
    }
    toggleVideoLooping() { }
    toggleVideo() { }
};
SpecContent.styles = css `
    /* wraps spec-content.html */
    .spec-content {
      display: flex;
      height: 100%;
    }

    /* video player (left column) */
    .video-view {
      margin: 0 auto;
      padding: 48px;
      max-width: 50%;
      width: 50%;
      height: 100%;
      background: #d1d1d1;
    }

    .embed .video-view {
      padding: 0px;
      height: calc(100% - 48px);
      background: transparent;
    }

    .video-view video {
      max-width: 100%;
      max-height: 100%;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }

    /* Spec Content (right column) */
    .timeline-view {
      flex: auto;
      width: 50%;
      height: 100%;
      max-height: 100%;
      border-left: 1px solid rgba(0, 0, 0, 0.12);
      display: flex;
      flex-flow: column;
      justify-content: flex-end;
    }

    .spec-top-panel {
      flex: 1;
      height: 0;
      margin: 0 32px;
      position: relative;
    }

    .spec-bottom-panel {
      max-height: 45%;
      overflow-y: auto;
    }

    .spec-grid-containment {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }

    /* .video-controls */
    .video-controls {
      display: flex;
      justify-content: space-between;
      margin: 0 -19px;
      margin-bottom: -8px;
      color: #333;
    }

    .video-control-group {
      display: flex;
      align-items: baseline;
    }

    .video-controls .md-icon-button .material-icons {
      vertical-align: middle;
    }

    .video-controls .loop-button.active {
      color: rgb(255, 64, 129);
    }

    /* bottom panel (see spec-content-info.html) */
    .spec-bottom-panel-info {
      padding: 0 32px;
    }

    .spec-bottom-panel-info > div {
      margin: 16px 0;
    }

    .spec-comment-detail {
      display: none;
    }

    .spec-comment-detail.active.hasContent {
      display: block;
      margin-top: 16px;
    }

    .spec-comment-detail .spec-comment {
      font-size: 16px;
      line-height: 24px;
      color: #000;
    }

    .spec-comment-detail .spec-detail {
      font-size: 13px;
      line-height: 20px;
      color: #333;
    }

    .timeline-view .spec-comment md-input-container,
    .timeline-view .spec-detail md-input-container {
      padding: 5px 0;
    }

    .spec-info-row {
      display: none;
    }

    .spec-info-row.active {
      display: flex;
    }

    .info-label {
      font-size: 13px;
      line-height: 20px;
      color: #333;
    }

    .info-data {
      font-size: 16px;
      line-height: 24px;
      color: #000;
    }

    .spec-info-row .spec-info {
      margin-right: 5px;
      width: 100%;
    }

    .timeline-view md-input-container,
    .timeline-view md-input-container .md-input,
    .timeline-view md-input-container .md-select-value {
      padding: 0;
    }

    .spec-info-row .custom-velocity > .info-label {
      margin-top: 5px;
    }

    .timeline-view .delete-button {
      margin-left: auto;
    }

    .spec-row-wrap {
      /* supports drag-and-drop for spec rows */
      position: relative;
    }

    .spec-row {
      position: relative;
      display: flex;
      background: #fff;
      user-select: none;
    }

    .spec-item-wrap {
      position: relative;
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: 100%;
    }

    .spec-item-wrap.active {
      background: #f7f7f7;
      cursor: pointer;
    }

    /* Could add space for labels with the bottom attribute here. */
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

    .spec-item.resizing,
    .spec-item.resizing * {
      cursor: ew-resize;
    }

    .spec-video-warning {
      position: fixed;
      bottom: 15px;
      right: 0;
      left: 0;
      margin: 0 auto;
    }

    .item-canvas-wrap {
      position: relative;
      height: 30px;
    }

    .item-canvas-wrap:hover {
      cursor: pointer;
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

    .spec-grid-spacer {
      position: relative;
      height: 10px;
      width: 100%;
    }

    .spec-grid-spacer.bottom {
      flex-grow: 1;
    }

    /* timeline video scrubber */
    .spec-grid-scrubber {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 100%;
      width: 48px;
      transform: translateX(-50%);
      z-index: 2;
    }

    .spec-grid-scrubber-bar {
      height: 100%;
      width: 2px;
      margin: 0 auto;
      background: rgb(255, 64, 129);
    }

    .spec-grid-scrubber-handle {
      margin-top: -1px;
      cursor: ew-resize;
    }

    .spec-grid-scrubber-handle-shape {
      height: 12.5px;
      width: 10px;
      margin: 0 auto;
      clip-path: polygon(0 33%, 50% 0, 100% 33%, 100% 99%, 0% 100%);
      background: rgb(255, 64, 129);
    }

    /* Add Video */
    .add-video {
      position: absolute;
      left: -32px;
      bottom: 48px;
      height: 0;
      width: 0;
      z-index: 5;
    }

    .add-video.no-video {
      left: 0;
    }

    .add-video-fab {
      -webkit-transform: translate(-50%, -50%) !important;
      -moz-transform: translate(-50%, -50%) !important;
      transform: translate(-50%, -50%) !important;
      margin: 0;
    }
  `;
__decorate([
    property({ type: Object })
], SpecContent.prototype, "state", void 0);
SpecContent = __decorate([
    customElement('spec-content')
], SpecContent);
export { SpecContent };
