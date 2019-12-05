import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { Bookmark } from '../../../models';
import { BookmarkFacade } from '../../../store/facades';

@Component({
  selector: 'app-bookmark-create-dialog',
  templateUrl: './bookmark-create-dialog.component.html',
  styleUrls: ['./bookmark-create-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkCreateDialogComponent implements OnInit {
  loading$: Observable<boolean>;
  form: FormGroup;

  constructor(private fb: FormBuilder, private bookmarkService: BookmarkFacade) {}

  ngOnInit() {
    this.loading$ = this.bookmarkService.loading$;
    this.form = this.fb.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
      group: ['', Validators.required]
    });
  }

  save() {
    const name: string = this.form.get('name').value;
    const url: string = this.form.get('url').value;
    const group: string = this.form.get('group').value;
    const bookmark: Partial<Bookmark> = {
      name,
      url,
      group
    };
    this.bookmarkService.create(bookmark);
  }
}
