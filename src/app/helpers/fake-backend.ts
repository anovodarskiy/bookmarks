import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered bookmarks
        let bookmarks: any[] = JSON.parse(localStorage.getItem('bookmarks')) || [];

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
            // get bookmarks
            if (request.url.endsWith('/bookmarks') && request.method === 'GET') {
                return of(new HttpResponse({ status: 200, body: bookmarks }));
            }

            // get bookmark by id
            if (request.url.match(/\/bookmarks\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return bookmark if valid, this security is implemented server side in a real application

                // find bookmark by id in bookmarks array
                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                let matchedBookmarks = bookmarks.filter(bookmark => { return bookmark.id === id; });
                let bookmark = matchedBookmarks.length ? matchedBookmarks[0] : null;

                return of(new HttpResponse({ status: 200, body: bookmark }));
            }

            // create bookmark
            if (request.url.endsWith('/bookmarks') && request.method === 'POST') {
                let newBookmark = Object.assign({}, request.body);
                newBookmark.id = bookmarks.length + 1;
                newBookmark.createdAt = Date.now;
                newBookmark.updatedAt = Date.now;
                bookmarks.push(newBookmark);
                localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                return of(new HttpResponse({ status: 200, body: newBookmark }));
            }

            // delete bookmark
            if (request.url.match(/\/bookmarks\/\d+$/) && request.method === 'DELETE') {
                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                for (let i = 0; i < bookmarks.length; i++) {
                    let bookmark = bookmarks[i];
                    if (bookmark.id === id) {
                        // delete bookmark
                        bookmarks.splice(i, 1);
                        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                        break;
                    }
                }
                return of(new HttpResponse({ status: 200 }));
            }

            if (request.url.match(/\/bookmarks\/\d+$/) && request.method === 'PUT') {
                let urlParts = request.url.split('/');
                let newBookmark = Object.assign({}, request.body);
                let id = parseInt(urlParts[urlParts.length - 1]);
                for (let i = 0; i < bookmarks.length; i++) {
                    let bookmark = bookmarks[i];
                    if (bookmark.id === id) {
                        bookmarks[i] = newBookmark;
                        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                        break;
                    }
                }
                return of(new HttpResponse({ status: 200, body: newBookmark }));
            }

            return next.handle(request);

        }))

            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};