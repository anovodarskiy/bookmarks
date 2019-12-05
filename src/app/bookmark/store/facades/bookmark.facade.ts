import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Bookmark } from '../../models';
import { State } from '../states';
import * as BookmarkSelectors from '../selectors';
import * as BookmarkActions from '../actions';

@Injectable({
  providedIn: 'root'
})
export class BookmarkFacade {
  loading$ = this.store.pipe(select(BookmarkSelectors.getLoading));
  bookmarks$ = this.store.pipe(select(BookmarkSelectors.getBookmarks));
  bookmark$ = this.store.pipe(select(BookmarkSelectors.getBookmark));

  constructor(private store: Store<State>) { }

  /**
   * Load all
   * @param offset Offset
   * @param limit Limit
   */
  loadAll(offset?: number, limit?: number) {
    this.store.dispatch(BookmarkActions.loadAll({ offset, limit }));
  }

  /**
   * Load
   * @param id ID
   */
  load(id: number) {
    this.store.dispatch(BookmarkActions.load({ id }));
  }

  /**
   * Create
   * @param bookmark Bookmark
   */
  create(bookmark: Partial<Bookmark>) {
    this.store.dispatch(BookmarkActions.create({ bookmark }));
  }

  /**
   * Update
   * @param bookmark Bookmark
   */
  update(bookmark: Bookmark) {
    this.store.dispatch(BookmarkActions.update({ bookmark }));
  }

  /**
   * Remove
   * @param id ID
   */
  remove(id: number) {
    this.store.dispatch(BookmarkActions.remove({ id }));
  }

  /**
   * Show create dialog
   */
  showCreateDialog() {
    this.store.dispatch(BookmarkActions.showCreateDialog());
  }

  /**
   * Show edit dialog
   * @param bookmark Bookmark
   */
  showEditDialog(bookmark: Bookmark) {
    this.store.dispatch(BookmarkActions.showEditDialog({ bookmark }));
  }

  /**
   * Show delete dialog
   * @param id ID
   */
  showRemoveDialog(id: number) {
    this.store.dispatch(BookmarkActions.showRemoveDialog({ id }));
  }
}
