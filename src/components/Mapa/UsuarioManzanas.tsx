import { useEffect, useContext, useState, useRef } from 'react';
import Context from './../Context/Context';
import { select } from './../../logic/database';
import { GeoJSON } from 'react-leaflet';


const UsuarioManzanas = () => {

	const {
	 _cveoper,
	 _map,
		_layerMzaSeleccionada, _setLayerMzaSeleccionada,
		_cvgeoSeleccionada, _setCvgeoSeleccionada,
		_setEstadoManzanaSeleccionada,_estadoManzanaSeleccionada,
		_setLayersMzasGroup,
	} = useContext(Context);

	const [collection, setCollection] = useState(null)
	const [key, setKey] = useState(0);
	const componentRef = useRef(null)
		
	useEffect( () => {
		if( _cveoper ) {
			return getFeatureCollection(_cveoper)
			.then( result => setCollection(result) )
			.then( () => _setCvgeoSeleccionada(null) )
			.then( () => _setEstadoManzanaSeleccionada(null) )
			.then( () => _setLayerMzaSeleccionada(null) )
		}
	}, [ _cveoper ])

	useEffect( () => {
		if(collection){
			return Promise.resolve()
				.then( () => setKey(_cveoper) )
				.then( () => componentRef ? _setLayersMzasGroup(componentRef.current) : false )
		}
	}, [ collection ])

	useEffect( () => {
		if(_layerMzaSeleccionada){
			const { mi_estado, CVEGEO } = _layerMzaSeleccionada.feature.geometry.properties;
			console.log('%s %s',CVEGEO, _cvgeoSeleccionada)
			return Promise.resolve()
				.then(() => _setEstadoManzanaSeleccionada(mi_estado) )
				.then(() => _setCvgeoSeleccionada(CVEGEO) )
				.then(() => _layerMzaSeleccionada.setStyle({fillOpacity:.7}) )

		}
	}, [_layerMzaSeleccionada])

	useEffect( () => {
		if(_estadoManzanaSeleccionada !== null){
			return paintManzanaByEstado(_layerMzaSeleccionada, _estadoManzanaSeleccionada)
		}
	}, [_estadoManzanaSeleccionada])

	const paintManzanaByEstado = (layerManzana, estado) => {
		let color = 'gray';
		if(estado === 1){ color = 'yellow' };
		layerManzana.setStyle({fillColor:color})
		layerManzana.feature.geometry.properties.mi_estado = estado;
		console.log('pintar de color: ', color)
	}

	const getFeatureCollection = cveoper => {
		return select('carga', _cveoper)
		.then( (datos) => {
		 const object = { type:'featureCollection', features:[]}
		 object.features = datos.map( item => {
		 	const { COORDENADAS, TIPO_COORDENADAS, mi_estado } = item;
		 	const jsonCoors = JSON.parse(COORDENADAS);
		 	mi_estado === 1 ? item.color = 'gray' : item.color = 'yellow';
		 	return {
					type:'Feature',
					geometry: {
						type: TIPO_COORDENADAS,
						coordinates: jsonCoors,
						properties: item
					}
				}
		 })
		 return object;
		})
	}

	const addEventsToLayers = (feature, layer) => {
		const { mi_estado, CVEGEO, CVE_MZA } = feature.geometry.properties;
		let color = 'gray';
		if(mi_estado === 1){
			color = 'yellow';
		}
		layer.setStyle({ opacity: 0, fillColor:color, fillOpacity:1});
		layer.on('click', e => {	
				_setLayerMzaSeleccionada( lay => { 
					lay === e.target ? false : 
						( lay ? lay.setStyle({fillOpacity:1}) : false ) 
					return e.target; 
				})
		})
		layer.bindTooltip(CVE_MZA, {
			direction:'center', 
			opacity:.7, 
			direction: 'center',
			permanent: true,
			... { 
				className:'bind-manzana-tooltip', 
				interactive: false,
			}
		})
		.openTooltip()
	} 

	return <>
		<GeoJSON 
			key={key} 
			ref={componentRef} 
			data={ collection } 
			onEachFeature={ addEventsToLayers }
		/>
	</>;
}

export default UsuarioManzanas;