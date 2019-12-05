import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { BookmarkFacade } from '../../../store/facades';

@Component({
  selector: 'app-bookmark-delete-dialog',
  templateUrl: './bookmark-delete-dialog.component.html',
  styleUrls: ['./bookmark-delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkDeleteDialogComponent {
  loading$: Observable<boolean>;
  id: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { id: number },
    private bookmarkService: BookmarkFacade
  ) {
    this.loading$ = this.bookmarkService.loading$;
    this.id = this.data.id;
  }

  remove() {
    this.bookmarkService.remove(this.id);
  }
}
