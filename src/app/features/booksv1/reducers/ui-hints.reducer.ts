import { createReducer, on } from "@ngrx/store"
import * as fromBooks from '../actions/books.actions';

export interface UiHintsState {
  booksLoaded: boolean
}

const initialState: UiHintsState = {
  booksLoaded: false
}

const reducerFunction = createReducer(
  initialState,
  on(fromBooks.loadBooksData, fromBooks.loadBooksFailed, (s, a) => ({ ...s, booksLoaded: false })),
  on(fromBooks.loadBooksSucceeded, (s, a) => ({ ...s, booksLoaded: true }))
)

export function reducer(state, action) {
  return reducerFunction(state, action);
}
