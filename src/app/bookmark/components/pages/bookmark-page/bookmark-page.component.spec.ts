import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bookmark } from '../../../models';
import { BookmarkFacade } from '../../../store/facades';
import { BookmarkPageComponent } from './bookmark-page.component';
import { PipesModule } from 'src/app/bookmark/pipes/pipes.module';

describe('BookmarkPageComponent', () => {
  let component: BookmarkPageComponent;
  let fixture: ComponentFixture<BookmarkPageComponent>;
  let service: BookmarkFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PipesModule],
      declarations: [BookmarkPageComponent],
      providers: [
        {
          provide: BookmarkFacade,
          useValue: jasmine.createSpyObj('BookmarkFacade', [
            'loadAll',
            'showCreateDialog',
            'showEditDialog',
            'showRemoveDialog'
          ])
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(BookmarkPageComponent);
    component = fixture.componentInstance;
    service = TestBed.get(BookmarkFacade);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadAll', () => {
    component.ngOnInit();
    expect(service.loadAll).toHaveBeenCalled();
  });

  it('should call showCreateDialog', () => {
    component.showCreateDialog();
    expect(service.showCreateDialog).toHaveBeenCalled();
  });

  it('should call showEditDialog', () => {
    const bookmark: Bookmark = {
      id: 1,
      name: 'test1',
      url: 'localhost',
      group: 'Test G1',
      createdAt: 1000000,
      updatedAt: 2000000
    };
    component.showEditDialog(bookmark);
    expect(service.showEditDialog).toHaveBeenCalled();
  });

  it('should call showRemoveDialog', () => {
    const id = 1;
    component.showRemoveDialog(id);
    expect(service.showRemoveDialog).toHaveBeenCalled();
  });
});
