import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators'
import { Observable } from "rxjs";
import { environment } from '../../../../environments/environment'
import { HomeState } from "../reducers/home.reducer";
import * as models from '../models';
import { BookEntity } from "../reducers/books.reducer";
import { LoadAuthorSuceededPayload } from "../actions/author.actions";
import { BooksStoreDataActionPayload } from "../types/types-actions";
import { HalResponse, HalResponseWithTypedEmbed } from "../types/types-hal";
@Injectable()
export class BookStoreDataService {

  private readonly baseUrl = environment.booksV1ApiUrl + 'store';




  getBooks$(href: string): Observable<BooksStoreDataActionPayload> {
    return this.httpClient.get<GetHalBooksResponse>(href)
      .pipe(
        map(response => {
          return {
            data: response._embedded.map(book => {
              return {
                isbn: book.isbn,
                title: book.title,
                links: book._links,
                id: book._links.find(link => link.rel === 'self')?.href,
                authorId: book._embedded[0]?._links.find(link => link.rel === 'self')?.href
              } as BookEntity
            }),
            links: response._links
          } as BooksStoreDataActionPayload
        })
      )
  }

  getHomeModel$(): Observable<HomeState> {
    return this.httpClient.get<GetHalHomeResponse>(this.baseUrl)
      .pipe(
        map(r => ({
          numberOfAuthors: r.numberOfAuthors,
          numberOfBooks: r.numberOfBooks,
          links: r._links,
          loaded: true
        } as HomeState)
        )
      )
  };
  constructor(private httpClient: HttpClient) { }
}

interface GetHalHomeResponse extends HalResponse {
  numberOfAuthors: number;
  numberOfBooks: number;
  loaded: boolean;
}


interface GetHalBooksResponse extends HalResponseWithTypedEmbed<GetHalBookDetailsResponse> { }

interface GetHalBookDetailsResponse extends HalResponseWithTypedEmbed<GetHalAuthorDetailsResponse> {
  isbn: string;
  title: string;
}

interface GetHalAuthorDetailsResponse extends HalResponse {
  firstName: string;
  lastName: string;
}
