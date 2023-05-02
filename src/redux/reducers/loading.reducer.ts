import { createReducer } from '@reduxjs/toolkit';
import { loadLoading } from '../actions';

const initialState = false;

const LoadingReducer = createReducer(initialState, builder => {
    builder
        .addCase(loadLoading, (state, action: any) => {
            return action.payload
        })
});

export { LoadingReducer };
