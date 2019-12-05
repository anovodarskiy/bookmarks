import { TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import { Bookmark } from '../../models';
import { BookmarkService } from '../../services';
import * as BookmarkActions from '../actions';
import { BookmarkEffects } from './bookmark.effect';

describe('BookmarkEffects', () => {
  let actions$: Observable<any>;
  let effects: BookmarkEffects;
  let service: BookmarkService;
  let dialog: MatDialog;
  // let dialogRef: MatDialogRef<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [
        BookmarkEffects,
        provideMockActions(() => actions$),
        {
          provide: MatDialog,
          useValue: jasmine.createSpyObj('MatDialog', ['open'])
        },
        {
          provide: BookmarkService,
          useValue: jasmine.createSpyObj('BookmarkService', [
            'findAll',
            'find',
            'create',
            'update',
            'remove'
          ])
        }
      ]
    });
    effects = TestBed.get(BookmarkEffects);
    dialog = TestBed.get(MatDialog);
    service = TestBed.get(BookmarkService);

    // jasmine.createSpy()
    // effects.createDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    // spyOn(effects, 'createDialogRef').and.returnValue(1);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadAll$', () => {
    it('should return loadAllSuccess', () => {
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
      const response = cold('-b', { b: bookmarks });
      service.findAll = () => response;

      const offset = 0;
      const limit = 100;
      const action = BookmarkActions.loadAll({ offset, limit });
      const completion = BookmarkActions.loadAllSuccess({ bookmarks });
      const expected = cold('--c', { c: completion });
      actions$ = hot('-a', { a: action });

      expect(effects.loadAll$).toBeObservable(expected);
    });

    it('should return loadAllFailure', () => {
      const error = 'error';
      const response = cold('-#', {}, error);
      service.findAll = () => response;

      const offset = 0;
      const limit = 100;
      const action = BookmarkActions.loadAll({ offset, limit });
      const completion = BookmarkActions.loadAllFailure({ error });
      const expected = cold('--c', { c: completion });
      actions$ = hot('-a', { a: action });

      expect(effects.loadAll$).toBeObservable(expected);
    });
  });

  describe('load$', () => {
    it('should return loadSuccess', () => {
      const bookmark: Bookmark = {
        id: 1,
        name: 'test1',
        url: 'localhost',
        group: 'Test G1',
        createdAt: 1000000,
        updatedAt: 2000000
      };
      const response = cold('-b', { b: bookmark });
      service.find = () => response;

      const id = 1;
      const action = BookmarkActions.load({ id });
      const completion = BookmarkActions.loadSuccess({ bookmark });
      const expected = cold('--c', { c: completion });
      actions$ = hot('-a', { a: action });

      expect(effects.load$).toBeObservable(expected);
    });

    it('should return loadFailure', () => {
      const error = 'error';
      const response = cold('-#', {}, error);
      service.find = () => response;

      const id = 1;
      const action = BookmarkActions.load({ id });
      const completion = BookmarkActions.loadFailure({ error });
      const expected = cold('--c', { c: completion });
      actions$ = hot('-a', { a: action });

      expect(effects.load$).toBeObservable(expected);
    });
  });

  describe('create$', () => {
    it('should return createSuccess', () => {
      const bookmark: Bookmark = {
        id: 1,
        name: 'test1',
        url: 'localhost',
        group: 'Test G1',
        createdAt: 1000000,
        updatedAt: 2000000
      };
      const response = cold('-b', { b: bookmark });
      service.create = () => response;

      const newBookmark: Partial<Bookmark> = {
        name: 'test1'
      };
      const action = BookmarkActions.create({ bookmark: newBookmark });
      const completion = BookmarkActions.createSuccess({ bookmark });
      const expected = cold('--c', { c: completion });
      actions$ = hot('-a', { a: action });

      expect(effects.create$).toBeObservable(expected);
    });

    it('should return createFailure', () => {
      const error = 'error';
      const response = cold('-#', {}, error);
      service.create = () => response;

      const bookmark: Partial<Bookmark> = {
        name: 'test1'
      };
      const action = BookmarkActions.create({ bookmark });
      const completion = BookmarkActions.createFailure({ error });
      const expected = cold('--c', { c: completion });
      actions$ = hot('-a', { a: action });

      expect(effects.create$).toBeObservable(expected);
    });
  });

  describe('update$', () => {
    it('should return updateSuccess', () => {
      const bookmark: Bookmark = {
        id: 1,
        name: 'test1',
        url: 'localhost',
        group: 'Test G1',
        createdAt: 1000000,
        updatedAt: 2000000
      };
      const response = cold('-b', { b: bookmark });
      service.update = () => response;

      const action = BookmarkActions.update({ bookmark });
      const completion = BookmarkActions.updateSuccess({ bookmark });
      const expected = cold('--c', { c: completion });
      actions$ = hot('-a', { a: action });

      expect(effects.update$).toBeObservable(expected);
    });

    it('should return updateFailure', () => {
      const error = 'error';
      const response = cold('-#', {}, error);
      service.update = () => response;

      const bookmark: Bookmark = {
        id: 1,
        name: 'test1',
        url: 'localhost',
        group: 'Test G1',
        createdAt: 1000000,
        updatedAt: 2000000
      };
      const action = BookmarkActions.update({ bookmark });
      const completion = BookmarkActions.updateFailure({ error });
      const expected = cold('--c', { c: completion });
      actions$ = hot('-a', { a: action });

      expect(effects.update$).toBeObservable(expected);
    });
  });

  describe('remove$', () => {
    it('should return removeSuccess', () => {
      const id = 1;
      const response = cold('-b', { b: id });
      service.remove = () => response;

      const action = BookmarkActions.remove({ id });
      const completion = BookmarkActions.removeSuccess({ id });
      const expected = cold('--c', { c: completion });
      actions$ = hot('-a', { a: action });

      expect(effects.remove$).toBeObservable(expected);
    });

    it('should return removeFailure', () => {
      const error = 'error';
      const response = cold('-#', {}, error);
      service.remove = () => response;

      const id = 1;
      const action = BookmarkActions.remove({ id });
      const completion = BookmarkActions.removeFailure({ error });
      const expected = cold('--c', { c: completion });
      actions$ = hot('-a', { a: action });

      expect(effects.remove$).toBeObservable(expected);
    });
  });

  describe('showCreateDialog$', () => {
    it('should open dialog', done => {
      const action = BookmarkActions.showCreateDialog();
      actions$ = of(action);
      effects.showCreateDialog$.subscribe(() => {
        expect(dialog.open).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('hideCreateDialog$', () => {
    it('should close dialog', done => {
      const bookmark: Bookmark = {
        id: 1,
        name: 'test1',
        url: 'localhost',
        group: 'Test G1',
        createdAt: 1000000,
        updatedAt: 2000000
      };
      const action = BookmarkActions.createSuccess({ bookmark });
      actions$ = of(action);
      effects.createDialogRef = { close: () => { } } as MatDialogRef<any>;
      spyOn(effects.createDialogRef, 'close').and.callThrough();
      effects.hideCreateDialog$.subscribe(() => {
        expect(effects.createDialogRef.close).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('showEditDialog$', () => {
    it('should open dialog', done => {
      const bookmark: Bookmark = {
        id: 1,
        name: 'test1',
        url: 'localhost',
        group: 'Test G1',
        createdAt: 1000000,
        updatedAt: 2000000
      };
      const action = BookmarkActions.showEditDialog({ bookmark });
      actions$ = of(action);
      effects.showEditDialog$.subscribe(() => {
        expect(dialog.open).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('hideEditDialog$', () => {
    it('should close dialog', done => {
      const bookmark: Bookmark = {
        id: 1,
        name: 'test1',
        url: 'localhost',
        group: 'Test G1',
        createdAt: 1000000,
        updatedAt: 2000000
      };
      const action = BookmarkActions.updateSuccess({ bookmark });
      actions$ = of(action);
      effects.editDialogRef = { close: () => { } } as MatDialogRef<any>;
      spyOn(effects.editDialogRef, 'close').and.callThrough();
      effects.hideEditDialog$.subscribe(() => {
        expect(effects.editDialogRef.close).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('showRemoveDialog$', () => {
    it('should open dialog', done => {
      const id = 1;
      const action = BookmarkActions.showRemoveDialog({ id });
      actions$ = of(action);
      effects.showRemoveDialog$.subscribe(() => {
        expect(dialog.open).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('hideRemoveDialog$', () => {
    it('should close dialog', done => {
      const id = 1;
      const action = BookmarkActions.removeSuccess({ id });
      actions$ = of(action);
      effects.removeDialogRef = { close: () => { } } as MatDialogRef<any>;
      spyOn(effects.removeDialogRef, 'close').and.callThrough();
      effects.hideRemoveDialog$.subscribe(() => {
        expect(effects.removeDialogRef.close).toHaveBeenCalled();
        done();
      });
    });
  });
});
