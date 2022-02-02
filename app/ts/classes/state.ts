import {defaultSpec, Spec} from './spec';
import {defaultUiState, UiState} from './ui-state';

export interface AppState {
  current: Spec | null;
  projects: Spec[];
  projectGroups: UserGroup[];
  user: string | null;
  embedded: boolean;
  canEdit: boolean;
  editing: boolean;
  uiState: UiState;
}

export const defaultState: AppState = {
  current: defaultSpec,
  projects: [defaultSpec],
  user: localStorage.getItem('user'),
  embedded: false,
  canEdit: true,
  editing: true,
  projectGroups: [
    {
      group: 'Default',
      groupHandle: 'default',
      projects: [defaultSpec],
    },
  ],
  uiState: defaultUiState,
};

export interface UserGroup {
  group: string;
  groupHandle: string;
  projects: Spec[];
}
