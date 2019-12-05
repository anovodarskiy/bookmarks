import {
  Component,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter
} from '@angular/core';

import { Bookmark } from '../../../models';

@Component({
  selector: 'app-bookmark-list-item',
  templateUrl: './bookmark-list-item.component.html',
  styleUrls: ['./bookmark-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkListItemComponent {
  @Input() bookmark: Bookmark;
  @Output() update = new EventEmitter<Bookmark>();
  @Output() remove = new EventEmitter<string>();
}
