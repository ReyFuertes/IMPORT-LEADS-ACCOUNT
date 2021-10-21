import { createSelector } from '@ngrx/store';
import { sortByDesc } from 'src/app/shared/util/sort';
import { RootState } from '../root.reducer';

export const selectedState = (state: RootState) => state.appState;
export const getUserAccessSelector = createSelector(
  selectedState,
  state => {
    return state?.access?.map(a => {
      const children = state?.access?.filter(c => {
        return c.parent && c?.parent?.id === a.id;
      }) || null;

      return {
        label: a.access_name,
        value: String(a.id),
        parent: a.parent,
        children,
        user_route: a.user_route
      }
    }).sort((a, b) => sortByDesc(a, b, 'position'))
  }
)
