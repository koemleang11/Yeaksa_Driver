import {createAction} from '@reduxjs/toolkit';

const requestProfile = createAction('profile/request');
const loadProfileSuccess = createAction<any>('profile/success');
const loadProfileError = createAction<any>('profile/error');

export {
  requestProfile,
  loadProfileSuccess,
  loadProfileError,
};
