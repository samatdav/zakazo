import React from 'react';
import '../styles/BoxButton.css'

function BoxButton(props) {
	return (
		<button className='BoxButton'> {props.text} </button>
	);
}

export default BoxButton;