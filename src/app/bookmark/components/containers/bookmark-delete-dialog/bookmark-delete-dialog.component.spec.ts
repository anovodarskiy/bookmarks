import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BookmarkFacade } from '../../../store/facades';
import { BookmarkDeleteDialogComponent } from './bookmark-delete-dialog.component';

describe('BookmarkDeleteDialogComponent', () => {
  let service: BookmarkFacade;
  let component: BookmarkDeleteDialogComponent;
  let fixture: ComponentFixture<BookmarkDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { id: '1' } },
        {
          provide: BookmarkFacade,
          useValue: jasmine.createSpyObj('BookmarkFacade', ['remove'])
        }
      ],
      declarations: [BookmarkDeleteDialogComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(BookmarkDeleteDialogComponent);
    component = fixture.componentInstance;
    service = TestBed.get(BookmarkFacade);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call update', () => {
    component.remove();
    expect(service.remove).toHaveBeenCalled();
  });
});
