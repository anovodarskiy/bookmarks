import { Bookmark } from '../../models';
import * as BookmarkActions from '../actions';
import { State, initialState, adapter } from '../states';
import { reducer } from './bookmark.reducer';

describe('BookmarkReducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);
      expect(result).toBe(initialState);
    });
  });

  describe('BookmarkActions', () => {
    it('should handle loadAll', () => {
      const state: State = {
        ...initialState
      };
      const expected: State = {
        ...state,
        loading: true
      };
      const action = BookmarkActions.loadAll({ offset: 0, limit: 100 });
      expect(reducer(state, action)).toEqual(expected);
    });

    it('should handle loadAllSuccess', () => {
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
        ...initialState,
        loading: true
      };
      const expected: State = adapter.addAll(bookmarks, {
        ...state,
        loading: false
      });
      const action = BookmarkActions.loadAllSuccess({ bookmarks });
      expect(reducer(state, action)).toEqual(expected);
    });

    it('should handle loadAllFailure', () => {
      const error = 'error';
      const state: State = {
        ...initialState,
        loading: true
      };
      const expected: State = {
        ...state,
        loading: false,
        error
      };
      const action = BookmarkActions.loadAllFailure({ error });
      expect(reducer(state, action)).toEqual(expected);
    });

    it('should handle load', () => {
      const id = 1;
      const state: State = {
        ...initialState,
        loading: false
      };
      const expected: State = {
        ...state,
        loading: true,
        selectedId: id
      };
      const action = BookmarkActions.load({ id });
      expect(reducer(state, action)).toEqual(expected);
    });

    it('should handle loadSuccess', () => {
      const bookmark: Bookmark = {
        id: 1,
        name: 'test1',
        url: 'localhost',
        group: 'Test G1',
        createdAt: 1000000,
        updatedAt: 2000000
      };
      const state: State = {
        ...initialState,
        loading: true,
        selectedId: bookmark.id
      };
      const expected: State = adapter.upsertOne(bookmark, {
        ...state,
        loading: false
      });
      const action = BookmarkActions.loadSuccess({ bookmark });
      expect(reducer(state, action)).toEqual(expected);
    });

    it('should handle loadFailure', () => {
      const error = 'error';
      const state: State = {
        ...initialState,
        loading: true
      };
      const expected: State = {
        ...state,
        loading: false,
        error
      };
      const action = BookmarkActions.loadFailure({ error });
      expect(reducer(state, action)).toEqual(expected);
    });

    it('should handle create', () => {
      const bookmark: Partial<Bookmark> = {
        name: 'test1'
      };
      const state: State = {
        ...initialState,
        loading: false
      };
      const expected: State = {
        ...state,
        loading: true
      };
      const action = BookmarkActions.create({ bookmark });
      expect(reducer(state, action)).toEqual(expected);
    });

    it('should handle createSuccess', () => {
      const bookmark: Bookmark = {
        id: 1,
        name: 'test1',
        url: 'localhost',
        group: 'Test G1',
        createdAt: 1000000,
        updatedAt: 2000000
      };
      const state: State = {
        ...initialState,
        loading: true
      };
      const expected: State = adapter.addOne(bookmark, {
        ...state,
        loading: false
      });
      const action = BookmarkActions.createSuccess({ bookmark });
      expect(reducer(state, action)).toEqual(expected);
    });

    it('should handle createFailure', () => {
      const error = 'error';
      const state: State = {
        ...initialState,
        loading: true
      };
      const expected: State = {
        ...state,
        loading: false,
        error
      };
      const action = BookmarkActions.createFailure({ error });
      expect(reducer(state, action)).toEqual(expected);
    });

    it('should handle update', () => {
      const bookmark: Bookmark = {
        id: 1,
        name: 'test1a',
        url: 'localhost',
        group: 'Test G1',
        createdAt: 1000000,
        updatedAt: 2000000
      };
      const state: State = adapter.addOne(
        {
          id: 1,
          name: 'test1',
          url: 'localhost',
          group: 'Test G1',
          createdAt: 1000000,
          updatedAt: 2000000
        },
        { ...initialState }
      );
      const expected: State = {
        ...state,
        loading: true
      };
      const action = BookmarkActions.update({ bookmark });
      expect(reducer(state, action)).toEqual(expected);
    });

    it('should handle updateSuccess', () => {
      const bookmark: Bookmark = {
        id: 1,
        name: 'test1a',
        url: 'localhost',
        group: 'Test G1',
        createdAt: 1000000,
        updatedAt: 2000000
      };
      const state: State = adapter.addOne(
        {
          id: 1,
          name: 'test1',
          url: 'localhost',
          group: 'Test G1',
          createdAt: 1000000,
          updatedAt: 2000000
        },
        { ...initialState, loading: true }
      );
      const expected: State = adapter.updateOne(
        { id: bookmark.id, changes: bookmark },
        { ...state, loading: false }
      );
      const action = BookmarkActions.updateSuccess({ bookmark });
      expect(reducer(state, action)).toEqual(expected);
    });

    it('should handle updateFailure', () => {
      const error = 'error';
      const state: State = {
        ...initialState,
        loading: true
      };
      const expected: State = {
        ...state,
        loading: false,
        error
      };
      const action = BookmarkActions.updateFailure({ error });
      expect(reducer(state, action)).toEqual(expected);
    });

    it('should handle remove', () => {
      const id = 2;
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
      const state: State = adapter.addAll(bookmarks, { ...initialState });
      const expected: State = {
        ...state,
        loading: true
      };
      const action = BookmarkActions.remove({ id });
      expect(reducer(state, action)).toEqual(expected);
    });

    it('should handle removeSuccess', () => {
      const id = 2;
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
      const state: State = adapter.addAll(bookmarks, {
        ...initialState,
        loading: false
      });
      const expected: State = adapter.removeOne(id, { ...state });
      const action = BookmarkActions.removeSuccess({ id });
      expect(reducer(state, action)).toEqual(expected);
    });

    it('should handle deleteBookmarkFailure', () => {
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
      const error = 'error';
      const state: State = adapter.addAll(bookmarks, {
        ...initialState,
        loading: true
      });
      const expected: State = {
        ...state,
        loading: false,
        error
      };
      const action = BookmarkActions.removeFailure({ error });
      expect(reducer(state, action)).toEqual(expected);
    });
  });
});
