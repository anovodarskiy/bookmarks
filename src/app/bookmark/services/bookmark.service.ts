import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Bookmark } from '../models';

/**
 * Service
 */
@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  constructor(
    private http: HttpClient,
    @Inject('API_URL') private baseUrl: string
  ) { }

  /**
   * Find all
   * @param offset Offset
   * @param limit Limit
   */
  findAll(offset?: number, limit?: number) {
    const url = `${this.baseUrl}/bookmarks`;
    let params = new HttpParams();
    params = offset ? params.set('offset', `${offset}`) : params;
    params = limit ? params.set('limit', `${limit}`) : params;
    return this.http.get<Bookmark[]>(url, { params });
  }

  /**
   * Find
   * @param id ID
   */
  find(id: number) {
    const url = `${this.baseUrl}/bookmarks/${id}`;
    return this.http.get<Bookmark>(url);
  }

  /**
   * Create
   * @param bookmark Bookmark
   */
  create(bookmark: Partial<Bookmark>) {
    const url = `${this.baseUrl}/bookmarks`;
    return this.http.post<Bookmark>(url, bookmark);
  }

  /**
   * Update
   * @param bookmark Bookmark
   */
  update(bookmark: Partial<Bookmark>) {
    const url = `${this.baseUrl}/bookmarks/${bookmark.id}`;
    return this.http.put<Bookmark>(url, bookmark);
  }

  /**
   * Remove
   * @param id ID
   */
  remove(id: number) {
    const url = `${this.baseUrl}/bookmarks/${id}`;
    return this.http.delete<void>(url);
  }
}
