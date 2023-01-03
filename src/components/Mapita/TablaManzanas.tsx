import { useContext } from 'react';
import Context from './../Context/Context';
import './TablaMapa.css';

const TablaManzanas = () => {
	const {
		_layersMzasGroup, 
		_cvgeoSeleccionada, _setCvgeoSeleccionada, 
		_setEstadoManzanaSeleccionada, 
		_setLayerMzaSeleccionada  } = useContext(Context);

	return <>
	<div className="tabla-a">
    <div className="tabla-a-header">
     <div className="item-header">CVE_ENT</div>
     <div className="item-header">CVE_MUN</div>
     <div className="item-header">CVE_LOC</div>
     <div className="item-header">CVE_AGEB</div>
     <div className="item-header">CVE_MZA</div>
   </div>
   <div className="content-tabla-a">
   	{ 
   		_layersMzasGroup ? 
   			(
   				_layersMzasGroup.getLayers().map( (layer, i) => {
   				const { feature } = layer;
          const { geometry } = feature;
          const { properties } = geometry;
          const { id_carga, CVEGEO, CVE_ENT, CVE_MUN, CVE_LOC, CVE_AGEB, CVE_MZA, mi_estado } = properties;
          const selected = _cvgeoSeleccionada ? _cvgeoSeleccionada === CVEGEO ? "row-selected" : "" : "" 
   				return (
   						<div
          key={'carga-'+id_carga} 
          className={"colum-row-a " + selected}
          onClick={ 
          	() => {
              return _cvgeoSeleccionada !== CVEGEO ?
							 Promise.resolve()
          			.then( () => _setEstadoManzanaSeleccionada(null)) 
          			.then( () => _setLayerMzaSeleccionada( lay => { 
														lay === layer ? false : 
															( lay ? lay.setStyle({fillOpacity:1}) : false ) 
														return layer; 
													}) )
          			.then( () => _setEstadoManzanaSeleccionada(mi_estado)) 
								.then(() => _setCvgeoSeleccionada(CVEGEO) )
              : false
          	 }
          	}
   						>
   							<div className="colum-row-a">{CVE_ENT}</div>
          <div className="colum-row-a">{CVE_MUN}</div>
          <div className="colum-row-a">{CVE_LOC}</div>
          <div className="colum-row-a">{CVE_AGEB}</div>
          <div className="colum-row-a">{CVE_MZA}</div>
   						</div>
   					);
   				})
   			) 
   			: null
   	}
   </div>
  </div>
	</>;
}


export default TablaManzanas;