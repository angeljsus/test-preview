import { useContext, useEffect } from 'react';
import Context from './../Context/Context';

const Home = () => {
	const { } = useContext(Context);

	useEffect( () => {
		// console.log(variable)
	}, [])

	return <>
		<div>
			Home
		</div>
	</>;
}

export default Home;