import {createAction} from '@reduxjs/toolkit';
import {
  AuthorizeParams,
  AuthorizeResponse,
} from '../actionTypes/authorize.type';

const loadMore = createAction<any>('loadMore');
const loadLoading = createAction<any>('loading');
const loadRefreshing = createAction<any>('refreshing');
const loadFontSize = createAction<any>('fontSize');
const loadLanguage = createAction<any>('language');
export const internetConnection = createAction<boolean>('internetConnection');
export const spinningLoading = createAction<boolean>('spinningLoading');

const clearAuthorize = createAction<AuthorizeParams>('authorize/clear');
const requestAuthorize = createAction<AuthorizeParams>('authorize/request');
const loadAuthorizeSuccess =
  createAction<AuthorizeResponse>('authorize/success');
const loadAuthorizeError = createAction<AuthorizeResponse>('authorize/error');

export {
  loadLanguage,
  loadRefreshing,
  loadMore,
  loadLoading,
  clearAuthorize,
  loadFontSize,
  requestAuthorize,
  loadAuthorizeSuccess,
  loadAuthorizeError,
};
