import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkListItemComponent } from './bookmark-list-item.component';

describe('BookmarkListItemComponent', () => {
  let component: BookmarkListItemComponent;
  let fixture: ComponentFixture<BookmarkListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [BookmarkListItemComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(BookmarkListItemComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
