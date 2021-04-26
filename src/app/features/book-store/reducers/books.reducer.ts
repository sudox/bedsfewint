import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import { Link } from '../models';
import * as actions from '../actions/book.actions';
import { HypermediaEntity } from '../types/types-store';

export interface BookEntity extends HypermediaEntity {
  id: string;
  isbn: string;
  title: string;
  authorId: string;
}

export interface BookState extends EntityState<BookEntity> {
  links: Link[]
}

export const adapter = createEntityAdapter<BookEntity>({

});

const initialState = adapter.getInitialState({
  links: []
});

const reducerFunction = createReducer(
  initialState,
  on(actions.loadBooksSucceeded, (s, a) => adapter.setAll(a.payload.store.data, { ...s, links: a.payload.store.links }))
);

export function reducer(state: BookState = initialState, action: Action): BookState {
  return reducerFunction(state, action);
}



