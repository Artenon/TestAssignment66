import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from './const';
import { News } from './pages/news';

function App() {

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
