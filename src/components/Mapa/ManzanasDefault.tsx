import { GeoJSON } from 'react-leaflet';
import { useEffect, useContext, useRef, useState } from 'react';
import geoJsonAreaManzanas from './data/mza.json';
import Context from '../Context/Context';


const ManzanasDefault = () => {
	const { _map } = useContext(Context);
	const componentRef = useRef(null);
	const [ elements, setElements] = useState(null)

	useEffect( () => {
		_map.on({
			zoomend : e => showOrHideTooltip( e.target.getZoom() )
		})
	}, [ _map ])

	const showOrHideTooltip = zoom => {
		console.log('Zoom position: ',zoom)
		if(zoom === 16 || zoom === 15){
			componentRef.current.eachLayer( layer => {
				if(zoom === 16){
					layer.openTooltip()
				} else {
					layer.closeTooltip()
				}
			})
		}
	}

	const setNameOfLayerManzana = (feature, layer) => {
		const { CVE_MZA } = feature.properties;
		layer.bindTooltip(CVE_MZA, {
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

	return (
		<GeoJSON 
			ref={ componentRef }
			data={ geoJsonAreaManzanas } 
  	interactive={ false } 
			style={ { color: '#80ed99', fillOpacity: 0.3, weight:0 } }
			onEachFeature={ setNameOfLayerManzana }
		/>
	);
}


export default ManzanasDefault;