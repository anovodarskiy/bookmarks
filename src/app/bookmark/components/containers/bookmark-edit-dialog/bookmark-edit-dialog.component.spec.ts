import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Bookmark } from '../../../models';
import { BookmarkFacade } from '../../../store/facades';
import { BookmarkEditDialogComponent } from './bookmark-edit-dialog.component';

describe('BookmarkEditDialogComponent', () => {
  let service: BookmarkFacade;
  let component: BookmarkEditDialogComponent;
  let fixture: ComponentFixture<BookmarkEditDialogComponent>;

  beforeEach(async(() => {
    const bookmark: Bookmark = {
      id: 1,
      name: 'test1',
      url: 'localhost',
      group: 'Test G1',
      createdAt: 1000000,
      updatedAt: 2000000
    };
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [BookmarkEditDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { bookmark } },
        {
          provide: BookmarkFacade,
          useValue: jasmine.createSpyObj('BookmarkFacade', ['update'])
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(BookmarkEditDialogComponent);
    component = fixture.componentInstance;
    service = TestBed.get(BookmarkFacade);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call update', () => {
    component.ngOnInit();
    component.save();
    expect(service.update).toHaveBeenCalled();
  });
});
