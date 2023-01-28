import { createReducer, createAction } from '@reduxjs/toolkit';
import { toast, ToastOptions } from 'react-toastify';
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

const toastifyOptions: ToastOptions = {
  theme: 'colored',
  position: 'top-center',
  autoClose: false,
  toastId: 1,
};

export const changeNextPage = createAction('PAGE/changeNextPage');

export const changeCurrentStyles = createAction<Styles>('STYLES/changeCurrentStyles');

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
    .addCase(fetchNews.rejected, (state) => {
      state.isLoading = false;
      toast.error('Случилась ошибка при загрузке страницы, попробуйте перезапустить страницу!', toastifyOptions);
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
    .addCase(fetchStyles.rejected, (state) => {
      state.isLoading = false;
      toast.error('Случилась ошибка при загрузке стилей, попробуйте перезапустить страницу!', toastifyOptions);
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
    .addCase(fetchMoreNews.rejected, (state) => {
      state.isLoading = false;
      toast.error('Случилась ошибка при загрузке дополнительных новостей, попробуйте перезапустить страницу!', toastifyOptions);
    })
    .addCase(changeNextPage, (state) => {
      state.nextPage += 1;
    })
    .addCase(changeCurrentStyles, (state, action) => {
      state.currentStyles = action.payload;
    });
});
