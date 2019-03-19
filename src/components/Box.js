import React from 'react';
import '../styles/Box.css';

function Box(props) {
	return (
		<div className='Box'> 
			<div className='boxText'>{props.name}</div>
			<button className='BoxButton' onClick={() => props.handleClick(props.id, 'completed')}> Complete </button>
			<button className='BoxButton' onClick={() => props.handleClick(props.id, 'cancelled')}> Cancel </button>
		</div>
	);
}

export default Box;