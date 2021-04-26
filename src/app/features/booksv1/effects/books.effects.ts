import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BooksDataService } from "../services/books-data.service";
import * as actions from '../actions/books.actions';
import * as authorActions from '../actions/author.actions';
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of, EMPTY } from "rxjs";

@Injectable()
export class BookEffects {


  loadAuthors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authorActions.loadAuthors),
      switchMap(() => this.service.getAllAuthors$()
        .pipe(
          map(payload => authorActions.loadAuthorsSucceeded({ payload }))
        )
      )
    )

  );

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadBooksData),
      switchMap(() => this.service.getAllBooks$().pipe(
        map(payload => actions.loadBooksSucceeded({ payload })),
        catchError((err) => {
          console.log(err);
          return of(actions.loadBooksFailed({ errorPayload: 'Could not load books: ' + err.status }))
        })
      ))
    ), { dispatch: true }
  )


  addAuthor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authorActions.addAuthor),
      switchMap((originalAction) => this.service.addAuthor$(originalAction.payload)
        .pipe(

          map(response => authorActions.addAuthorSucceeded({ payload: response, oldId: originalAction.payload.id }))
        )
      )
    ))

  removeAuthor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authorActions.removeAuthor),
      switchMap(original => this.service.removeAuthor$(original.payload)
        .pipe(
          tap(response => console.log(response)),
          map(() => authorActions.removeAuthorSucceeded({ payload: original.payload })),
          catchError(response => of(authorActions.removeAuthorFailed({ payload: original.payload, errorMessage: 'Could Not Remove' })))
        )
      )
    ), { dispatch: true })

  getAuthor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authorActions.setAuthorForEditing),
      switchMap(a => this.service.getAuthor$(a.id)
        .pipe(
          map(payload => authorActions.setAuthorForEditingSucceeded({ payload })),
          catchError(err => of(authorActions.setAuthorForEdingFailed()))
        )
      )
    )
  )
  updateAuthorFirstName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authorActions.updateAuthorFirstName),
      map(a => ({ author: a.author, firstName: a.changes.changes.firstName })),
      switchMap(c => this.service.updateAuthorFirstName$(c.author, c.firstName))
    ), { dispatch: false }
  )

  constructor(private actions$: Actions, private service: BooksDataService) { }
}
