import {createAction} from '@reduxjs/toolkit';

const requestClassification = createAction('classification/request');
const loadClassificationSuccess = createAction<any>('classification/success');
const loadClassificationError = createAction<any>('classification/error');

export {
  requestClassification,
  loadClassificationSuccess,
  loadClassificationError,
};
