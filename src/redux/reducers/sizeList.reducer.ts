import _ from 'lodash';
import {createReducer} from '@reduxjs/toolkit';
import { loadListSizeError, loadListSizeSuccess, requestListSize } from '../actions/listSize';

const initialState = {
  data: null || <any>{},
};

const SizeListReducer = createReducer(initialState, builder => {
  builder
    .addCase(requestListSize, state => {
      state.data = [];
    })
    .addCase(loadListSizeSuccess, (state, action: any) => {
      state.data = action.payload.data;
    })
    .addCase(loadListSizeError, (state, action) => {
      state.data = action.payload.data;
    });
});

export {SizeListReducer};
