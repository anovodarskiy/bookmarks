import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { Bookmark } from '../../../models';
import { BookmarkFacade } from '../../../store/facades';

@Component({
  selector: 'app-bookmark-edit-dialog',
  templateUrl: './bookmark-edit-dialog.component.html',
  styleUrls: ['./bookmark-edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkEditDialogComponent implements OnInit, OnDestroy {
  private readonly onDestroy$ = new EventEmitter();
  loading$: Observable<boolean>;
  bookmark$: Observable<Bookmark>;
  form: FormGroup;
  bookmark: Bookmark;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { bookmark: Bookmark },
    private fb: FormBuilder,
    private bookmarkService: BookmarkFacade
  ) {
    this.loading$ = this.bookmarkService.loading$;
    // this.bookmark$ = this.bookmarkService.bookmark$;
    this.bookmark = this.data.bookmark;
    this.form = this.fb.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
      group: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.form.setValue({
      name: this.bookmark.name,
      group: this.bookmark.group,
      url: this.bookmark.url
    });
  }

  ngOnDestroy() {
    this.onDestroy$.emit();
  }

  save() {
    const name: string = this.form.get('name').value;
    const group: string = this.form.get('group').value;
    const url: string = this.form.get('url').value;
    const bookmark = { ...this.bookmark, name, group, url };
    this.bookmarkService.update(bookmark);
  }
}
