import { Route, Routes } from 'react-router-dom';


import Header from './components/Header';
import Home from './components/Home';
import Settings from './components/Setting';
import Player from './components/Player';
import NotFound from './components/NotFound';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="settings" element={<Settings />} />
        <Route path="video/:id" element={<Player />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
