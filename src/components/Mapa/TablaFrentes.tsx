import Context from './../Context/Context';
import { useContext } from 'react';

const TablaFrentes = () => {
	const { _layersFrenteGroup, _layerMzaSeleccionada } = useContext(Context);

	return <>
		{
			_layerMzaSeleccionada ?  
				(
					<div className="tabla-a">
   		 <div className="tabla-a-header">
   		  <div className="item-header">TIPOVIAL</div>
   		  <div className="item-header">NOMVIAL</div>
   		  <div className="item-header">ORIGEN</div>
   			</div>
   			<div className="content-tabla-a">
   			{
   				_layersFrenteGroup ?
   				_layersFrenteGroup.getLayers().map( (layer, i) => {
   					const { NOMVIAL, ORIGEN, TIPOVIAL} = layer.feature.geometry.properties;
   					return (
   						<div
          key={'carga-'+i} 
          className={"colum-row-a "}
         >
          <div className="colum-row-a">{TIPOVIAL}</div>
          <div className="colum-row-a">{NOMVIAL}</div>
          <div className="colum-row-a">{ORIGEN}</div>

         </div>
   					)
   				})
   				: false
   			}
   			</div>
   		</div>
				) 
				: null
		}
	</>
}

export default TablaFrentes;