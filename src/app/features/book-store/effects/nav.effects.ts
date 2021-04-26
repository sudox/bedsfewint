import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as bookActions from '../actions/book.actions';
import * as authorActions from '../actions/author.actions';
import { BookStoreState } from '../reducers';
import { createDataRouteEffect } from './utils'

@Injectable()
export class NavEffects {



  loadBooks$ = createDataRouteEffect(this.actions$, '/book-store/books', bookActions.loadBooks({ payload: { rel: 'ht:books' } }));
  //  loadAuthors$ = createDataRouteEffect(this.actions$, '/book-store/authors', authorActions.loadAuthors({ payload: { rel: 'ht:authors' } }));


  constructor(private actions$: Actions, private store: Store<BookStoreState>) { }


}
