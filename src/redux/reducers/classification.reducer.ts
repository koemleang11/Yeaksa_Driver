import _ from 'lodash';
import {createReducer} from '@reduxjs/toolkit';
import { loadClassificationError, loadClassificationSuccess, requestClassification } from '../actions/classification';

const initialState = {
  data: null || <any>{},
};

const ClassificationReducer = createReducer(initialState, builder => {
  builder
    .addCase(requestClassification, state => {
      state.data = null;
    })
    .addCase(loadClassificationSuccess, (state, action: any) => {
      state.data = action.payload;
    })
    .addCase(loadClassificationError, (state, action) => {
      state.data = action.payload;
    });
});

export {ClassificationReducer};
