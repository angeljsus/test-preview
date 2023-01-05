import { useEffect, useContext, useRef, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap, useMapEvents  } from 'react-leaflet';
import Context from '../Context/Context';
import config from './config';
import './Mapa.css';
import 'Leaflet/dist/leaflet.css';
// import geoJsonAreaManzanas from './data/mza.json';
import geoJsonEjesManzanas from './data/ejes.json';
import ManzanasDefault from './ManzanasDefault';
import UsuarioManzanas from './UsuarioManzanas'
import UsuarioFrenteManzana from './UsuarioFrenteManzana'
import TablaManzanas from './TablaManzanas'
import TablaFrentes from './TablaFrentes'

const Mapa = () => {

	const { _setMap } = useContext(Context);

	// const MapEvents = () => {
		// const map = useMapEvents({ zoomend : e => changeZoomState(e) });
  // return null
	// }

	return <>
		<div className="map-container">
			<div className="map-display">
				<MapContainer {... config } whenReady={ e => _setMap(e.target) }>
					<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'></TileLayer>
					{/*<MapEvents />*/}
					<ManzanasDefault />
					<UsuarioManzanas />
					<UsuarioFrenteManzana />
				</MapContainer>
			</div>
			<div className="map-tables">
				<div className="tabla-manzanas">
					<TablaManzanas />
				</div>		
				<div className="tabla-frentes">
					<TablaFrentes />
				</div>		
			</div>
		</div>
	</>;
}

export default Mapa;