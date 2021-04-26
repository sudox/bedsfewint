import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from 'rxjs/operators';
import * as appActions from '../../../actions/app.actions';
import * as authorsActions from '../actions/author.actions';
import * as booksActions from '../actions/books.actions'

@Injectable()
export class AppBooksEffects {

  loadBooksOnApplicationStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => booksActions.loadBooksData())
    )
  )

  loadAuthorsOnApplicationStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => authorsActions.loadAuthors())
    )
  )


  constructor(private actions$: Actions) {

  }
}
