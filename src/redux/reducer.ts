import { createReducer } from '@reduxjs/toolkit';
import { getStyles, setStyles } from '../services/styles';
import { News, Styles } from '../types/types';
import { fetchNews, fetchStyles } from './api-actions';

const initialState: {
  news: News[];
  isLoading: boolean;
  styles: Styles[];
  currentStyles: Styles | null;
} = {
  news: [],
  isLoading: true,
  styles: [],
  currentStyles: getStyles(),
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
    .addCase(fetchStyles.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchStyles.fulfilled, (state, action) => {
      if (!state.currentStyles) {
        state.currentStyles = action.payload[0];
        setStyles(action.payload[0]);
      } else {
        state.currentStyles = getStyles();
      }
      state.styles = action.payload;
      state.isLoading = false;
    });
});
