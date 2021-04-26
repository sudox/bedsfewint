import { createAction, props } from "@ngrx/store";
import { HomeState } from "../reducers/home.reducer";


export const loadHome = createAction(
  '[book-store home] load home'
);

export const loadHomeSucceeded = createAction(
  '[book-store home] load home succeeded',
  props<{ payload: HomeState }>()
);
