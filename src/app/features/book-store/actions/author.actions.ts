import { createAction, props } from "@ngrx/store";
import { AuthorEntity } from "../../booksv1/reducers/authors.reducer";
import { Link } from "../models";
import { HalResponse } from "../types/types-hal";

export const loadAuthors = createAction(
  '[book-store authors] load authors',
  props<{
    payload: {
      rel: string
    }
  }>()
);


export const loadAuthorsSucceeded = createAction(
  '[book-store authors] load authors succeeded',
  ({ payload }: { payload: LoadAuthorSuceededPayload }) => ({
    payload: {
      authors: payload._embedded,
      links: payload._links
    }
  })
);


export interface LoadAuthorSuceededPayload {
  _embedded: AuthorEntity[],
  _links: Link[]
}

export interface HalAuthorEmbed extends HalResponse {
  firstName: string;
  lastName: string;
}
