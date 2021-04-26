import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromBooks from './books.reducer';
import * as fromUiHints from './ui-hints.reducer';
import * as fromAuthors from './authors.reducer';
import * as fromAuthorEditor from './author-edit.reducer';
export const featureName = 'books-v1';
import { AuthorsListItem, BookListItem } from "../models";
export interface BooksV1State {
  books: fromBooks.BooksState,
  uiHints: fromUiHints.UiHintsState,
  authors: fromAuthors.AuthorsState,
  authorEditor: fromAuthorEditor.AuthorEditorState
}

export const reducers: ActionReducerMap<BooksV1State> = {
  books: fromBooks.reducer,
  uiHints: fromUiHints.reducer,
  authors: fromAuthors.reducer,
  authorEditor: fromAuthorEditor.reducer
}

const selectFeature = createFeatureSelector<BooksV1State>(featureName);


const selectAuthorEditorBranch = createSelector(
  selectFeature,
  f => f.authorEditor
)
const selectBooksBranch = createSelector(
  selectFeature,
  f => f.books
);

const selectAuthorsBranch = createSelector(
  selectFeature,
  f => f.authors
)

const selectUiHintsBranch = createSelector(
  selectFeature,
  f => f.uiHints
)

export const selectBooksLoaded = createSelector(
  selectUiHintsBranch,
  b => b.booksLoaded
)

export const selectEditedAuthor = createSelector(
  selectAuthorEditorBranch,
  b => b.author
)

const { selectAll: selectBooksEntityArray } = fromBooks.adapter.getSelectors(selectBooksBranch);
const { selectAll: selectAuthorsEntityArray } = fromAuthors.adapter.getSelectors(selectAuthorsBranch);

export const selectAuthorFilter = createSelector(
  selectBooksBranch,
  b => b.authorFilter
)
export const selectBookListModel = createSelector(
  selectBooksEntityArray,
  selectAuthorFilter,
  (books, author) => {
    let response = books as BookListItem[];
    if (author) {
      return response.filter(b => b.author === author);
    } else {
      return response;
    }
  })


export const selectAuthorsListModel = createSelector(
  selectAuthorsEntityArray,
  b => b as AuthorsListItem[]
)
