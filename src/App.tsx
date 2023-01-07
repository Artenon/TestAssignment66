import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from './const';
import { NewsPage } from './pages/news-page';
import { ThemesPage } from './pages/themes-page';

function App() { 
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
