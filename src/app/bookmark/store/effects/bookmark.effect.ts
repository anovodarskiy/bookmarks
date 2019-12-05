import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, tap, concatMap, switchMap, catchError } from 'rxjs/operators';

import { BookmarkService } from '../../services';
import {
  BookmarkCreateDialogComponent,
  BookmarkDeleteDialogComponent,
  BookmarkEditDialogComponent
} from '../../components';
import * as BookmarkActions from '../actions';

/**
 * Bookmark effects
 */
@Injectable()
export class BookmarkEffects {
  createDialogRef: MatDialogRef<BookmarkCreateDialogComponent>;
  editDialogRef: MatDialogRef<BookmarkEditDialogComponent>;
  removeDialogRef: MatDialogRef<BookmarkDeleteDialogComponent>;

  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
    private bookmarkService: BookmarkService
  ) { }

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarkActions.loadAll),
      switchMap(({ offset, limit }) =>
        this.bookmarkService.findAll(offset, limit).pipe(
          map(result => BookmarkActions.loadAllSuccess({ bookmarks: result })),
          catchError(error => of(BookmarkActions.loadAllFailure({ error })))
        )
      )
    )
  );

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarkActions.load),
      concatMap(({ id }) =>
        this.bookmarkService.find(id).pipe(
          map(result => BookmarkActions.loadSuccess({ bookmark: result })),
          catchError(error => of(BookmarkActions.loadFailure({ error })))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarkActions.create),
      concatMap(({ bookmark }) =>
        this.bookmarkService.create(bookmark).pipe(
          map(result => BookmarkActions.createSuccess({ bookmark: result })),
          catchError(error => of(BookmarkActions.createFailure({ error })))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarkActions.update),
      concatMap(({ bookmark }) =>
        this.bookmarkService.update(bookmark).pipe(
          map(result => BookmarkActions.updateSuccess({ bookmark: result })),
          catchError(error => of(BookmarkActions.updateFailure({ error })))
        )
      )
    )
  );

  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarkActions.remove),
      concatMap(({ id }) =>
        this.bookmarkService.remove(id).pipe(
          map(() => BookmarkActions.removeSuccess({ id })),
          catchError(error => of(BookmarkActions.removeFailure({ error })))
        )
      )
    )
  );

  showCreateDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookmarkActions.showCreateDialog),
        tap(() => {
          this.createDialogRef = this.dialog.open(BookmarkCreateDialogComponent, {
            width: '400px'
          });
        })
      ),
    { dispatch: false }
  );

  hideCreateDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookmarkActions.createSuccess),
        tap(() => {
          this.createDialogRef.close();
        })
      ),
    { dispatch: false }
  );

  showEditDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookmarkActions.showEditDialog),
        tap(({ bookmark }) => {
          this.editDialogRef = this.dialog.open(BookmarkEditDialogComponent, {
            width: '400px',
            data: { bookmark }
          });
        })
      ),
    { dispatch: false }
  );

  hideEditDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookmarkActions.updateSuccess),
        tap(() => {
          this.editDialogRef.close();
        })
      ),
    { dispatch: false }
  );

  showRemoveDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookmarkActions.showRemoveDialog),
        tap(({ id }) => {
          this.removeDialogRef = this.dialog.open(BookmarkDeleteDialogComponent, {
            data: { id }
          });
        })
      ),
    { dispatch: false }
  );

  hideRemoveDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookmarkActions.removeSuccess),
        tap(() => {
          this.removeDialogRef.close();
        })
      ),
    { dispatch: false }
  );
}
