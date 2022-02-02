export interface Spec extends Group {
  title: string | null;
  spec: SpecClass;
  multispec?: SpecClass[];
  id: number | string;
  permissions?: Permissions;
}

export interface Group {
  group: string | null;
  groupHandle: string | null;
}

export interface Permissions {
  owner: string;
  editors: any[];
  viewers: any[];
  privacy: string;
}

export interface SpecClass {
  divisions: Divisions;
  canvas: Canvas;
  rows: Row[];
  videoUrl: string | null;
  title: string | null;
  exactTiming: boolean;
  duration: number;
  fps: number;
  frames: number;
  videoSrc?: string;
}

export interface Canvas {
  width?: number;
}

export interface Divisions {
  minorFrames?: number;
  minor?: number;
  major?: number;
  majorFrames?: number;
  minorCount?: number;
  minorGap?: number;
  majorCount?: number;
  majorGap?: number;
}

export interface Row {
  durationFrames: number;
  comment: string | null;
  color: string;
  customTag: null;
  delayFrames: number;
  delay: number;
  tag: Easing;
  easingCustomOutgoing: number;
  easingCustomIncoming: number;
  duration: number;
  easing: Easing;
  properties: null;
  detail?: string;
}

export interface Easing {
  value: string;
  label: string;
}

export const defaultSpec: Spec = {
  group: null,
  groupHandle: null,
  title: 'My cool title',
  permissions: {
    privacy: 'public',
    owner: 'rodydavis',
    editors: [],
    viewers: [],
  },
  spec: {
    title: 'Details...',
    videoUrl: null,
    duration: 500.00000000000006,
    frames: 30,
    fps: 60,
    exactTiming: false,
    canvas: {
      width: 948,
    },
    divisions: {
      minor: 16.666666666666668,
      minorFrames: 1,
      major: 83.33333333333334,
      majorFrames: 5,
      minorCount: 30,
      minorGap: 31.6,
      majorCount: 6,
      majorGap: 158,
    },
    rows: [
      {
        delay: 16.666666666666668,
        delayFrames: 1,
        duration: 100,
        durationFrames: 6,
        color: '#737373',
        properties: null,
        easing: {
          label: '80% Incoming, 40% Outgoing',
          value: 'quantum',
        },
        easingCustomIncoming: 0,
        easingCustomOutgoing: 0,
        tag: {
          label: 'None',
          value: 'none',
        },
        customTag: null,
        comment: null,
      },
      {
        delay: 183.33333333333334,
        delayFrames: 11,
        duration: 116.66666666666666,
        durationFrames: 7,
        color: '#5677FC',
        properties: null,
        easing: {
          label: '80% Incoming, 40% Outgoing',
          value: 'quantum',
        },
        easingCustomIncoming: 0,
        easingCustomOutgoing: 0,
        tag: {
          label: 'None',
          value: 'none',
        },
        customTag: null,
        comment: 'Animation Label',

        detail: 'Some cool faces',
      },
      {
        delay: 100,
        delayFrames: 6,
        duration: 16.666666666666668,
        durationFrames: 1,
        color: '#FFC107',
        properties: null,
        easing: {
          label: 'Linear',
          value: 'linear',
        },
        easingCustomIncoming: 0,
        easingCustomOutgoing: 0,
        tag: {
          label: 'Rotation',
          value: 'rotation',
        },
        customTag: null,
        comment: 'My Label',
      },
    ],
  },
  id: 3833356,
};
