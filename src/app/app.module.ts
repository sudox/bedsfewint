import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { Booksv1Module } from './features/booksv1/booksv1.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HtUtilsModule } from './features/ht-utils/ht-utils.module';
import { BookStoreModule } from './features/book-store/book-store.module';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent
  ],
  imports: [
    HttpClientModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    MarkdownModule.forRoot({ loader: HttpClient }),
    Booksv1Module,
    BrowserModule,
    BookStoreModule,
    AppRoutingModule,
    HtUtilsModule,
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
