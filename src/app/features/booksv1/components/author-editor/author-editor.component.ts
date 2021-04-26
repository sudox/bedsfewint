import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { removeAuthor, setAuthorForEditing, updateAuthorFirstName } from '../../actions/author.actions';
import { BooksV1State, selectEditedAuthor } from '../../reducers';
import { AuthorEditEntity } from '../../reducers/author-edit.reducer';
import { AuthorEntity } from '../../reducers/authors.reducer';

@Component({
  selector: 'app-author-editor',
  templateUrl: './author-editor.component.html',
  styleUrls: ['./author-editor.component.css']
})
export class AuthorEditorComponent implements OnInit {

  author$: Observable<AuthorEditEntity>;
  author: AuthorEditEntity;
  constructor(private store: Store<BooksV1State>) { }

  ngOnInit(): void {
    this.author$ = this.store.select(selectEditedAuthor).pipe(
      tap(a => this.author = a)
    );

  }

  setAuthor(id: string): void {
    this.store.dispatch(setAuthorForEditing({ id }));
  }

  delete(): void {
    if (this.author) {
      this.store.dispatch(removeAuthor({ payload: this.author }));
      this.author = null;
    }
  }

  updateFirstName(firstName: string): void {
    if (this.author) {
      this.store.dispatch(updateAuthorFirstName({ author: this.author, firstName }))
    }
  }
}
