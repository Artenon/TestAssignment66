import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { State, AppDispatch, News, Styles } from '../types/types';
import { APIRoute, Theme, NewsAmount } from '../const';

export const fetchNews = createAsyncThunk<News[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}
>(
  `DATA/fetchNews`,
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<News[]>(`${APIRoute.News}${APIRoute.Get}${APIRoute.Page}1&${APIRoute.Count}${NewsAmount}`);
    return data;
  }
);

export const fetchMoreNews = createAsyncThunk<News[], number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}
>(
  `DATA/fetchMoreNews`,
  async (page, {dispatch, extra: api}) => {
    const {data} = await api.get<News[]>(`${APIRoute.News}${APIRoute.Get}${APIRoute.Page}${page}&${APIRoute.Count}${NewsAmount}`);
    return data;
  }
);

export const fetchStyles = createAsyncThunk<Styles, Theme, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}
>(
  `DATA/fetchStyles`,
  async (theme, {dispatch, extra: api}) => {
    const {data} = await api.get<Styles>(`${APIRoute.Theme}${APIRoute.Get}${APIRoute.Name}${theme}`);
    return data;
  }
);

export const fetchAllStyles = createAsyncThunk<Styles[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}
>(
  `DATA/fetchAllStyles`,
  async (_arg, {dispatch, extra: api}) => {
    const darkTheme = await api.get<Styles>(`${APIRoute.Theme}${APIRoute.Get}${APIRoute.Name}${Theme.Dark}`);
    const lightTheme = await api.get<Styles>(`${APIRoute.Theme}${APIRoute.Get}${APIRoute.Name}${Theme.Light}`);
    const blueTheme = await api.get<Styles>(`${APIRoute.Theme}${APIRoute.Get}${APIRoute.Name}${Theme.Blue}`);
    return [darkTheme.data, lightTheme.data, blueTheme.data];
  }
);
