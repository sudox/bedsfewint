import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { clearFilterList, filterListByAuthor } from '../../actions/books.actions';
import { BookListItem } from '../../models';
import { BooksV1State, selectAuthorFilter, selectBookListModel } from '../../reducers';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  books$: Observable<BookListItem[]>;
  authorFilter$: Observable<string>;
  constructor(private store: Store<BooksV1State>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.books$ = this.store.select(selectBookListModel);
    this.authorFilter$ = this.store.select(selectAuthorFilter);
    this.subs.push(this.route.queryParams.pipe(
      map(params => {
        if (params.author) {
          this.store.dispatch(filterListByAuthor({ payload: params.author }));
        } else {
          this.store.dispatch(clearFilterList())
        }
      })
    ).subscribe());
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

}
