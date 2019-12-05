import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../material';
import {
  BookmarkCreateDialogComponent,
  BookmarkDeleteDialogComponent,
  BookmarkEditDialogComponent
} from './containers';
import { BookmarkPageComponent } from './pages';
import { BookmarkListComponent, BookmarkListItemComponent } from './presenters';
import { PipesModule } from '../pipes/pipes.module';

/**
 * Components
 */
const dialogs = [
  BookmarkCreateDialogComponent,
  BookmarkDeleteDialogComponent,
  BookmarkEditDialogComponent
];
const pages = [BookmarkPageComponent];
const presenters = [BookmarkListComponent, BookmarkListItemComponent];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, PipesModule],
  exports: [...dialogs, ...pages, ...presenters],
  entryComponents: [...dialogs],
  declarations: [...dialogs, ...pages, ...presenters]
})
export class BookmarkComponentsModule { }
