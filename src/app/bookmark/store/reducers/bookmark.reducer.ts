import { Action, createReducer, on } from '@ngrx/store';

import { State, initialState, adapter } from '../states';
import * as BookmarkActions from '../actions';

const bookmarkReducer = createReducer(
  initialState,
  on(BookmarkActions.loadAll, state => {
    return { ...state, loading: true };
  }),
  on(BookmarkActions.loadAllSuccess, (state, { bookmarks }) => {
    return adapter.addAll(bookmarks, { ...state, loading: false });
  }),
  on(BookmarkActions.loadAllFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
  on(BookmarkActions.load, (state, { id }) => {
    return { ...state, loading: true, selectedId: id };
  }),
  on(BookmarkActions.loadSuccess, (state, { bookmark }) => {
    return adapter.upsertOne(bookmark, { ...state, loading: false });
  }),
  on(BookmarkActions.loadFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
  on(BookmarkActions.create, state => {
    return { ...state, loading: true };
  }),
  on(BookmarkActions.createSuccess, (state, { bookmark }) => {
    return adapter.addOne(bookmark, { ...state, loading: false });
  }),
  on(BookmarkActions.createFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
  on(BookmarkActions.update, state => {
    return { ...state, loading: true };
  }),
  on(BookmarkActions.updateSuccess, (state, { bookmark }) => {
    return adapter.updateOne(
      { id: bookmark.id, changes: bookmark },
      { ...state, loading: false }
    );
  }),
  on(BookmarkActions.updateFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
  on(BookmarkActions.remove, state => {
    return { ...state, loading: true };
  }),
  on(BookmarkActions.removeSuccess, (state, { id }) => {
    return adapter.removeOne(id, { ...state, loading: false });
  }),
  on(BookmarkActions.removeFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  })
);

/**
 * Reducer
 * @param state State
 * @param action Action
 */
export function reducer(state: State, action: Action) {
  return bookmarkReducer(state, action);
}
