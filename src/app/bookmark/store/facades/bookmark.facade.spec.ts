import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { Bookmark } from '../../models';
import * as BookmarkActions from '../actions';
import { State } from '../states';
import { BookmarkFacade } from './bookmark.facade';

describe('BookmarkFacade', () => {
  let store: Store<State>;
  let facade: BookmarkFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideMockStore()]
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'pipe').and.callThrough();
    facade = TestBed.get(BookmarkFacade);
  }));

  it('should call loadAll', () => {
    facade.loadAll(0, 100);
    const action = BookmarkActions.loadAll({ offset: 0, limit: 100 });
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should call load', () => {
    const id = 1;
    facade.load(id);
    const action = BookmarkActions.load({ id });
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should call create', () => {
    const bookmark: Bookmark = {
      id: 1,
      name: 'test1',
      url: 'localhost',
      group: 'Test G1',
      createdAt: 1000000,
      updatedAt: 2000000
    };
    facade.create(bookmark);
    const action = BookmarkActions.create({ bookmark });
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should call update', () => {
    const bookmark: Bookmark = {
      id: 1,
      name: 'test1',
      url: 'localhost',
      group: 'Test G1',
      createdAt: 1000000,
      updatedAt: 2000000
    };
    facade.update(bookmark);
    const action = BookmarkActions.update({ bookmark });
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should call remove', () => {
    const id = 1;
    facade.remove(id);
    const action = BookmarkActions.remove({ id });
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should call showCreateDialog', () => {
    facade.showCreateDialog();
    const action = BookmarkActions.showCreateDialog();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should call showEditDialog', () => {
    const bookmark: Bookmark = {
      id: 1,
      name: 'test1',
      url: 'localhost',
      group: 'Test G1',
      createdAt: 1000000,
      updatedAt: 2000000
    };
    facade.showEditDialog(bookmark);
    const action = BookmarkActions.showEditDialog({ bookmark });
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should call showRemoveDialog', () => {
    const id = 1;
    facade.showRemoveDialog(id);
    const action = BookmarkActions.showRemoveDialog({ id });
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
