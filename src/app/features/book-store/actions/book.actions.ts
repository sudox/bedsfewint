import { createAction, props } from "@ngrx/store";
import { Link } from "../models";
import { BooksStoreDataActionPayload } from "../types/types-actions";

export const loadBooks = createAction(
  '[book-store books] load books',
  props<{
    payload: {
      rel: string
    }
  }>()
);

export const loadBooksSucceeded = createAction(
  '[book-store books] load books succeeded',
  props<{ payload: { store: BooksStoreDataActionPayload } }>()
);
