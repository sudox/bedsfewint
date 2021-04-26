import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/books.actions';
export interface BooksEntity {
  isbn: string;
  title: string;
  author: string;
}

export interface BooksState extends EntityState<BooksEntity> {
  authorFilter: string
}

export const adapter = createEntityAdapter<BooksEntity>({
  selectId: (model) => model.isbn
});

const initialState = adapter.getInitialState({
  authorFilter: null
});

const reducerFunction = createReducer(
  initialState,
  on(actions.loadBooksSucceeded, (state, action) => adapter.setAll(action.payload, state)),
  on(actions.filterListByAuthor, (state, action) => ({ ...state, authorFilter: action.payload })),
  on(actions.clearFilterList, (state, action) => ({ ...state, authorFilter: null }))
);

export function reducer(state: BooksState = initialState, action: Action): BooksState {
  return reducerFunction(state, action);
}



