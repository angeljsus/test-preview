
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

			tx.executeSql(`
				CREATE TABLE IF NOT EXISTS tbl_usuario (
					cveoper_usuario VARCHAR(10),
					cuenta_usuario VARCHAR(50),
					nombre_usuario VARCHAR(50),
					paterno_usuario VARCHAR(50),
					materno_usuario VARCHAR(50),
					password_usuario VARCHAR(50),
					nivel_usuario int,
					PRIMARY KEY (cveoper_usuario)
				);
			`)

			tx.executeSql(`
				CREATE TABLE IF NOT EXISTS usuario(
					id_usuario integer primary key,
					cuenta_usuario varchar(199),
					nombre_usuario varchar(200),
					password_usuario varchar(100)
				);
			`)
			// insert into usuario values ('000000001','angel.trujillo','Ángel de Jesús','Aguilar','Trujillo','${@Code[]1820}', 1);

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



export { loadTables, db, select, selectUserByCuenta, updateManzanaByCvgeo, selectFrentesUser, getRandomCveoper }



