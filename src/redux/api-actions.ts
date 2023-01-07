import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { State, AppDispatch, News, Styles } from '../types/types';
import { APIRoute, Theme } from '../const';

export const fetchNews = createAsyncThunk<News[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}
>(
  `DATA/fetchNews`,
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<News[]>(`${APIRoute.News}${APIRoute.Get}${APIRoute.Page}1&${APIRoute.Count}10`);
    return data;
  }
);

export const fetchStyles = createAsyncThunk<Styles[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}
>(
  `DATA/fetchStyles`,
  async (_arg, {dispatch, extra: api}) => {
    const darkTheme = await api.get<Styles>(`${APIRoute.Theme}${APIRoute.Get}${APIRoute.Name}${Theme.Dark}`);
    const lightTheme = await api.get<Styles>(`${APIRoute.Theme}${APIRoute.Get}${APIRoute.Name}${Theme.Light}`);
    const blueTheme = await api.get<Styles>(`${APIRoute.Theme}${APIRoute.Get}${APIRoute.Name}${Theme.Blue}`);
    return [darkTheme.data, lightTheme.data, blueTheme.data];
  }
);
