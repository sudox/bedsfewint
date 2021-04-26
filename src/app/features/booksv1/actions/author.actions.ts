import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { AuthorEditEntity } from "../reducers/author-edit.reducer";
import { AuthorEntity } from "../reducers/authors.reducer";

export const loadAuthors = createAction(
  '[booksv1] load authors'
);

export const loadAuthorsSucceeded = createAction(
  '[booksv1] load authors succeeded',
  props<{ payload: AuthorEntity[] }>()
);

let authorTempId = 1;
export const addAuthor = createAction(
  '[booksv1] add author',
  ({ firstName, lastName }: { firstName: string, lastName: string }) => ({
    payload: {
      firstName, lastName,
      id: 'TEMP-' + authorTempId++
    } as AuthorEntity
  })
);


export const addAuthorSucceeded = createAction(
  '[booksv1] add author succeeded',
  props<{ payload: AuthorEntity, oldId: string }>()
);

export const removeAuthor = createAction(
  '[booksv1] remove author',
  props<{ payload: AuthorEntity }>()
);

export const removeAuthorFailed = createAction(
  '[booksv1] remove author failed',
  props<{ payload: AuthorEntity, errorMessage: string }>()
);

export const removeAuthorSucceeded = createAction(
  '[booksv1] remove author succeeded',
  props<{ payload: AuthorEntity }>()
);


export const setAuthorForEditing = createAction(
  '[booksv1] set selected author',
  props<{ id: string }>()
)

export const setAuthorForEditingSucceeded = createAction(
  '[booksv1] set author for editing succeeded',
  props<{ payload: AuthorEntity }>()
);

export const setAuthorForEdingFailed = createAction(
  '[booksv1] set author for editing failed',
);


export const updateAuthorFirstName = createAction(
  '[booksv1] update author first name',
  ({ author, firstName }: { author: AuthorEditEntity, firstName: string }) => ({
    author,
    changes: {
      id: author.id,
      changes: {
        firstName
      }
    } as Update<AuthorEditEntity>
  })
);
