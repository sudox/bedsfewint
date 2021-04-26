import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BooksEntity } from "src/app/features/booksv1/reducers/books.reducer";

import { environment } from '../../../../environments/environment';
import { AuthorEditEntity } from "../reducers/author-edit.reducer";
import { AuthorEntity } from "../reducers/authors.reducer";
@Injectable()
export class BooksDataService {

  readonly baseUrl = environment.booksV1ApiUrl;
  constructor(private http: HttpClient) { }

  getAllBooks$(): Observable<BooksEntity[]> {
    return this.http.get<GetDataResponse<BooksEntity>>(this.baseUrl + 'v1/books')
      .pipe(
        map(r => r.data)
      )
  }

  getAllAuthors$(): Observable<AuthorEntity[]> {
    return this.http.get<GetDataResponse<AuthorEntity>>(this.baseUrl + 'authors')
      .pipe(
        map(r => r.data)
      )
  }

  addAuthor$(author: AuthorEntity): Observable<AuthorEntity> {
    return this.http.post<AuthorEntity>(this.baseUrl + 'authors', { firstName: author.firstName, lastName: author.lastName })
  }

  removeAuthor$(author: AuthorEntity): Observable<any> {
    return this.http.delete(this.baseUrl + `authors/${author.id}`);
  }

  getAuthor$(id: string): Observable<AuthorEditEntity> {
    return this.http.get<AuthorEntity>(this.baseUrl + 'authors/' + id, { observe: 'response' }).pipe(
      map(r => {
        console.log(r.headers.getAll('ETag'));
        return {
          ...r.body,
          etag: JSON.parse(r.headers.get('ETag'))
        };
      })
    )
  }

  updateAuthorFirstName$(author: AuthorEditEntity, firstName: string) {

    return this.http.put(this.baseUrl + `authors/${author.id}`, { ...author, firstName }, {
      headers: {
        'If-Match': author.etag
      }
    });

  }
}



interface GetDataResponse<T> {
  data: T[]
}
