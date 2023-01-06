import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { APPRoute } from './const';
import { News } from './pages/news';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={APPRoute.Main} element={ <News /> } />
          <Route path={APPRoute.Themes} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
