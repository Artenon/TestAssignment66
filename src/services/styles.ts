import { Styles } from '../types/types';

const KEY_NAME = 'style-data';

export const getStyles = (): Styles | null => {
  const styles = localStorage.getItem(KEY_NAME);
  return styles ? JSON.parse(styles) : null;
};

export const setStyles = (styles: Styles): void => {
  localStorage.setItem(KEY_NAME, JSON.stringify(styles));
};

export const removeStyles = (): void => {
  localStorage.removeItem(KEY_NAME);
};
