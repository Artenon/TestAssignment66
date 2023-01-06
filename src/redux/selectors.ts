import { State, News, Styles } from '../types/types';

export const getNews = (state: State): News[] => state.news;

export const getIsLoading = (state: State): boolean => state.isLoading; 

export const getStyles = (state: State): Styles | null => state.styles;
