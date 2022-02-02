import { defaultSpec } from './spec';
import { defaultUiState } from './ui-state';
export const defaultState = {
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
