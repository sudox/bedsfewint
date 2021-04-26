import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { removeAuthor } from '../../actions/author.actions';
import { AuthorsListItem } from '../../models';
import { BooksV1State, selectAuthorsListModel } from '../../reducers';
import { AuthorEntity } from '../../reducers/authors.reducer';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  authors$: Observable<AuthorsListItem[]>;
  constructor(private store: Store<BooksV1State>) { }

  ngOnInit(): void {
    this.authors$ = this.store.select(selectAuthorsListModel);
  }

  remove(author: AuthorEntity): void {
    this.store.dispatch(removeAuthor({ payload: author }))
  }
}
