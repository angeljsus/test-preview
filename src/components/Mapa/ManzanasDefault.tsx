import { GeoJSON } from 'react-leaflet';
import { useEffect, useContext, useRef, useState } from 'react';
import geoJsonAreaManzanas from './data/mza.json';
import Context from '../Context/Context';


const ManzanasDefault = () => {
	const { _zoom } = useContext(Context);
	const componentRef = useRef(null);
	const [ elements, setElements] = useState(null)

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