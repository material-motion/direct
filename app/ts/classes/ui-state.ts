export interface UiState {
  sidebar: boolean;
  showingEmbedPopup: boolean;
  saveInProgress: boolean;
  overlay: boolean;
}

export const defaultUiState = {
  sidebar: false,
  showingEmbedPopup: false,
  saveInProgress: false,
  overlay: false,
};
