import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addAuthor } from '../../actions/author.actions';
import { BooksV1State } from '../../reducers';

@Component({
  selector: 'app-author-entry',
  templateUrl: './author-entry.component.html',
  styleUrls: ['./author-entry.component.css']
})
export class AuthorEntryComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store<BooksV1State>) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    })
  }

  get firstName(): AbstractControl { return this.form.get('firstName'); }
  get lastName(): AbstractControl { return this.form.get('lastName'); }
  submit(): void {
    this.store.dispatch(addAuthor(this.form.value));
  }
}
