import React from 'react';
import '../styles/Login.css';

function Login(props) {
	return (
		<div className='LoginWrapper'>
			<div className='LoginHeader'>Login</div>
			<div className='LoginInputs'>
				<input className='LoginInput' placeholder='Username'/>
				<input className='LoginInput' placeholder='Password'/>
			</div>
			<div className='LoginButtons'>
				<button className='LoginButton'>Login</button>
			</div>
		</div>
	);
}

export default Login;