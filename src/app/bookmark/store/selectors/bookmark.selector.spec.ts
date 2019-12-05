import { Bookmark } from '../../models';
import {
  State as BookmarkState,
  featureName,
  initialState,
  adapter
} from '../states';
import * as BookmarkSelectors from './bookmark.selector';

interface State {
  [featureName]: BookmarkState;
}

describe('BookmarkSelector', () => {
  it('should handle selectors', () => {
    const bookmarks: Bookmark[] = [
      {
        id: 1,
        name: 'test1',
        url: 'localhost',
        group: 'Test G1',
        createdAt: 1000000,
        updatedAt: 2000000
      },
      {
        id: 2,
        name: 'test2',
        url: 'localhost',
        group: 'Test G2',
        createdAt: 1000000,
        updatedAt: 2000000
      },
      {
        id: 3,
        name: 'test3',
        url: 'localhost',
        group: 'Test G3',
        createdAt: 1000000,
        updatedAt: 2000000
      }
    ];
    const state: State = {
      [featureName]: adapter.addAll(bookmarks, {
        ...initialState,
        loading: true,
        selectedId: 1
      })
    };
    expect(BookmarkSelectors.getLoading(state)).toEqual(state.bookmark.loading);
    expect(BookmarkSelectors.getError(state)).toEqual(state.bookmark.error);
    expect(BookmarkSelectors.getSelectedId(state)).toEqual(state.bookmark.selectedId);
    expect(BookmarkSelectors.getBookmark(state)).toEqual(bookmarks[0]);
  });
});
