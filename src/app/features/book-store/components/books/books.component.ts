import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BookModel } from '../../models';
import { BookStoreState, selectBookListModel } from '../../reducers';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books$: Observable<BookModel[]>;
  constructor(private store: Store<BookStoreState>) { }

  ngOnInit(): void {
    this.books$ = this.store.select(selectBookListModel)
  }

}
