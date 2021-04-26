import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/author.actions'
import { AuthorsListItem } from '../models';

export interface AuthorEntity {
  id: string;
  firstName: string;
  lastName: string;
}

export interface AuthorsState extends EntityState<AuthorEntity> {

}

export const adapter = createEntityAdapter<AuthorEntity>();

const initialState = adapter.getInitialState();

const reducerFunction = createReducer(
  initialState,
  on(actions.loadAuthors, () => initialState),
  on(actions.loadAuthorsSucceeded, (s, a) => adapter.setAll(a.payload, s)),
  on(actions.addAuthor, (s, a) => adapter.addOne(a.payload, s)),
  on(actions.addAuthorSucceeded, (s, a) => {
    let tempState: AuthorsState = { ...s };
    if (s.entities[a.oldId]) {
      tempState = adapter.removeOne(a.oldId, tempState);
    }
    if (s.entities[a.payload.id]) {
      tempState = adapter.removeOne(a.payload.id, tempState);
    }
    return adapter.addOne(a.payload, tempState);


  }),
  on(actions.removeAuthor, (s, a) => adapter.removeOne(a.payload.id, s)),
  on(actions.removeAuthorFailed, (s, a) => adapter.addOne(a.payload, s)),
  on(actions.updateAuthorFirstName, (s, a) => adapter.updateOne(a.changes, s))
);

export function reducer(state: AuthorsState = initialState, action: Action): AuthorsState {
  return reducerFunction(state, action);
}



