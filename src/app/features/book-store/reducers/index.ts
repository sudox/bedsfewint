import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as models from '../models';
import * as fromRouter from "@ngrx/router-store";
import * as fromBooks from './books.reducer';
export const featureName = 'book-store';

import * as fromHome from './home.reducer';
export interface BookStoreState {
  home: fromHome.HomeState,
  router: fromRouter.RouterState,
  books: fromBooks.BookState
}

export const reducers: ActionReducerMap<BookStoreState> = {
  home: fromHome.reducer,
  router: fromRouter.routerReducer,
  books: fromBooks.reducer
}


const selectFeature = createFeatureSelector<BookStoreState>(
  featureName
);

const selectHomeBranch = createSelector(
  selectFeature,
  f => f.home
)

const selectBooksBranch = createSelector(
  selectFeature,
  f => f.books
)



export const selectHomeModel = createSelector(
  selectHomeBranch,
  fromHome.selectHomeModel
)

const selectHomeLinks = createSelector(
  selectHomeBranch,
  b => reduceLinks(b.links)
)

const selectBooksLinks = createSelector(
  selectBooksBranch,
  b => reduceLinks(b.links)
)
export const selectHomeLoaded = createSelector(
  selectHomeBranch,
  b => b.loaded
)

const { selectAll: selectAllBooksArray } = fromBooks.adapter.getSelectors(selectBooksBranch);


export const selectAllLinks = createSelector(
  selectHomeLinks,
  selectBooksLinks,
  (h, b) => ({
    home: h,
    books: b,
    authors: null
  } as LinkCollection)
)
export const selectBookListModel = createSelector(
  selectAllBooksArray,
  selectAllLinks,

  (books, links) => {
    return books.map(book => {
      let authorLink = links?.books["ht:author-details"]?.href;
      if (authorLink) {
        authorLink = authorLink.replace('{id}', book.authorId);
      }
      return {
        isbn: book.isbn,
        title: book.title,
        authorLink
      } as models.BookModel
    })
  }
)

export const selectLinkFor = createSelector(
  selectAllLinks,
  (links: LinkCollection, props: { level: 'home' | 'books' | 'authors', rel: string }) => {
    if (!links) { return null };
    const levelLinks = links[props.level];
    return levelLinks[props.rel];
  }
)

interface Obj {
  [key: string]: any
}

interface LinkCollection {
  home: models.Link[],
  books: models.Link[],
  authors: models.Link[]
}

function reduceLinks(links: models.Link[]) {
  return links.reduce((map: Obj, link) => {
    map[link.rel] = link.href;
    return map;
  }, {})
}
