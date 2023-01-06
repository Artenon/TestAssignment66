import { store } from "../redux/store";

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type News = {
  title: string,
  content: string,
  id: number,
  createdAt: string,
  updatedAt: string,
};

export type Styles = {
  id: number,
  name: string,
  mainColor: string,
  secondColor: string,
  title: string,
  textColor: string,
};
