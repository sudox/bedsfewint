import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { BookStoreState, selectLinkFor } from "../reducers";
import * as actions from '../actions/book.actions';
import * as bookActions from '../actions/book.actions';
import { map, skipWhile, switchMap } from "rxjs/operators";
import { selectHomeLoaded } from "../reducers";
import { HttpClient } from "@angular/common/http";
import { BookEntity } from "../reducers/books.reducer";
import { BookStoreDataService } from "../services/bookstore-data.service";

@Injectable()
export class BookEffects {



  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadBooks),
      switchMap(action => this.store.select(selectHomeLoaded).pipe(
        skipWhile(loaded => loaded === false),
        map(() => action)
      ).pipe(
        map(a => a.payload.rel),
        switchMap(rel => this.store.select(selectLinkFor, { rel, level: 'home' })
          .pipe(
            skipWhile(href => href === undefined),
            map((href) => href),
            switchMap(href => this.service.getBooks$(href)
              .pipe(
                map(payload => bookActions.loadBooksSucceeded({ payload: { store: payload } }))
              ),

            )
          )
        )
      )
      )
    )

    , { dispatch: true })


  constructor(private actions$: Actions, private service: BookStoreDataService, private store: Store<BookStoreState>, private client: HttpClient) { }


}

