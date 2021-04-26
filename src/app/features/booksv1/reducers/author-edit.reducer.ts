import { Action, createReducer, on } from "@ngrx/store";
import { AuthorEntity } from "./authors.reducer";
import * as actions from '../actions/author.actions';

export interface AuthorEditEntity extends AuthorEntity {
  etag: string;
}
export interface AuthorEditorState {
  author: AuthorEditEntity
}


const myReducer = createReducer(
  { author: null },
  on(actions.setAuthorForEditingSucceeded, (s, a) => ({ ...s, author: a.payload })),
  on(actions.setAuthorForEdingFailed, (a, s) => ({ ...s, author: null })),
  on(actions.updateAuthorFirstName, (s, a) => {
    return {
      author: {
        ...s.author,
        firstName: a.changes.changes.firstName
      }
    }
  })
)

export function reducer(state: AuthorEditorState, action: Action): AuthorEditorState {
  return myReducer(state, action);
}
