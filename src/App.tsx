import React, { useEffect, useState } from 'react';
// import {Link, BrowserRouter, Routes, Route } from 'react-router-dom'
import AppBar from './AppBar';
import GlobalComponent from './components/Context/GlobalComponent';
import { loadTables } from '/logic/database';

function App() {
  const [isOpen, setOpen] = useState(false);
  const [isSent, setSent] = useState(false);
  const [fromMain, setFromMain] = useState<string | null>(null);

  const handleToggle = () => {
    if (isOpen) {
      setOpen(false);
      setSent(false);
    } else {
      setOpen(true);
      setFromMain(null);
    }
  };

  useEffect(() => {
    loadTables();
  }, [])
  // console.log(window)

  return (
    <div className="app">
      {window.Main && (
        <div className="flex-none app-bar-window">
          <AppBar />
        </div>
      )}
      <div className="app-container">
      <GlobalComponent />
        {/*<BrowserRouter>
          <div className="app-components">
            <div className="list-components">
              <button className="navar-button"><Link className="nav-link" to="/">Home</Link></button>
              <button className="navar-button"><Link className="nav-link" to="/mapa">Mapa</Link></button>
            </div>
          </div>
          <div className="app-displayer">
              <Routes>
                <Route path="/" element={ <Home/>} />
                <Route path="/mapa" element={ <Mapa/>} />
              </Routes>
          </div>
        </BrowserRouter>*/}
      </div>
    </div>
  );
}

export default App;
