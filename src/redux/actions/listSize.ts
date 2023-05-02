import {createAction} from '@reduxjs/toolkit';

const requestListSize = createAction('listSize/request');
const loadListSizeSuccess = createAction<any>('listSize/success');
const loadListSizeError = createAction<any>('listSize/error');

export {
  requestListSize,
  loadListSizeSuccess,
  loadListSizeError,
};
