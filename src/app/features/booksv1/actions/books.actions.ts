import { createAction, props } from "@ngrx/store";
import { BooksEntity } from "../reducers/books.reducer";




// Loading Books
export const loadBooksData = createAction(
  '[booksv1] load books data'
);

export const loadBooksFailed = createAction(
  '[booksv1] load books failed',
  props<{ errorPayload: string }>()
);

export const loadBooksSucceeded = createAction(
  '[booksv1] load books succeeded',
  props<{ payload: BooksEntity[] }>()
);

// filtering the list

export const filterListByAuthor = createAction(
  '[booksv1] filter list by author',
  props<{ payload: string }>()
);

export const clearFilterList = createAction(
  '[booksv1] clear filter list'
);
