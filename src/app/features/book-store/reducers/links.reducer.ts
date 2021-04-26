import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import { loadHomeSucceeded } from '../actions/home.actions'

export interface LinkEntity {
  rel: string,
  href: string;
}

export interface LinksState extends EntityState<LinkEntity> {

}

export const adapter = createEntityAdapter<LinkEntity>({
  selectId: (e) => e.rel
});

const initialState = adapter.getInitialState();

const reducerFunction = createReducer(
  initialState,
  on(loadHomeSucceeded, (s, a) => adapter.upsertMany(a.payload.links, s))
);

export function reducer(state: LinksState
  = initialState, action: Action): LinksState {
  return reducerFunction(state, action);
}



