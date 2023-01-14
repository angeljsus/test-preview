import { useEffect, useContext } from 'react';
import Context from '../Context/Context';
import { selectUnixValue, selectValueByIdColumn, updateAllColumnsData, insertGroupRows } from './../../logic/database';


const ActualizarDatosServer = () => {
	const { _urlServer } = useContext(Context);

	useEffect( () => {
		// console.log(_urlServer)
		consultarActualizaciones(_urlServer)
		const unixStartDate = new Date('2023-01-12T12:00:00').valueOf() 
		const ahoraUnix =  Date.now();
// 		var date = new Date(ahoraUnix);
// // Hours part from the timestamp
// var hours = date.getHours();
// // Minutes part from the timestamp
// var minutes = "0" + date.getMinutes();
// // Seconds part from the timestamp
// var seconds = "0" + date.getSeconds();
// var day = date.getDate();
// var month = date.getMonth()+1;
// var year = date.getFullYear();


// // Will display time in 10:30:23 format
// var formattedTime = 
// `${year}:${month < 10 ? `0${month}` : month}:${day < 10 ? `0${day}` : day} ` + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

// console.log(formattedTime);
		console.log('inicioUnix: ', unixStartDate)
		console.log('ahoraUnix: ', ahoraUnix)
	},[])	

	const consultarActualizaciones = ( url ) => {
		const updateScript = new URL('actualizarDatosServer.php', url)
		const arrTables = [
			{table:'tbl_figura', id:'id_figura'},
			{table:'tbl_historia', id:'id_historia'},
			{table:'tbl_proyecto', id:'id_proyecto'},
			{table:'tbl_revision', id:'id_revision'},
			{table:'tbl_usuario', id:'cveoper_usuario'}
		];
		const data = [];

		return new Promise( (resolve, reject) => {
			let promise = '';
			let counter = 1;;
			let cantidad = arrTables.length;
			for (let i = 0, promise = Promise.resolve(); i < cantidad; i++) {
				promise = promise.then( () => {
		  	return selectUnixValue(arrTables[i].table);
		  })
		  .then( json => data.push(json) )
		  .then( () => counter++)
		  .then( position => position === cantidad ? resolve() : '')
			}
		})
		.then( () => {
			return new Promise( (resolve, reject) => {
				return fetch(updateScript,{
				 	method: 'POST',
						body: JSON.stringify(data),
				// 		headers : {
				// 			'Content-Type': 'text/plain',
				// 		}
				 })
  		.then(response => response.text())
  		.then( text => {
  			const estado = isJson(text);
  			const message = '';
  			if(text === '' && !estado){
  				return console.log('No huvó respuesta del servidor, continuando...');
  			} else {
  				// console.log(text)
  				return estado ? 
  					validateResponseServer(text, arrTables) : 
  					console.log(text);
  			}
  		})
  		// .catch()
  	})
		})
	}

	const validateResponseServer = (text, arrTables) => {
		const json = JSON.parse(text);
		if(json.tbl_figura){
			const consultas = [];

			const idvalues = arrTables.map(({table, id}) => {
				// console.log(json[table])
				const array = json[table]; 
				const cantidad = array.length;
				let ides = '';
				let counter = 1;
				let comma = ',';

				array.map( values => {
					counter === cantidad ? comma = '' : null
					ides += values[id]+comma;
					counter++;
				})
				// checar
				// ides ? consultas.push(`SELECT ${id} FROM ${table} WHERE ${id} in (${ides});`) : false;
				ides ? consultas.push({
						id: id,
						table: table,
						valIdes : ides,
						data: array
					}) 
					: false;
			})

			if( consultas.length > 0 ){
				return ejecutarPorTipoConsulta(consultas);
			}
		}
	}

	const ejecutarPorTipoConsulta = arrConsultas => {
		console.warn(arrConsultas)
		return new Promise( (resolve, reject) => {
			let promise = '';
			let counter = 1;;
			let cantidad = arrConsultas.length;
			for (let i = 0, promise = Promise.resolve(); i < cantidad; i++) {
				promise = promise.then( () => {
		  	return selectValueByIdColumn(arrConsultas[i])
		  	.then( result => result.length ? separarPorTipoConsulta(result, arrConsultas[i]) : insertGroupRows(arrConsultas[i].data, arrConsultas[i].table, arrConsultas[i].id) )
		  })
		  .then( () => console.warn('LOOOOOOOOOOOOOOLLLLLLLLL'))
			}
		})
	}

	const separarPorTipoConsulta = (concidenciaLocal, dataServer) => {
		const { data, id, table } = dataServer;
		// console.log(da)
		const datosInsert = [];

		const datosUpdate = data.filter( item => {
			const find = concidenciaLocal.find( ({idValue}) => idValue.toString() ===  item[id].toString())
			const existe = !find ? false : true;
			if(existe){
				return item;
			} else {
				datosInsert.push(item)
			}
		})

		// console.log(datosUpdate)
		// console.log(datosInsert)

		return new Promise( (resolve, reject) => {
			let promise = '';
			let counter = 1;;
			let cantidad = datosUpdate.length;
			for (let i = 0, promise = Promise.resolve(); i < cantidad; i++) {
				promise = promise.then( () => {
					return updateAllColumnsData(datosUpdate[i], table, id);
		  })
		  .then( () => {
		  	counter === cantidad ? resolve(cantidad) : '';
		  	counter++;
		  })
			}
		})
		.then( rowsAffected => {
			console.log('tabla: %s, status: Termino de actualizar: %s registro%s', table, rowsAffected, rowsAffected > 1? 's' : '')
			return insertGroupRows(datosInsert, table, id);
		})
		// .then( rowsInserted => {
			// console.log('tabla: %s, status: Termino de insertar datos: %s registro%s', table, rowsInserted, rowsInserted > 1? 's' : '')
		// })
	}

	const isJson = text => {
		let response = false;
		let validation = /^[\],:{}\s]*$/;
		validation = validation.test(text.replace(/\\["\\\/bfnrtu]/g, '@')
			.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
			.replace(/(?:^|:|,)(?:\s*\[)+/g, ''))
		return validation ? true : false;
	}

	return <></>
}

export default ActualizarDatosServer;