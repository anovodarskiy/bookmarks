import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Bookmark } from '../../../models';
import { BookmarkFacade } from '../../../store/facades';

@Component({
  selector: 'app-bookmark-page',
  templateUrl: './bookmark-page.component.html',
  styleUrls: ['./bookmark-page.component.scss']
})
export class BookmarkPageComponent implements OnInit {
  title = 'learn-ngrx';
  loading$: Observable<boolean>;
  bookmarks$: Observable<Bookmark[]>;

  /**
   * Constructor
   */
  constructor(private bookmarkService: BookmarkFacade) { }

  /**
   * Initialize
   */
  ngOnInit() {
    this.loading$ = this.bookmarkService.loading$;
    this.bookmarks$ = this.bookmarkService.bookmarks$;
    this.bookmarkService.loadAll();
  }

  /**
   * Show create dialog
   */
  showCreateDialog() {
    this.bookmarkService.showCreateDialog();
  }

  /**
   * Show edit dialog
   */
  showEditDialog(bookmark: Bookmark) {
    this.bookmarkService.showEditDialog(bookmark);
  }

  /**
   * Show remove dialog
   */
  showRemoveDialog(id: number) {
    this.bookmarkService.showRemoveDialog(id);
  }
}
