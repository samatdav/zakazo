import React from 'react';
import '../styles/Header.css'
import { Link } from "react-router-dom";
import firebase from './Firebase';

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
				  <div className='HeaderLeft'>
				      <HeaderButton to='/orders' text='Orders'/>
				      <HeaderButton to='/admin' text='Admin Panel'/>
			      	  {/* <a href='hi.html'><button className='HeaderButton'>Landing</button></a> */}
				  </div>
				  <div className='HeaderRight'>
				      <p className='signOut' onClick={() => firebase.auth().signOut()}>Sign Out</p>
				  </div>
			    </div>
			}
		</div>
	);
}

Header.Button = HeaderButton;
export default Header;