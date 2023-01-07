import { Theme } from '../const';

const KEY_NAME = 'theme';

export const getTheme = (): Theme | null => {
  const theme = localStorage.getItem(KEY_NAME);
  return theme ? JSON.parse(theme) : null;
};

export const setTheme = (theme: Theme): void => {
  localStorage.setItem(KEY_NAME, JSON.stringify(theme));
};

export const removeTheme = (): void => {
  localStorage.removeItem(KEY_NAME);
};
