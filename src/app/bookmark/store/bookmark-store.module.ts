import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BookmarkComponentsModule } from '../components';
import { featureName } from './states';
import { reducer } from './reducers';
import { BookmarkEffects } from './effects';

@NgModule({
  imports: [
    StoreModule.forFeature(featureName, reducer),
    EffectsModule.forFeature([BookmarkEffects]),
    BookmarkComponentsModule
  ]
})
export class BookmarkStoreModule { }
