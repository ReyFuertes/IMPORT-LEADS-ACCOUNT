import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on, Action } from "@ngrx/store";
import { ISubscription } from "src/app/models/generic.model";
import { addSubscriptionSuccessAction, deleteSubscriptionSuccessAction, getSubscriptionByIdSuccessAction, getSubscriptionsSuccessAction, updateSubscriptionSuccessAction } from "../actions/subscription.action";

export interface SubscriptionsState extends EntityState<ISubscription> {
  selectedSubscription: ISubscription
}
export const adapter: EntityAdapter<ISubscription> = createEntityAdapter<ISubscription>({});
export const initialState: SubscriptionsState = adapter.getInitialState({
  selectedSubscription: null
});
const subscriptionReducer = createReducer(
  initialState,
  on(deleteSubscriptionSuccessAction, (state, action) => {
    return adapter.removeOne(action?.response?.id, state)
  }),
  on(updateSubscriptionSuccessAction, (state, action) => {
    return adapter.updateOne({ id: action.response.id, changes: action.response }, state);
  }),
  on(addSubscriptionSuccessAction, (state, action) => {
    return adapter.addOne(action.response, state)
  }),
  on(getSubscriptionByIdSuccessAction, (state, action) => {
    return Object.assign({}, state, { selectedSubscription: action?.response });
  }),
  on(getSubscriptionsSuccessAction, (state, action) => {
    return ({ ...adapter.setAll(action.response, state) })
  }),
);
export function SubscriptionReducer(state: SubscriptionsState, action: Action) {
  return subscriptionReducer(state, action);
}