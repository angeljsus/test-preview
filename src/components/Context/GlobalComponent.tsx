import { useState, useRef, useEffect } from 'react';
import Context from './Context';
import {Link, BrowserRouter, Routes, Route } from 'react-router-dom'
import Mapa from './../Mapa/Mapa';
import Home from './../Home/Home';
import Test from './../Test/Test';
import Login from './../Login/Login';
import ActualizarDatosServer from './../Cotejo/ActualizarDatosServer';
import L from 'Leaflet';
import { db, updateManzanaByCvgeo, getRandomCveoper } from './../../logic/database';

const GlobalComponent = () => {

  const [ _cveoper, _setCveoper ] = useState('201111111');  //201111112
  const [ _layerMzaSeleccionada, _setLayerMzaSeleccionada ] = useState(null);
  const [ _estadoManzanaSeleccionada, _setEstadoManzanaSeleccionada ] = useState(null);
  const [ _cvgeoSeleccionada, _setCvgeoSeleccionada ] = useState(null);
  const [ _layersFrenteGroup, _setLayersFrenteGroup ] = useState(null);
  const _urlServer = 'http://localhost/servidor_cotejo/';

  // New vars
  const [_map, _setMap] = useState(null)
  const [ _layersMzasGroup, _setLayersMzasGroup ] = useState(null);

  const _geoRefComponentFrentes = useRef(null);

	const globals = 
	{
    _urlServer,
    L, db,
    _map, _setMap,
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

  const button = {
    border: '1px solid rgba(0,0,0,.2)',
    display:'flex',
    width: '100%',
    background:'#adb5bd',
    justifyContent:'center',
    alignItems:'center',
    color: 'black',
    opacity: .7,
    fontWeight: 'bold'
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
        <button className="navar-button"><Link className="nav-link" to="/update">Actualizar Datos</Link></button>
      </div>
      <div className="list-vars">
        <div className="item-var"><b>CVEOPER:</b> {_cveoper}</div>        
        {
          _layerMzaSeleccionada ? 
          <>
            <div className="item-var"><b>Estado Manzana:</b> { _estadoManzanaSeleccionada } </div>        
            <div className="item-var"><b>Cvgeo:</b> { _layerMzaSeleccionada.feature.geometry.properties.CVEGEO }</div>       
    				<div className="item-var">
              <button 
                style={button}
                onClick={ () => updateEstadoManzana(_layerMzaSeleccionada.feature.geometry.properties.CVEGEO) }>
                Cambiar estado</button>
            </div>      	
          </>:
            false
        }
        <div className="item-var"> 
          <button style={button} onClick={() => { getRandomCveoper().then( c => _setCveoper(c)) }} >Random</button> 
        </div>        
      </div>
    </div>
    <div className="app-displayer">
        <Routes>
          <Route path="/" element={ <Home/>} />
          <Route path="/mapa" element={ <Mapa/>} />
          <Route path="/login" element={ <Login/>} />
          <Route path="/test" element={ <Test/>} />
          <Route path="/update" element={ <ActualizarDatosServer/>} />
        </Routes>
    </div>
   </BrowserRouter>
		</Context.Provider>	
	</>;
}

export default GlobalComponent;
