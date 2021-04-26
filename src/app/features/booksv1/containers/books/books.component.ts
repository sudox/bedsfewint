import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BooksV1State, selectBooksLoaded } from '../../reducers';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  booksLoaded$: Observable<boolean>;
  constructor(private store: Store<BooksV1State>) { }

  ngOnInit(): void {
    this.booksLoaded$ = this.store.select(selectBooksLoaded);
  }

}
