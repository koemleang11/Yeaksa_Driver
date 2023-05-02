import { createReducer } from '@reduxjs/toolkit';
import { loadLanguage } from '../actions';

const initialState = {};

const LanguageReducer = createReducer(initialState, builder => {
    builder
        .addCase(loadLanguage, (state, action: any) => {
            return action.payload
        })
});

export { LanguageReducer };
