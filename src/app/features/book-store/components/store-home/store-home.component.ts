import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HomeModel, Link } from '../../models';
import { BookStoreState, selectAllLinks, selectHomeLoaded, selectHomeModel, selectLinkFor } from '../../reducers';

@Component({
  selector: 'app-store-home',
  templateUrl: './store-home.component.html',
  styleUrls: ['./store-home.component.css']
})
export class StoreHomeComponent implements OnInit {

  links$: Observable<any>;
  linksb$: Observable<any>;
  loaded$: Observable<boolean>;
  model$: Observable<HomeModel>;
  constructor(private store: Store<BookStoreState>) { }

  ngOnInit(): void {
    this.model$ = this.store.select(selectHomeModel);
    this.loaded$ = this.store.select(selectHomeLoaded);
    this.linksb$ = this.store.select(selectAllLinks);
    this.links$ = this.store.select(selectLinkFor, { level: 'home', rel: 'ht:books' })
  }

}
