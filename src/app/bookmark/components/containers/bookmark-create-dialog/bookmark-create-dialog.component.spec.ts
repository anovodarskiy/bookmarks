import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { BookmarkFacade } from '../../../store/facades';
import { BookmarkCreateDialogComponent } from './bookmark-create-dialog.component';

describe('BookmarkCreateDialogComponent', () => {
  let component: BookmarkCreateDialogComponent;
  let fixture: ComponentFixture<BookmarkCreateDialogComponent>;
  let service: BookmarkFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [BookmarkCreateDialogComponent],
      providers: [
        {
          provide: BookmarkFacade,
          useValue: jasmine.createSpyObj('BookmarkFacade', ['create'])
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(BookmarkCreateDialogComponent);
    component = fixture.componentInstance;
    service = TestBed.get(BookmarkFacade);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call create', () => {
    component.ngOnInit();
    component.save();
    expect(service.create).toHaveBeenCalled();
  });
});
