import { State, News, Styles } from '../types/types';

export const getNews = (state: State): News[] => state.news;

export const getIsLoading = (state: State): boolean => state.isLoading; 

export const getStyles = (state: State): Styles[] => state.styles;

export const getCurrentStyles = (state: State): Styles | null => state.currentStyles;

export const getNextPage = (state: State): number => state.nextPage;

export const getIsNextPageLoading = (state: State): boolean => state.isNextPageLoading;
