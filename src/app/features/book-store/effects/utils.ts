import { createEffect, ofType } from "@ngrx/effects";
import { routerNavigatedAction } from "@ngrx/router-store";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";


export function createDataRouteEffect(actions$: Observable<Action>, urlAfterRedirects: string, action: Action) {
  return createEffect(() =>
    actions$.pipe(
      ofType(routerNavigatedAction),
      filter((a) => a.payload.event.url === urlAfterRedirects),
      map(() => action)
    ), { dispatch: true })
}
