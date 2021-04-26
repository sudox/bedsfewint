import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";
import { environment } from '../../../../environments/environment'
import * as homeActions from '../actions/home.actions';
import { BookStoreDataService } from "../services/bookstore-data.service";
@Injectable()
export class HomeEffects {

  private readonly baseUrl = environment.booksV1ApiUrl + 'store';

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homeActions.loadHome),
      switchMap(() => this.service.getHomeModel$()
        .pipe(
          map(payload => homeActions.loadHomeSucceeded({ payload }))

        ))
    )
  )



  constructor(private actions$: Actions, private service: BookStoreDataService) { }
}
