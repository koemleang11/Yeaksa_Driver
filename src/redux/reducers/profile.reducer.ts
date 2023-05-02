import _ from 'lodash';
import {createReducer} from '@reduxjs/toolkit';
import { loadProfileError, loadProfileSuccess, requestProfile } from '../actions/profile';

const initialState = {
  data: null || <any>{},
};

const ProfileReducer = createReducer(initialState, builder => {
  builder
    .addCase(requestProfile, state => {
      state.data = [];
    })
    .addCase(loadProfileSuccess, (state, action: any) => {
      state.data = action.payload.data;
    })
    .addCase(loadProfileError, (state, action) => {
      state.data = action.payload.data;
    });
});

export {ProfileReducer};
