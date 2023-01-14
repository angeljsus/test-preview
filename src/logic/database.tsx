
const getDatabase = () => {
	return openDatabase('TesterApp','1.0','Almacenamiento de prueba de información, consultas sqlite', 1000000);
}

const db = getDatabase();

const loadTables = () => {
	return new Promise( (resolve, reject) => {
		db.transaction( tx => {
			tx.executeSql(`
				CREATE TABLE IF NOT EXISTS carga(
					id_carga int primary key,
					AMBITO varchar(100),
					ATRIBUTOS varchar(100),
					CVEGEO varchar(100),
					CVEOPERORI varchar(100),
					CVE_AGEB varchar(100),
					CVE_ENT varchar(100),
					CVE_LOC varchar(100),
					CVE_MUN varchar(100),
					CVE_MZA varchar(100),
					CVE_OPER_ENT varchar(100),
					ID_CURM varchar(100),
					TIPOMZA int,
					TIPO_COORDENADAS varchar(100),
					COORDENADAS varchar(10000)
				);
			`)

			tx.executeSql(`
				CREATE TABLE IF NOT EXISTS frente(
					id_frente int primary key,
					ATRIBUTOS varchar(100),
					CVEFT varchar(100),
					CVEGEO varchar(100),
					CVEOPER varchar(100),
					CVEOPERORI varchar(100),
					CVESEG varchar(100),
					CVEVIAL varchar(100),
					CVE_AGEB varchar(100),
					CVE_ENT varchar(100),
					CVE_LOC varchar(100),
					CVE_MUN varchar(100),
					CVE_MZA varchar(100),
					CVE_OPER_ENT varchar(100),
					NOMVIAL varchar(100),
					ORIGEN varchar(100),
					TIPOVIAL varchar(100),
					TIPO_COORDENADAS varchar(100),
					COORDENADAS varchar(10000)
				);
			`)



	tx.executeSql(`CREATE TABLE IF NOT EXISTS tbl_figura(
			id_figura INT NOT NULL,
			nombre_figura VARCHAR(250),
			nem_figura VARCHAR(25),
			update_figura INT,
			PRIMARY KEY (id_figura)
		);
	`);

	tx.executeSql(`
		CREATE TABLE IF NOT EXISTS tbl_usuario (
			cveoper_usuario VARCHAR(10) NOT NULL,
			cuenta_usuario VARCHAR(250),
			nombre_usuario VARCHAR(250),
			paterno_usuario VARCHAR(250),
			materno_usuario VARCHAR(250),
			password_usuario VARCHAR(50),
			nivel_usuario INT,
			update_usuario BIGINT,
			PRIMARY KEY (cveoper_usuario)
		);
	`); 

	tx.executeSql(`
		CREATE TABLE IF NOT EXISTS tbl_proyecto(
			id_proyecto INT NOT NULL,
			nombre_proyecto VARCHAR(200),
			estatus_proyecto INT,
			respuesta_proyecto VARCHAR(400),
			historias_activo INT,
			prototipo_activo INT,
			update_proyecto INT,
			PRIMARY KEY (id_proyecto)
		);
	`);

	tx.executeSql(`
		CREATE TABLE IF NOT EXISTS tbl_historia(
			id_historia INT NOT NULL,
			titulo_historia VARCHAR(250),
			modulo_historia VARCHAR(250),
			descripcion_historia VARCHAR(300),
			prioridad_historia INT,
			dependencias_historia VARCHAR(250),
			validaciones_historia VARCHAR(250),
			comentarioadm_historia VARCHAR(400),
			estatus_historia INT,
			transfer_historia DATETIME,
			update_historia INT,
			idfigura INT NOT NULL,
			idproyecto INT NOT NULL,
			PRIMARY KEY (id_historia),
			FOREIGN KEY (idfigura) REFERENCES tbl_figura(id_figura),
			FOREIGN KEY (idproyecto) REFERENCES tbl_proyecto(id_proyecto)
		);
	`);

	tx.executeSql(`
		CREATE TABLE IF NOT EXISTS tbl_revision(
			id_revision INT NOT NULL,
			descripcion_revision VARCHAR(400),
			resultado_revision VARCHAR(400),
			recomendacion_revision VARCHAR(400),
			status_revision INT,
			transfer_revision DATETIME,
			update_revision INT,
			numero_pantalla INT,
			aplicacion INT,
			usuariorevision VARCHAR(10) NOT NULL,
			version INT NOT NULL,
			PRIMARY KEY (id_revision),
			FOREIGN KEY (version) REFERENCES tbl_historia(id_historia),
			FOREIGN KEY (usuariorevision) REFERENCES tbl_usuario(cveoper_usuario) 
		);
	`);




// tx.executeSql('DROP table if exists tbl_usuario');
// tx.executeSql('DROP table if exists test');
// tx.executeSql('DROP table if exists tbl_proyecto');
// tx.executeSql('DROP table if exists tbl_historia');
// tx.executeSql('DROP table if exists tbl_revision');

			// insert into usuario values ('000000001','angel.trujillo','Ángel de Jesús','Aguilar','Trujillo','25423b1937ea93987b080daae6b4d13df24376a3b6229205be0e76b24685c02f9d700b81ce43e3036aa6e3baaa1dc24ca9a0cc812899d22b14a2fc0208698215', 1,1673546400000);

		}, err => reject(err), () => resolve() )
	})
}

