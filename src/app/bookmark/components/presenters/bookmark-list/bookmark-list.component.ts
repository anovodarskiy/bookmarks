import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkListComponent {
  @Input() loading: boolean;
  @Input() title: string;
}
