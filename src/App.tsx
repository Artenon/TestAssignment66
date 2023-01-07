import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from './const';
import { News } from './pages/news';
import { fetchStyles } from './redux/api-actions';
import { useAppDispatch } from './hooks';
import { getTheme, removeTheme } from './services/styles';
import { Theme } from './const';

function App() {
  const dispatch = useAppDispatch();
  const theme = getTheme();
  removeTheme();
  if (theme) {
    dispatch(fetchStyles(theme));
  } else {
    dispatch(fetchStyles(Theme.Light));
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={AppRoute.Main} element={ <News /> } />
          <Route path={AppRoute.Themes} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