// select('carga', 'cv')
const select = (tableName, cveoper) => {
	return new Promise( (resolve, reject) => {
		db.transaction( tx => {
			tx.executeSql(`
				SELECT 
					*
				FROM
					${ tableName }
				WHERE 
					CVE_OPER_ENT = ?
			`, [ cveoper ], (tx, results) => {
				resolve(results);
			})
		}, err => reject(err) )
	})
	.then( results => {
		return Object.keys(results.rows)
			.map( key => results.rows[key] )
	})
}

const selectUserByCuenta = nombreCuenta => {
	return new Promise( (resolve, reject) => {
		db.transaction( tx => {
			tx.executeSql(`
				SELECT 
					*
				FROM
					tbl_usuario
				WHERE 
					cuenta_usuario = ?
			`, [ nombreCuenta ], (tx, results) => {
				resolve(results);
			})
		}, err => reject(err) )
	})
	.then( results => {
		return Object.keys(results.rows)
			.map( key => results.rows[key] )
	})
}

const updateManzanaByCvgeo = (cvegeo, valor) => {
	return new Promise( (resolve, reject) => {
		db.transaction( tx => {
			tx.executeSql(`
				UPDATE 
					carga
				SET
					mi_estado = ?
				WHERE 
					CVEGEO = ?
			`, [ valor, cvegeo ], (tx, results) => {
				resolve(results);
			})
		}, err => reject(err) )
	})
}

const selectFrentesUser = (cveoper, cvegeo) => {
	return new Promise( (resolve, reject) => {
		db.transaction( tx => {
			tx.executeSql(`
				SELECT 
					*
				FROM
					frente
				WHERE 
					CVE_OPER_ENT = ?
				AND
					CVEGEO = ?
			`, [ cveoper, cvegeo ], (tx, results) => {
				resolve(results);
			})
		}, err => reject(err) )
	})
	.then( results => {
		return Object.keys(results.rows)
			.map( key => results.rows[key] )
	})
}

const getRandomCveoper = () => {
	return new Promise( (resolve, reject) => {
		db.transaction( tx => {
			tx.executeSql(`
				SELECT 
					distinct(CVE_OPER_ENT)
				FROM
					carga
			`, [], (tx, results) => {
				const index =Math.floor(Math.random() * results.rows.length); 
				resolve(results.rows[ index ].CVE_OPER_ENT) 
			})
		}, err => reject(err) )
	})
}

