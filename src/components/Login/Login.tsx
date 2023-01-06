import { useRef, useEffect } from 'react';
import XMLParser from 'react-xml-parser';
import { selectUserLogin, selectUserByCuenta } from './../../logic/database';


const Login = () => {
	const inpName = useRef(null);
	const inpPass = useRef(null);
	const message = useRef(null);

	const validarUsuario = (userName, password) => {
		message.current.innerHTML = 'Pending...';
		const ldapSite = 'https://intranet.wapp2.inegi.gob.mx/sistemas/informaticos/ws/v2/ldap.asmx';
		const claveApp = 'DGES_NodeJs_GenContCap';

		const name = userName.current.value;  
		const pass =password.current.value

		return new Promise( (resolve, reject) => {
			// validar campos vacios
			name && pass ? 
			resolve(navigator.onLine) : 
			reject('Los campos NO deben estar vacios');
		})
		.then( connection =>
			connection ?
			obtenerAutenticacion(name, pass, ldapSite, claveApp) :
			obtenerAutenticacionLocal(name, pass)
		)
		.then( stat => message.current.innerHTML = stat.message)
		.catch( err => message.current.innerHTML = err )
	}

	const obtenerAutenticacion = (userName, password, ldap, clave) => {
	let params = `loginUsr=${userName}&passUsr=${password}&claveAplicacion=${clave}`;
	let urlAuth = `${ldap}/Autenticar?${params}`; 
	let respuesta =  {	message: '', 	autenticado: false };

	return fetch(urlAuth, {
  	method: 'GET',
  	headers:{
    	'Content-Type': 'application/x-www-form-urlencoded'
  	}
	})
 .then( response => 
 	response.status == 404 ?  
 		// no encontro la ldap, o fue inaccesible... realiza autenticación vía base datos local
 		// resuelve en catch para manejo del error => ERR_NAME_NOT_RESOLVED
 	Promise.reject({ error: '' }) :
 	// espera y retorna el resultado
 	response.text()
 )
 .then(response => 
 	// si no se logró conectar al servidor regresa el booleano de lo contrario un texto xml
 	typeof response === 'boolean' ? 
 	response :
 	//  en caso de recibir el texto xml lo convierte en json
 	new XMLParser().parseFromString(response)
 )
 .then( response => {
 	if(typeof response === 'boolean'){
 		return;
 	}
 	if(response.value.toLowerCase() === 'true'){
 		return existeCuenta(userName);
 		// return {status:true, message:'Acceso otorgado (LDAP)'};
 	} else {
 		return {status:false, message: 'Usuario y/o contraseña erronea (LDAP)'};
 	}
 })
 .catch(err => {
 	// Si un tipo de error diferente a los que puedo escuchar, ejemplo: ERR_NAME_NOT_RESOLVED  
 	if( !err.error ){
 		// mandalo a la autenticación local
 		return obtenerAutenticacionLocal(userName, password)
 	} 
 	// rechaza la petición
 	return Promise.reject(err)
 })
}

const existeCuenta = cuentaUsuario => {
	return selectUserByCuenta(cuentaUsuario)
	.then( result => {
		if(result.length > 0){
 		return {status:false, message: 'Acceso concedido (LDAP + Local)'};
		}
 	return {status:false, message:'Acceso denegado, no tienes permisos para acceder'};
	})
} 

const obtenerAutenticacionLocal = (userName, password) => {
	const { encriptarSHA256 } = apiFunctions; 
	const encriptedPasswor = encriptarSHA256(password); 
	// console.log(encriptedPasswor)
	return selectUserByCuenta(userName)
	.then( result => {
		const cantidad = result.length;
		if(cantidad > 0){
			const { password_usuario } = result[0];
			let respuesta = 'Acceso otorgado (Local)';
			encriptedPasswor === password_usuario ? respuesta : respuesta = 'Usuario y/o contraseña incorrecta (Local)'; 
			return {status:true, message: respuesta}
		}
		return {status:false, message: 'El usuario no se encuentra registrado'}
	})
}

	return <>
		<input ref={ inpName } type="text" placeholder="Cuenta Institucional"/>
		<input ref={ inpPass } type="password" placeholder="Contraseña" />
		<button onClick={ () => validarUsuario(inpName, inpPass) } >Acceder</button>
		<div ref={ message }></div>
	</>
}

export default Login;