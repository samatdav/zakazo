import React from 'react';
import '../styles/Header.css'
import { Link } from "react-router-dom";

function HeaderButton(props) {
	return (
		
			<Link to={props.to}>
			<button className='HeaderButton'>{props.text}</button>
			</Link>
	);
}

function Header(props) {
	return (
		<div className='Header'>
			{props.children
				?
				props.children
				:
				<div>
			      <HeaderButton to='/main' text='Main'/>
			      <HeaderButton to='/admin' text='Admin Panel'/>
			      <HeaderButton to='/login' text='Login'/>
			      <a href='hi.html'><button className='HeaderButton'>Landing</button></a>
			    </div>
			}
		</div>
	);
}

Header.Button = HeaderButton;
export default Header;