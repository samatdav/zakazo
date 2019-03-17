import React from 'react';
import '../styles/Box.css';

function Box(props) {
	return (
		<div className='Box'> 
			<div className='boxText'>{props.name}</div>
			<button className='BoxButton'> Complete </button>
			<button className='BoxButton'> Cancel </button>
		</div>
	);
}

export default Box;