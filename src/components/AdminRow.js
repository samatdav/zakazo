import React from 'react';
import '../styles/AdminRow.css';

function AdminRow(props) {
      const disabledClass = props.disabled ? 'disabled' : '';
      const disabledText = props.disabled ? 'Enable' : 'Disable';
	return (
		<div className={'AdminRow ' + disabledClass}>
      		<div className='nameCell'>{props.name}</div>
      		<div className='priceCell'>{props.price}</div>
      		<div className='buttonsCell'>
      			<button className='editCell' onClick={() => props.handleDisable(props.id)}>{disabledText}</button>
      			<button className='editCell' onClick={() => props.handleDelete(props.id)}>Delete</button>
      		</div>
      		
      	</div>
	);
}

export default AdminRow;