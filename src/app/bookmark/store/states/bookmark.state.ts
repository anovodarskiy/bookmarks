import { EntityState, createEntityAdapter } from '@ngrx/entity';

import { Bookmark } from '../../models';

/**
 * Feature name
 */
export const featureName = 'bookmark';

/**
 * State
 */
export interface State extends EntityState<Bookmark> {
  loading: boolean;
  selectedId?: number;
  error?: any;
}

/**
 * Adapter
 */
export const adapter = createEntityAdapter<Bookmark>();

/**
 * Initial state
 */
export const initialState: State = adapter.getInitialState({
  loading: false
});
