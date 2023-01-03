import { useState, useRef, useEffect } from 'react';
import Context from './Context';
import {Link, BrowserRouter, Routes, Route } from 'react-router-dom'
import Mapa from './../Mapita/Mapa';
import Home from './../Home/Home';
import Test from './../Test/Test';
import Login from './../Login/Login';
import L from 'Leaflet';
import { db, updateManzanaByCvgeo, getRandomCveoper } from './../../logic/database';

const GlobalComponent = () => {

  const [ _cveoper, _setCveoper ] = useState('201111112');
  const [ _layerMzaSeleccionada, _setLayerMzaSeleccionada ] = useState(null);
  const [ _estadoManzanaSeleccionada, _setEstadoManzanaSeleccionada ] = useState(null);
  const [ _cvgeoSeleccionada, _setCvgeoSeleccionada ] = useState(null);
  const [ _layersFrenteGroup, _setLayersFrenteGroup ] = useState(null);

  // New vars
  const [_map, _setMap] = useState(null)
  const [ _layersMzasGroup, _setLayersMzasGroup ] = useState(null);
  // const [_, _mzasUser] = useState(null)

  // const _mapRef = useRef(null);
  // const _geoRefComponentMzas = useRef(null);
  const _geoRefComponentFrentes = useRef(null);

	const globals = 
	{
    L, db,
    // _mapRef,
    _map, _setMap,
    // _geoRefComponentMzas,
    _layerMzaSeleccionada, _setLayerMzaSeleccionada,
    _estadoManzanaSeleccionada, _setEstadoManzanaSeleccionada,
    _cvgeoSeleccionada, _setCvgeoSeleccionada,
    _layersMzasGroup, _setLayersMzasGroup,
    _setLayersFrenteGroup,_layersFrenteGroup,
		_cveoper, _setCveoper,
    _geoRefComponentFrentes
	} 

  const updateEstadoManzana = cvegeo => {
    const manzana = _layerMzaSeleccionada;
    const valor = _estadoManzanaSeleccionada === 0 ? 1 : 0;
    return updateManzanaByCvgeo(cvegeo, valor)
    .then( result => {
      console.log(_estadoManzanaSeleccionada)
      return _setEstadoManzanaSeleccionada(ant => {
        return valor;
      })
    })
  }

	return <>
		<Context.Provider value={ globals }>
			<BrowserRouter>
    <div className="app-components">
      <div className="list-components">
        <button className="navar-button"><Link className="nav-link" to="/">Home</Link></button>
        <button className="navar-button"><Link className="nav-link" to="/mapa">Mapa</Link></button>
        <button className="navar-button"><Link className="nav-link" to="/login">Login</Link></button>
        <button className="navar-button"><Link className="nav-link" to="/test">Test</Link></button>
      </div>
      <div className="list-vars">
        <div className="item-var"><b>CVEOPER:</b> {_cveoper}</div>        
        <div className="item-var"> <button onClick={() => { getRandomCveoper().then( c => _setCveoper(c)) }} >Random</button> </div>        
        {
          _layerMzaSeleccionada ? 
          <>
            <div className="item-var"><b>Estado Manzana:</b> { _estadoManzanaSeleccionada } </div>        
            <div className="item-var"><b>Cvgeo:</b> { _layerMzaSeleccionada.feature.geometry.properties.CVEGEO }</div>       
    				<div className="item-var">
              <button 
                onClick={ () => updateEstadoManzana(_layerMzaSeleccionada.feature.geometry.properties.CVEGEO) }>
                Cambiar estado</button>
            </div>      	
          </>:
            false
        }
      </div>
    </div>
    <div className="app-displayer">
        <Routes>
          <Route path="/" element={ <Home/>} />
          <Route path="/mapa" element={ <Mapa/>} />
          <Route path="/login" element={ <Login/>} />
          <Route path="/test" element={ <Test/>} />
        </Routes>
    </div>
   </BrowserRouter>
		</Context.Provider>	
	</>;
}

export default GlobalComponent;
