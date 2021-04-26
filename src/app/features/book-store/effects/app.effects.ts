import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as appActions from '../../../actions/app.actions';
import * as homeActions from '../actions/home.actions';
import { map } from "rxjs/operators";
@Injectable()
export class AppEffects {
  /*
    I'm only doing this because the hypermedia was added as an afterhought. This sort of thing could / should be done in the root of the application
  */

  loadHome$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => homeActions.loadHome())
    )
  )

  constructor(private actions$: Actions) { }
}
