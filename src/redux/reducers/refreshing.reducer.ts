import { createReducer } from '@reduxjs/toolkit';
import { loadRefreshing } from '../actions';

const initialState = false;

const RefreshingReducer = createReducer(initialState, builder => {
    builder
        .addCase(loadRefreshing, (state, action: any) => {
            return action.payload
        })
});

export { RefreshingReducer };
