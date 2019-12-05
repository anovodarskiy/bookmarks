import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, featureName, adapter } from '../states';

/**
 * Selectors
 */
const getBookmarkState = createFeatureSelector<State>(featureName);
const { selectAll, selectEntities } = adapter.getSelectors();

export const getLoading = createSelector(
  getBookmarkState,
  state => state.loading
);

export const getError = createSelector(
  getBookmarkState,
  state => state.error
);

export const getSelectedId = createSelector(
  getBookmarkState,
  state => state.selectedId
);

export const getBookmarks = createSelector(
  getBookmarkState,
  selectAll
);

export const getBookmarkEntities = createSelector(
  getBookmarkState,
  selectEntities
);

export const getBookmark = createSelector(
  getSelectedId,
  getBookmarkEntities,
  (id, entities) => entities[id]
);
