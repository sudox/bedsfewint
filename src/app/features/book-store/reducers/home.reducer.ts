import { Action, createReducer, createSelector, on } from "@ngrx/store"
import * as models from '../models';
import * as actions from '../actions/home.actions';
export interface HomeState {
  numberOfBooks: number;
  numberOfAuthors: number;
  links: models.Link[],
  loaded: boolean
}

const initialState: HomeState = {
  numberOfBooks: 0,
  numberOfAuthors: 0,
  links: [],
  loaded: false
}


const reducerFunction = createReducer(
  initialState,
  on(actions.loadHomeSucceeded, (s, a) => a.payload)
)

export function reducer(state: HomeState, action: Action): HomeState {
  return reducerFunction(state, action);
}

export const selectHomeModel = (state: HomeState) => {
  return {
    numberOfAuthors: state.numberOfAuthors,
    numberOfBooks: state.numberOfBooks,
    loaded: state.loaded
  } as models.HomeModel
}




