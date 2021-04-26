import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookStoreComponent } from './book-store.component';
import { OverviewComponent } from './components/overview/overview.component';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClientModule } from '@angular/common/http';
import { StoreHomeComponent } from './components/store-home/store-home.component';
import { StoreModule } from '@ngrx/store';
import { featureName, reducers } from './reducers'
import { EffectsModule } from '@ngrx/effects';
import { NavEffects } from './effects/nav.effects';
import { AppEffects } from './effects/app.effects';
import { HomeEffects } from './effects/home.effects';
import { BookEffects } from './effects/book.effects';
import { BooksComponent } from './components/books/books.component';
import { BookStoreDataService } from './services/bookstore-data.service';

const routes: Routes = [
  {
    path: 'book-store',
    component: BookStoreComponent,
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
      },
      {
        path: 'home',
        component: StoreHomeComponent,

      }, {
        path: 'books',
        component: BooksComponent
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  }
]

@NgModule({
  declarations: [
    BookStoreComponent,
    OverviewComponent,
    StoreHomeComponent,
    BooksComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MarkdownModule,
    HttpClientModule,
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature([NavEffects, AppEffects, HomeEffects, BookEffects])
  ],
  providers: [
    BookStoreDataService
  ]
})
export class BookStoreModule { }
