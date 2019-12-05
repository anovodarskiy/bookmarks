import { createAction, props } from '@ngrx/store';

import { Bookmark } from '../../models';

export const loadAll = createAction(
  '[Bookmark Page] Load All',
  props<{ offset?: number; limit?: number }>()
);

export const loadAllSuccess = createAction(
  '[Bookmark API] Load All Success',
  props<{ bookmarks: Bookmark[] }>()
);

export const loadAllFailure = createAction(
  '[Bookmark API] Load All Failure',
  props<{ error: any }>()
);

export const load = createAction('[Bookmark Page] Load', props<{ id: number }>());

export const loadSuccess = createAction(
  '[Bookmark API] Load Success',
  props<{ bookmark: Bookmark }>()
);

export const loadFailure = createAction(
  '[Bookmark API] Load Failure',
  props<{ error: any }>()
);

export const create = createAction(
  '[Bookmark Page] Create',
  props<{ bookmark: Partial<Bookmark> }>()
);

export const createSuccess = createAction(
  '[Bookmark API] Create Success',
  props<{ bookmark: Bookmark }>()
);

export const createFailure = createAction(
  '[Bookmark API] Create Failure',
  props<{ error: any }>()
);

export const update = createAction(
  '[Bookmark Page] Update',
  props<{ bookmark: Bookmark }>()
);

export const updateSuccess = createAction(
  '[Bookmark API] Update Success',
  props<{ bookmark: Bookmark }>()
);

export const updateFailure = createAction(
  '[Bookmark API] Update Failure',
  props<{ error: any }>()
);

export const remove = createAction(
  '[Bookmark Page] Remove',
  props<{ id: number }>()
);

export const removeSuccess = createAction(
  '[Bookmark API] Remove Success',
  props<{ id: number }>()
);

export const removeFailure = createAction(
  '[Bookmark API] Remove Failure',
  props<{ error: any }>()
);

export const showCreateDialog = createAction('[Bookmark Page] Show Create Dialog');

export const showEditDialog = createAction(
  '[Bookmark Page] Show Edit Dialog',
  props<{ bookmark: Bookmark }>()
);

export const showRemoveDialog = createAction(
  '[Bookmark Page] Show Remove Dialog',
  props<{ id: number }>()
);
