import { NgModule } from '@angular/core';

import { BookmarkComponentsModule } from './components';
import { BookmarkStoreModule } from './store';
import { BookmarkRoutingModule } from './bookmark-routing.module';


@NgModule({
  imports: [BookmarkRoutingModule, BookmarkStoreModule, BookmarkComponentsModule],
})
export class BookmarkModule {}
