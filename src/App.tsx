import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from './const';
import { NewsPage } from './pages/news-page';
import { ThemesPage } from './pages/themes-page';
import { fetchStyles } from './redux/api-actions';
import { useAppDispatch } from './hooks';
import { getTheme } from './services/styles';
import { Theme } from './const';

function App() {
  const dispatch = useAppDispatch();
  const theme = getTheme();
  if (theme) {
    dispatch(fetchStyles(theme));
  } else {
    dispatch(fetchStyles(Theme.Light));
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={AppRoute.Main} element={ <NewsPage /> } />
          <Route path={AppRoute.Themes} element={ <ThemesPage /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
