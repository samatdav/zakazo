import React from 'react';
import '../styles/Box.css'
import BoxButton from './BoxButton'

function Box(props) {
	return (
		<div className='Box'> 
			<div className='boxText'>I am order #{props.index}</div>
			<BoxButton text='Complete'/>
			<BoxButton text='Cancel'/>
		</div>
	);
}

export default Box;