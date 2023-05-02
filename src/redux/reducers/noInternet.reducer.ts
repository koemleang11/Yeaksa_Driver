import {createReducer} from '@reduxjs/toolkit';
import {internetConnection} from '../actions';

const initialState = false;

const loadNoConnection = createReducer(initialState, builder => {
  builder.addCase(internetConnection, (state, action: any) => {
    return action.payload;
  });
});

export {loadNoConnection};
