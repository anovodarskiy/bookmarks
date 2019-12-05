import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { Bookmark } from '../models';
import { BookmarkService } from './bookmark.service';

describe('BookmarkService', () => {
  let service: BookmarkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: 'API_URL', useValue: '' }]
    });
    service = TestBed.get(BookmarkService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should successfully mock find all request', () => {
    const response: Bookmark[] = [
      {
        id: 1,
        name: 'test1',
        url: 'localhost',
        group: 'Test G1',
        createdAt: 1000000,
        updatedAt: 2000000
      },
      {
        id: 2,
        name: 'test2',
        url: 'localhost',
        group: 'Test G2',
        createdAt: 1000000,
        updatedAt: 2000000
      },
      {
        id: 3,
        name: 'test3',
        url: 'localhost',
        group: 'Test G3',
        createdAt: 1000000,
        updatedAt: 2000000
      }
    ];
    service.findAll().subscribe(data => {
      expect(data).toBe(response);
    });
    const req = httpMock.expectOne(`/bookmarks`);
    expect(req.request.method).toEqual('GET');
    req.flush(response);
  });

  it('should successfully mock find all request with arguments', () => {
    const response: Bookmark[] = [
      {
        id: 1,
        name: 'test1',
        url: 'localhost',
        group: 'Test G1',
        createdAt: 1000000,
        updatedAt: 2000000
      },
      {
        id: 2,
        name: 'test2',
        url: 'localhost',
        group: 'Test G2',
        createdAt: 1000000,
        updatedAt: 2000000
      },
      {
        id: 3,
        name: 'test3',
        url: 'localhost',
        group: 'Test G3',
        createdAt: 1000000,
        updatedAt: 2000000
      }
    ];
    const offset = 1;
    const limit = 100;
    service.findAll(offset, limit).subscribe(data => {
      expect(data).toBe(response);
    });
    const req = httpMock.expectOne(`/bookmarks?offset=${offset}&limit=${limit}`);
    expect(req.request.method).toEqual('GET');
    req.flush(response);
  });

  it('should successfully mock find request', () => {
    const bookmark: Bookmark = {
      id: 1,
      name: 'test1',
      url: 'localhost',
      group: 'Test G1',
      createdAt: 1000000,
      updatedAt: 2000000
    };
    service.find(bookmark.id).subscribe(data => {
      expect(data).toBe(bookmark);
    });
    const req = httpMock.expectOne(`/bookmarks/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(bookmark);
  });

  it('should successfully mock create request', () => {
    const bookmark1: Partial<Bookmark> = {
      name: 'test1'
    };
    const bookmark2: Bookmark = {
      id: 1,
      name: 'test1',
      url: 'localhost',
      group: 'Test G1',
      createdAt: 1000000,
      updatedAt: 2000000
    };
    service.create(bookmark1).subscribe(data => {
      expect(data).toEqual(bookmark2);
    });
    const req = httpMock.expectOne(`/bookmarks`);
    expect(req.request.method).toEqual('POST');
    req.flush(bookmark2);
  });

  it('should successfully mock update request', () => {
    const bookmark: Bookmark = {
      id: 1,
      name: 'test1',
      url: 'localhost',
      group: 'Test G1',
      createdAt: 1000000,
      updatedAt: 2000000
    };
    service.update(bookmark).subscribe(data => {
      expect(data).toEqual(bookmark);
    });
    const req = httpMock.expectOne(`/bookmarks/1`);
    expect(req.request.method).toEqual('PUT');
    req.flush(bookmark);
  });

  it('should successfully mock remove request', () => {
    const bookmark: Bookmark = {
      id: 1,
      name: 'test1',
      url: 'localhost',
      group: 'Test G1',
      createdAt: 1000000,
      updatedAt: 2000000
    };
    service.remove(bookmark.id).subscribe(data => {
      expect(data).toEqual(null);
    });
    const req = httpMock.expectOne(`/bookmarks/1`);
    expect(req.request.method).toEqual('DELETE');
  });
});
