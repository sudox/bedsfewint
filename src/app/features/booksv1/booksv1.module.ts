import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Booksv1Component } from './booksv1.component';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';
import { MarkdownModule } from 'ngx-markdown';
import { NavComponent } from './components/nav/nav.component';
import { BooksComponent } from './containers/books/books.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { StoreModule } from '@ngrx/store';
import { featureName, reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppBooksEffects } from './effects/app-books.effects';
import { BooksDataService } from './services/books-data.service';
import { BookEffects } from './effects/books.effects';
import { AuthorEntryComponent } from './components/author-entry/author-entry.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { AuthorEditorComponent } from './components/author-editor/author-editor.component';

const routes: Routes = [
  {
    path: 'books-v1',
    component: Booksv1Component,
    children: [

      {
        path: 'books',
        component: BooksComponent,
        children: [

          {
            path: 'list',
            component: BooksListComponent
          },
          {
            path: 'author-entry',
            component: AuthorEntryComponent
          },
          {
            path: 'author-editor',
            component: AuthorEditorComponent
          },
          {
            path: '**',
            component: OverviewComponent
          },

        ],

      },

    ]
  }
]

@NgModule({
  declarations: [
    Booksv1Component,
    OverviewComponent,
    NavComponent,
    BooksComponent,
    BooksListComponent,
    AuthorEntryComponent,
    AuthorListComponent,
    AuthorEditorComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MarkdownModule.forChild(),
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature([AppBooksEffects, BookEffects]),
    ReactiveFormsModule
  ],
  providers: [
    BooksDataService
  ]
})
export class Booksv1Module { }