// UNIX
const selectUnixValue = tableName => {
	const uniqueName = tableName.split('_')[1]; 
	// console.log(uniqueName)
	return new Promise( (resolve, reject) => {
		db.transaction( tx => {
			tx.executeSql(`
				SELECT 
					MAX(update_${uniqueName}) unix_value
				FROM
					${tableName}
			`, [], (tx, results) => {
				const unix = results.rows[0].unix_value === null ? 0 : results.rows[0].unix_value; 
				const jsonResponse = {
					table: tableName,
					unix: unix,
					column: uniqueName,
				};
				resolve(jsonResponse)
			})
		}, err => reject(err) )
	})
}
// UNIX

// CLIENTE SELECT TABLES IDES
const selectValueByIdColumn = json => {
	const {id, table, valIdes} = json;
	// console.log(`SELECT ${id} idValue FROM	${table} WHERE ${id} IN (${valIdes})`)
	return new Promise( (resolve, reject) => {
		db.transaction( tx => {
			tx.executeSql(`
				SELECT 
					${id} idValue
				FROM
					${table}
				WHERE ${id} IN (${valIdes})
			`, [], (tx, results) => {
				// console
				const resultado = Object.keys(results.rows).map(function (key) { return results.rows[key]; });
				resolve(resultado)
			})
		}, err => reject(err) )
	})
}

const updateAllColumnsData = (json, tableName, nameColumn) => {
	console.log(json)
	console.log(tableName)
	console.log(nameColumn)
	const keys = Object.keys(json).filter(key => key !== nameColumn );
	const columnsValues = keys.map( columnName => {
		return `${columnName}='${json[columnName]}'`
	})
	let cols = columnsValues.toString().replace(/,/g, ' AND ');
	// cols.replace(',', ' AND ')
	// console.log(cols)
	console.log(`UPDATE ${tableName} SET ${cols} WHERE ${nameColumn}=? (${json[nameColumn]})` )
	// console.log(`UPDATE ${tableName} SET idValue FROM	${table} WHERE ${id} IN (${valIdes})`)
	return new Promise( (resolve, reject) => {

		db.transaction( tx => {
			tx.executeSql(`
				UPDATE 
					${tableName} 
				SET 
					${cols} 
				WHERE 
					${nameColumn}=?;
			`, [ json[nameColumn] ], (tx, results) => {
				// console
				const resultado = Object.keys(results.rows).map(function (key) { return results.rows[key]; });
				resolve(resultado)
			})
		}, err => reject(err) )
	// resolve()
	})
}

const insertGroupRows = (json, tableName, nameColumn) => {
	console.warn(json)
	// console.log(tableName)
	// console.log(nameColumn)
	const cantidad = json.length;
	if(cantidad > 0){
		const keys = Object.keys(json[0])
		// console.log(keys);
		let query = `INSERT INTO ${tableName} (${keys.toString()}) VALUES \n`;
		let comma = ',';
		let counter = 1;
		let cantKeys = keys.length;

		json.map(item => {
			let counterKeys = 1;
			let comaKeys = ',';
			query += '('
			keys.map( key => {
				if(counterKeys === cantKeys){
					comaKeys='';
				}
				counterKeys === cantKeys ? comaKeys = '' : comaKeys;
				query += `'${item[key]}'${comaKeys}`
				counterKeys++;
			})
			counter === cantidad ? query += ');\n' : query += '),\n'
			counter++;
		})

		return new Promise( (resolve, reject) => {
			db.transaction( tx => {
				tx.executeSql(query)
			}, err => reject(err), () => resolve(cantidad) )
		})
		.then( (rowsInserted) => {
			console.log('tabla: %s, status: Termino de insertar datos: %s registro%s', tableName, rowsInserted, rowsInserted > 1? 's' : '')

		})
	}
}
// CLIENTE SELECT TABLES IDES




export { 
	selectUnixValue,
	selectValueByIdColumn,
	updateAllColumnsData,
	insertGroupRows,
	loadTables, db, select, selectUserByCuenta, updateManzanaByCvgeo, selectFrentesUser, getRandomCveoper }



