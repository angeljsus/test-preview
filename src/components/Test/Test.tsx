import { useState, useEffect } from 'react';

		// var db = openDatabase("KRAKEN-SLIDES-2.1", "1.0", "LTA 1.0", 100000 );
		const datos = {
								'idProyecto': 13,
								'sesionPrimera': 7,
								'sesionSegunda': 6,
								'sesionNueva': 10
							}


const Test = () => {
	useEffect( () => {
		// seleccionarDatos(datos);
		// tblcronograma()
})

	const tblcronograma= () => {
		return new Promise( (resolve, reject) => {
			db.transaction(tx => {
					tx.executeSql(
						`SELECT * FROM TBL_CRONORGAMA where ID_PROYECTO=13 and SESION in(6,7)`,
						// `select INSTRUCCIONES from TBL_CRONORGAMA where ID_PROYECTO = 13 and SESION = 8 and ID_FIGURA=53 and ID_SLIDE=2147486205`,
						// `select INSTRUCCIONES from TBL_CRONORGAMA where ID_PROYECTO = 13 and SESION = 8 and ID_FIGURA=53 and ID_SLIDE=2147486205`
						[],(tx, results) => {
							const resultado = Object.keys(results.rows).map(function (key) { return results.rows[key]; });

							resolve(resultado);
						})
				},err => reject(err) )
		})
		.then( result => {
			console.log(JSON.stringify(result));
		})
	}

function seleccionarDatos(datos){
	
    var db = openDatabase("KRAKEN-SLIDES-2.1", "1.0", "LTA 1.0", 100000 );
    var i, datosFinales = [], dai,res,sel,crono,cantidadResultados = 0;
	// AGREGAR OBJETIVOS
    var obj = [];
	// AGREGAR OBJETIVOS
    console.log(datos)
    db.transaction((tx)=>{
	    new Promise((resolve, reject)=>{
	    	tx.executeSql(`SELECT * FROM APP_DATOS_INTRODUCIDOS where idproyecto = ? and sesion in (?, ?) order by sesion`, [datos.idProyecto, datos.sesionPrimera, datos.sesionSegunda ], (tx, results)=>{

	    		cantidadResultados = results.rows.length;
	    		i = 0;

	    		if (cantidadResultados !== 0) {
	    			do{
	    				dai = {
	    					'num_contenido': results.rows.item(i).num_contenido,
							'tipo_contenido': results.rows.item(i).tipo_contenido,
							'nombre_lamina': results.rows.item(i).nombre_lamina,
							'subtipo': results.rows.item(i).subtipo,
							'titulo': results.rows.item(i).titulo,
							'subtitulo': results.rows.item(i).subtitulo,
							'subtitulo1': results.rows.item(i).subtitulo1,
							'texto': results.rows.item(i).texto,
							'texto1': results.rows.item(i).texto1,
							'texto2': results.rows.item(i).texto2,
							'texto3': results.rows.item(i).texto3,
							'imagen': results.rows.item(i).imagen,
							'imagen1': results.rows.item(i).imagen1,
							'imagen2': results.rows.item(i).imagen2,
							'imagen3': results.rows.item(i).imagen3,
							'imagen4': results.rows.item(i).imagen4,
							'imagen5': results.rows.item(i).imagen5,
							'imagen6': results.rows.item(i).imagen6,
							'imagen7': results.rows.item(i).imagen7,
							'lista': results.rows.item(i).lista,
							'lista1': results.rows.item(i).lista1,
							'lista2': results.rows.item(i).lista2,
							'lista3': results.rows.item(i).lista3,
							'tabla': results.rows.item(i).tabla,
							'idusuario': results.rows.item(i).idusuario,
							'idfigura': results.rows.item(i).idfigura,
							'sesion': results.rows.item(i).sesion,
							'idproyecto': datos.idProyecto,
							'slideAnterior': results.rows.item(i).slideAnterior,
							'slideSiguiente': results.rows.item(i).slideSiguiente,
							'idpregunta': results.rows.item(i).idpregunta,
							't_pregunta': results.rows.item(i).t_pregunta,
							'tx_pregunta': results.rows.item(i).tx_pregunta,
							'instruccion': results.rows.item(i).instruccion,
							'num_checks_sel': results.rows.item(i).num_checks_sel,
							'orden': results.rows.item(i).orden,
							'RESPUESTA': [],
							'SELECT': [],
							'CRONORGAMA': [],
	    					// AGREGAR OBJETIVOS
							'OBJETIVOS' : [],
	    					// AGREGAR OBJETIVOS

	    				}

	    				// CARGANDO DATOS a INTRODUCIDOS
	    				datosFinales.push(dai);


	    				// AGREGAR OBJETIVOS
	    				tx.executeSql(`select *, ${i} as KEY from objetivos where ID_PROYECTO = ? and SESION = ? and ID_SLIDE = ?`, [datos.idProyecto, results.rows.item(i).sesion, results.rows.item(i).num_contenido], (tx, results)=>{
							cantidadResultados = results.rows.length;
							if (cantidadResultados !== 0) {
								obj = {
									'id_obj': results.rows.item(0).id_obj,
									'claseObj': results.rows.item(0).claseObj,
									'disenioObj': results.rows.item(0).disenioObj,
									'tiempo': results.rows.item(0).tiempo,
									'sujeto': results.rows.item(0).sujeto,
									'verbo': results.rows.item(0).verbo,
									'selVerbo': results.rows.item(0).selVerbo,
									'complemento': results.rows.item(0).complemento,
									'contenido': results.rows.item(0).contenido,
									'proposito': results.rows.item(0).proposito,
									'ambito': results.rows.item(0).ambito,
									'criterio': results.rows.item(0).criterio,
									'desc': results.rows.item(0).desc,
									'textFinal': results.rows.item(0).textFinal,
									'ID_SLIDE': results.rows.item(0).ID_SLIDE,
									'SESION': results.rows.item(0).SESION,
									'ID_PROYECTO': datos.idProyecto,
									'ID_USUAIRO': results.rows.item(0).ID_USUAIRO
								}
		    					datosFinales[results.rows.item(0).KEY].OBJETIVOS.push(obj);
							}
						})
	    				// AGREGAR OBJETIVOS


						tx.executeSql(`select *, ${i} as KEY from TBL_CRONORGAMA where ID_PROYECTO = ? and SESION = ? and ID_SLIDE = ?`, [datos.idProyecto, results.rows.item(i).sesion, results.rows.item(i).num_contenido], (tx, results)=>{
							cantidadResultados = results.rows.length;
							if (cantidadResultados !== 0) {
								crono = {
									'ID_PROYECTO': datos.idProyecto,
									'SESION': results.rows.item(0).SESION,
									'ID_FIGURA': results.rows.item(0).ID_FIGURA,
									'ID_SLIDE': results.rows.item(0).ID_SLIDE,
									'OBJETIVO': results.rows.item(0).OBJETIVO,
									'INSTRUCCIONES': results.rows.item(0).INSTRUCCIONES,
									'TIEMPO': results.rows.item(0).TIEMPO,
									'MATERIALES': results.rows.item(0).MATERIALES,
									'NOTAS': results.rows.item(0).NOTAS,
									'TEC1': results.rows.item(0).TEC1,
									'TEC2': results.rows.item(0).TEC2,
									'TEC3': results.rows.item(0).TEC3,
									'TEC4': results.rows.item(0).TEC4,
									'TEC5': results.rows.item(0).TEC5,
									'TEC6': results.rows.item(0).TEC6,
									'TEC7': results.rows.item(0).TEC7,
									'TEC8': results.rows.item(0).TEC8,
									'TEC9': results.rows.item(0).TEC9,
									'TEC10': results.rows.item(0).TEC10
								}
		    					datosFinales[results.rows.item(0).KEY].CRONORGAMA.push(crono);
							}
						})


	    				if (results.rows.item(i).idpregunta !== null) {

	 						if (results.rows.item(i).tipo_contenido === 'diapo20' || results.rows.item(i).tipo_contenido === 'diapo24' || results.rows.item(i).tipo_contenido === 'diapo32' || results.rows.item(i).tipo_contenido === 'diapo19') {
	 								
			    				tx.executeSql(`select *, ${i} as KEY from APP_ITEMS_SELECTS where idproyecto = ? and sesion = ? and idpregunta = ?`, [datos.idProyecto, results.rows.item(i).sesion, results.rows.item(i).idpregunta], (tx, results)=>{

	 								cantidadResultados = results.rows.length;

									for(i = 0; i < cantidadResultados; i++){

			    						sel = {
			    							'idpregunta':results.rows.item(i).idpregunta,
											'id_select':results.rows.item(i).id_select,
											'texto':results.rows.item(i).texto,
											'valor':results.rows.item(i).valor,
											'id_figura':results.rows.item(i).id_figura,
											'sesion':results.rows.item(i).sesion,
											'idusuario':results.rows.item(i).idusuario,
											'idproyecto':datos.idProyecto,
											'categoria':results.rows.item(i).categoria,
											'tipo_contenido':results.rows.item(i).tipo_contenido,
			    						}
			    						
			    						datosFinales[results.rows.item(i).KEY].SELECT.push(sel);
									} 
								})

	 						} else {
			    				tx.executeSql(`select *, ${i} as KEY from TBL_RESPUESTA where idproyecto = ? and sesion = ? and idpregunta = ?`, [datos.idProyecto, results.rows.item(i).sesion, results.rows.item(i).idpregunta], (tx, results)=>{
			    					cantidadResultados = results.rows.length;

									for(i = 0; i < cantidadResultados; i++){

			    						res = {
			    							'id_respuesta':results.rows.item(i).id_respuesta,
											'tx_respuesta':results.rows.item(i).tx_respuesta,
											'valor':results.rows.item(i).valor,
											'siguiente':results.rows.item(i).siguiente,
											'figura':results.rows.item(i).figura,
											'sesion':results.rows.item(i).sesion,
											'idpregunta':results.rows.item(i).idpregunta,
											'idusuario':results.rows.item(i).idusuario,
											'idproyecto':datos.idProyecto,
											'categoria':results.rows.item(i).categoria,
											'tipo_contenido':results.rows.item(i).tipo_contenido,
			    						}
			    						datosFinales[results.rows.item(i).KEY].RESPUESTA.push(res);
									}    					
			    				})
	 						}
	    				}

	    				i++;
	    			} while(i < cantidadResultados);
	    		}
	    	});
			resolve('ok')
	    }).then(()=>{
	    	compararDatos(datosFinales,datos)
	    })
    },(err)=>{
        console.error(`Error => seleccionarDatos():\n${err.message}`)
    }, ()=>{
         // console.log(`¡query ok! -> _seleccionarDatos_`)
    })
}

function compararDatos(datosFinales, datos){
	
	var sesionComparar = datos.sesionSegunda;
	var slidesModificados = '';
    var db = openDatabase("KRAKEN-SLIDES-2.1", "1.0", "LTA 1.0", 100000 );

    db.transaction((tx)=>{
    	new Promise((resolve, reject)=>{

	    	tx.executeSql(`select max(num_contenido) as MAXNUMCONTENIDO, max(idpregunta) as MAXIDPREGUNTA from APP_DATOS_INTRODUCIDOS`, [], (tx, results)=>{
	    		var maxNumContenido = results.rows.item(0).MAXNUMCONTENIDO;
	    		var maxIdPregunta = results.rows.item(0).MAXIDPREGUNTA;
				var i = 0, j = 0, numContenidoNuevo = 0, idPreguntaNuevo = 0, p = 0, c = 0,l = 0;
		    	
				for(i in datosFinales){
					if (datosFinales[i].sesion != sesionComparar) {

						for(j in datosFinales){
							if (datosFinales[j].sesion == sesionComparar) {
								// OBTNENER NUM_CONTENIDO DUPLICADO
								if (datosFinales[i].num_contenido == datosFinales[j].num_contenido) {
									c++;
									if (c == 1) {
		    							slidesModificados += `<br /><b>Slide(s) modificados en siguiente y anterior</b>`;
									}
									numContenidoNuevo = maxNumContenido + c;
									console.log(`CONTENIDO DUPLICADO: ${datosFinales[j].num_contenido}\nCAMBIADO POR: ${numContenidoNuevo}`);
		    						slidesModificados += `<br />Numero de Slide: ${numContenidoNuevo}`;
								
									datosFinales[j].num_contenido = numContenidoNuevo;
									datosFinales[j].slideAnterior = '';
									datosFinales[j].slideSiguiente = '';
									l = 0;
									for(l in datosFinales[j].CRONORGAMA){

										if (datosFinales[j].CRONORGAMA[l].ID_SLIDE == datosFinales[i].num_contenido) {
											datosFinales[j].CRONORGAMA[l].ID_SLIDE = numContenidoNuevo
											console.warn(datosFinales[j].CRONORGAMA[l])
										}
									}


	    							// AGREGAR OBJETIVOS
									l = 0;
									for(l in datosFinales[j].OBJETIVOS){

										if (datosFinales[j].OBJETIVOS[l].ID_SLIDE == datosFinales[i].num_contenido) {
											datosFinales[j].OBJETIVOS[l].ID_SLIDE = numContenidoNuevo
											console.warn(datosFinales[j].OBJETIVOS[l])
										}
									}
	    							// AGREGAR OBJETIVOS


								}
								// OBTNENER IDPREGUNTA DUPLICADO
								if (datosFinales[i].idpregunta !== null) {

									if (datosFinales[i].idpregunta == datosFinales[j].idpregunta) {
										p++;
										idPreguntaNuevo = maxIdPregunta + p;
										datosFinales[j].idpregunta = idPreguntaNuevo;

					    				if (datosFinales[j].tipo_contenido === 'diapo20' || datosFinales[j].tipo_contenido === 'diapo24' || datosFinales[j].tipo_contenido === 'diapo32' || datosFinales[j].tipo_contenido === 'diapo19') {
					    					var k = 0;
											for(k in datosFinales[j].SELECT){
					    						datosFinales[j].SELECT[k].id = null
												datosFinales[j].SELECT[k].idpregunta = idPreguntaNuevo;
											}

					    				} else {
											var k = 0;
											for(k in datosFinales[j].RESPUESTA){
					    						datosFinales[j].RESPUESTA[k].id_respuesta = null
												datosFinales[j].RESPUESTA[k].idpregunta = idPreguntaNuevo;
											}
					    				}
									}
								}
							}
						}
					}
				}
				// console.log(datosFinales)
				resolve('ok')
	    	})
    	})
    	.then(()=>{eliminarDatos(datosFinales, datos)})
    	.then(()=>{insertarDatos(datosFinales, datos)})
    	// DESCOMENTAR
    	// .then(()=>{document.getElementById('info-duplicados').insertAdjacentHTML(`afterbegin`,`<br /><b>¡Fusión realizada con éxito!</b><br />${slidesModificados}`)})

	},(err)=>{
        console.error(`Error => compararDatos():\n${err.message}`)
    }, ()=>{
         // console.log(`¡query ok! -> _compararDatos_`)
    })
}

function eliminarDatos(datosFinales, datos){
	
	var db = openDatabase("KRAKEN-SLIDES-2.1", "1.0", "LTA 1.0", 100000 );

    db.transaction((tx)=>{
		
		tx.executeSql(`delete from APP_DATOS_INTRODUCIDOS where sesion = ? and idproyecto = ?`, [datos.sesionNueva, datos.idProyecto], ()=>{});
	    tx.executeSql(`delete from TBL_RESPUESTA where sesion = ? and idproyecto = ?`, [datos.sesionNueva, datos.idProyecto], ()=>{});
	    tx.executeSql(`delete from APP_ITEMS_SELECTS where sesion = ? and idproyecto = ?`, [datos.sesionNueva, datos.idProyecto], ()=>{});
	    tx.executeSql(`delete from TBL_CRONORGAMA where SESION = ? and ID_PROYECTO = ?`, [datos.sesionNueva, datos.idProyecto], ()=>{});
	    // AGREGAR OBJETIVOS
	    tx.executeSql(`delete from objetivos where SESION = ? and ID_PROYECTO = ?`, [datos.sesionNueva, datos.idProyecto], ()=>{});
	    // AGREGAR OBJETIVOS

    },(err)=>{
        console.error(`Error => eliminarDatos():\n${err.message}`)
    }, ()=>{
        console.log(`¡query ok! -> eliminarDatos`)
    })

}

function insertarDatos(datosFinales, datos){
	var db = openDatabase("KRAKEN-SLIDES-2.1", "1.0", "LTA 1.0", 100000 );
	// console.log(datosFinales)
    db.transaction((tx)=>{
	    var i = 0, x = 0, insert = '';
    	for(i in datosFinales){
			insert = 'insert into APP_DATOS_INTRODUCIDOS values(' + 
							  datosFinales[i].num_contenido + ',' +
						'"' + datosFinales[i].tipo_contenido + '",' + 
						'"' + datosFinales[i].nombre_lamina + '",' + 
						'"' + datosFinales[i].subtipo + '",' + 
						'"' + datosFinales[i].titulo + '",' + 
						'"' + datosFinales[i].subtitulo + '",' + 
						'"' + datosFinales[i].subtitulo1 + '",' + 
						'"' + datosFinales[i].texto + '",' + 
						'"' + datosFinales[i].texto1 + '",' + 
						'"' + datosFinales[i].texto2 + '",' + 
						'"' + datosFinales[i].texto3 + '",' + 
						'"' + datosFinales[i].imagen + '",' + 
						'"' + datosFinales[i].imagen1 + '",' + 
						'"' + datosFinales[i].imagen2 + '",' + 
						'"' + datosFinales[i].imagen3 + '",' +
						'"' + datosFinales[i].imagen4 + '",' + 
						'"' + datosFinales[i].imagen5 + '",' + 
						'"' + datosFinales[i].imagen6 + '",' + 
						'"' + datosFinales[i].imagen7 + '",' + 
						'"' + datosFinales[i].lista + '",' + 
						'"' + datosFinales[i].lista1 + '",' + 
						'"' + datosFinales[i].lista2 + '",' + 
						'"' + datosFinales[i].lista3 + '",' + 
						'"' + datosFinales[i].tabla + '",' +
							  datosFinales[i].idusuario + ',' + 
							  datosFinales[i].idfigura + ',' + 
							  datos.sesionNueva + ',' +
							  datosFinales[i].idproyecto + ',' + 
						'"' + datosFinales[i].slideAnterior + '",' + 
						'"' + datosFinales[i].slideSiguiente + '",' + 
						      datosFinales[i].idpregunta + ',' + 
						'"' + datosFinales[i].t_pregunta + '",' +
						'"' + datosFinales[i].tx_pregunta + '",' +
						'"' + datosFinales[i].instruccion + '",' +
							  datosFinales[i].num_checks_sel + ',' +
							  datosFinales[i].orden + ')' ;
						// tx.executeSql(insert,[],()=>{})
	    				// console.log(insert)

				if (datosFinales[i].idpregunta != null) {
	 				if (datosFinales[i].tipo_contenido === 'diapo20' || datosFinales[i].tipo_contenido === 'diapo24' || datosFinales[i].tipo_contenido === 'diapo32' || datosFinales[i].tipo_contenido === 'diapo19') {
	 					insert = '';
	 					x = 0;
	 					for(x in datosFinales[i].SELECT){
	 						// console.log('da')
	 					insert = 'insert into APP_ITEMS_SELECTS values('+
					    			null + ',' +
					    			datosFinales[i].SELECT[x].idpregunta + ',' +
					    			datosFinales[i].SELECT[x].id_select + ',' +
					    	'"' + 	datosFinales[i].SELECT[x].texto + '",'+
					    			datosFinales[i].SELECT[x].valor + ',' +
					    			datosFinales[i].SELECT[x].id_figura + ',' +
					    			datos.sesionNueva + ',' +
					    			datosFinales[i].SELECT[x].idusuario + ',' +
					    			datosFinales[i].SELECT[x].idproyecto + ',' +
					    	'"' + 	datosFinales[i].SELECT[x].categoria + '",' +
					    	'"' + 	datosFinales[i].SELECT[x].tipo_contenido + '");'
	    					
	    					// tx.executeSql(insert,[],()=>{})
	    					// console.log(insert)
					    }
	 				} else {
	 					x = 0;
	 					for(x in datosFinales[i].RESPUESTA){
	 					insert = 'insert into TBL_RESPUESTA values('+
		 						null + ',' +
								'"' + datosFinales[i].RESPUESTA[x].tx_respuesta + '",' +
									  datosFinales[i].RESPUESTA[x].valor + ',' +
									  datosFinales[i].RESPUESTA[x].siguiente + ',' +
									  datosFinales[i].RESPUESTA[x].figura + ',' +
									  datos.sesionNueva + ',' +
									  datosFinales[i].RESPUESTA[x].idpregunta + ',' +
									  datosFinales[i].RESPUESTA[x].idusuario + ',' +
									  datosFinales[i].RESPUESTA[x].idproyecto + ',' +
								'"' + datosFinales[i].RESPUESTA[x].categoria + '",' +
								'"' + datosFinales[i].RESPUESTA[x].tipo_contenido + '");'
								
								// tx.executeSql(insert,[],()=>{})
								// console.log(insert)
		 					}
	 				}
				}
	 			if(datosFinales[i].CRONORGAMA.length !== 0){
	 				insert = 'insert into TBL_CRONORGAMA values('+
	 					'' + datosFinales[i].CRONORGAMA[0].ID_PROYECTO + ',' +
						'' + datos.sesionNueva + ',' +
						'' + datosFinales[i].CRONORGAMA[0].ID_FIGURA + ',' +
						'' + datosFinales[i].CRONORGAMA[0].ID_SLIDE + ',' +
						'"' + datosFinales[i].CRONORGAMA[0].OBJETIVO + '",' +
						'"' + datosFinales[i].CRONORGAMA[0].INSTRUCCIONES + '",' +
						'' + datosFinales[i].CRONORGAMA[0].TIEMPO + ',' +
						'"' + datosFinales[i].CRONORGAMA[0].MATERIALES + '",' +
						'"' + datosFinales[i].CRONORGAMA[0].NOTAS + '",' +
						'' + datosFinales[i].CRONORGAMA[0].TEC1 + ',' +
						'' + datosFinales[i].CRONORGAMA[0].TEC2 + ',' +
						'' + datosFinales[i].CRONORGAMA[0].TEC3 + ',' +
						'' + datosFinales[i].CRONORGAMA[0].TEC4 + ',' +
						'' + datosFinales[i].CRONORGAMA[0].TEC5 + ',' +
						'' + datosFinales[i].CRONORGAMA[0].TEC6 + ',' +
						'' + datosFinales[i].CRONORGAMA[0].TEC7 + ',' +
						'' + datosFinales[i].CRONORGAMA[0].TEC8 + ',' +
						'' + datosFinales[i].CRONORGAMA[0].TEC9 + ',' +
						'' + datosFinales[i].CRONORGAMA[0].TEC10 + ','+
						'' + datosFinales[i].idusuario + ');';
					// tx.executeSql(insert,[],()=>{})
					// console.log(insert)
					// select * from TBL_CRONORGAMA where ID_PROYECTO=13 and SESION in (6,7)
	 			}


	    		// AGREGAR OBJETIVOS
	 			if(datosFinales[i].OBJETIVOS.length !== 0){
	 				insert = 'insert into objetivos values('+
	 					'' + datosFinales[i].OBJETIVOS[0].id_obj + ',' +
						'"' + datosFinales[i].OBJETIVOS[0].claseObj + '",' +
						'"' + datosFinales[i].OBJETIVOS[0].disenioObj + '",' +
						'"' + datosFinales[i].OBJETIVOS[0].tiempo + '",' +
						'"' + datosFinales[i].OBJETIVOS[0].sujeto + '",' +
						'"' + datosFinales[i].OBJETIVOS[0].verbo + '",' +
						'' + datosFinales[i].OBJETIVOS[0].selVerbo + ',' +
						'"' + datosFinales[i].OBJETIVOS[0].complemento + '",' +
						'"' + datosFinales[i].OBJETIVOS[0].contenido + '",' +
						'"' + datosFinales[i].OBJETIVOS[0].proposito + '",' +
						'"' + datosFinales[i].OBJETIVOS[0].ambito + '",' +
						'"' + datosFinales[i].OBJETIVOS[0].criterio + '",' +
						'"' + datosFinales[i].OBJETIVOS[0].desc + '",' +
						'"' + datosFinales[i].OBJETIVOS[0].textFinal + '",' +
						'' + datosFinales[i].OBJETIVOS[0].ID_SLIDE + ',' +
						'' + datos.sesionNueva + ',' +
						'' + datosFinales[i].OBJETIVOS[0].ID_PROYECTO + ',' +
						'' + datosFinales[i].idusuario + ');';
					// tx.executeSql(insert,[],()=>{})
					// console.log(insert)
	 			}
	    		// AGREGAR OBJETIVOS

    	}
    },(err)=>{
        console.error(`Error => insertarDatos():\n${err.message}`)
    }, ()=>{
         console.warn(`!_DATOS_CARGADOS_EXITOSAMENTE_!`)
         // DESCOMENTAR
         // cargarRadiosSesiones(datosFinales[0].idproyecto)
    })
}


	return <>
		<div>Hola mundo</div>
	</>
}

export default Test;