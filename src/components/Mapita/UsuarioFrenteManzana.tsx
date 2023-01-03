import { useEffect, useContext, useState, useRef } from 'react';
import Context from './../Context/Context';
import { selectFrentesUser } from './../../logic/database';
import { GeoJSON } from 'react-leaflet';


const UsuarioFrenteManzana = () => {

	const { 
		_cvgeoSeleccionada,	
		_cveoper,
		_setLayersFrenteGroup,_layersFrenteGroup,
	} = useContext(Context);

	const [collection, setCollection] = useState(null);
	const [key, setKey] = useState(0);
	const componentRef = useRef(null)

	useEffect( () => {
		if(_cveoper){
			// checar
			return componentRef.current.clearLayers();
		}
	}, [_cveoper])

	useEffect( () => {
		if(_cvgeoSeleccionada){
			return getFeatureCollection(_cveoper, _cvgeoSeleccionada)
				.then( result => setCollection(result) )
		}
	},[_cvgeoSeleccionada])

	useEffect( () => {
		if(collection){
			return Promise.resolve()
				.then( () => setKey(_cvgeoSeleccionada) )
				.then( () =>{ 
					console.log(_cvgeoSeleccionada)
					componentRef ? _setLayersFrenteGroup(componentRef.current) : false 
				})
		}
	}, [ collection ])

	const getFeatureCollection = (cveoper, cvegeo) => {
		return selectFrentesUser(cveoper, cvegeo)
		.then( results => {
		 const object = { type:'featureCollection', features:[]}
		 object.features = results.map( item => {
		 	const { COORDENADAS, TIPO_COORDENADAS } = item;
		 	const jsonCoors = JSON.parse(COORDENADAS);
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
		layer.on('click', e => {	
			e.target.setStyle({ color:'black'})
		})
	} 

	return <>
		<GeoJSON 
			key={key} 
			ref={componentRef} 
			data={ collection } 
			style={{ color: '#00b4d8', fillOpacity:1, weight:10}}
			onEachFeature={ addEventsToLayers } 
		/>
	</>
}


export default UsuarioFrenteManzana;