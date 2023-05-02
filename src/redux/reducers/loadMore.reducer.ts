import { createReducer } from '@reduxjs/toolkit';
import { loadMore } from '../actions';

const initialState = false

const LoadMoreReducer = createReducer(initialState, builder => {
    builder
        .addCase(loadMore, (state, action: any) => {
            return action.payload
        })
})

export { LoadMoreReducer }