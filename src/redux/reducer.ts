import { createReducer } from '@reduxjs/toolkit';
import { News, Styles } from '../types/types';
import { fetchNews, fetchStyles } from './api-actions';
import { saveStyles, getStyles } from '../services/styles';

const initialState: {
  news: News[];
  isLoading: boolean;
  styles: Styles | null;
} = {
  news: [],
  isLoading: true,
  styles: getStyles()
}

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchNews.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchNews.fulfilled, (state, action) => {
      state.news = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchStyles.fulfilled, (state, action) => {
      /*
      const styles = getStyles();
      if (!styles) {
        saveStyles(action.payload);
      }
      */
      saveStyles(action.payload);
    });
});
