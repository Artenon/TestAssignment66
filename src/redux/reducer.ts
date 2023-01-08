import { createReducer, createAction } from '@reduxjs/toolkit';
import { getStyles, setStyles } from '../services/styles';
import { News, Styles } from '../types/types';
import { fetchNews, fetchStyles, fetchMoreNews } from './api-actions';

const initialState: {
  news: News[];
  isLoading: boolean;
  styles: Styles[];
  currentStyles: Styles | null;
  isNextPageLoading: boolean;
  nextPage: number;
} = {
  news: [],
  isLoading: false,
  styles: [],
  currentStyles: getStyles(),
  isNextPageLoading: false,
  nextPage: 2,
};

export const changeNextPage = createAction('PAGE/changeNextPage');

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchNews.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchNews.fulfilled, (state, action) => {
      state.news = action.payload;
      state.nextPage = 2;
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
    })
    .addCase(fetchMoreNews.pending, (state) => {
      state.isNextPageLoading = true;
    })
    .addCase(fetchMoreNews.fulfilled, (state, action) => {
      action.payload.forEach((news) => {
        state.news.push(news);
      });
      state.isNextPageLoading = false;
    })
    .addCase(changeNextPage, (state) => {
      state.nextPage += 1;
    });
});
