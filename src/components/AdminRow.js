import React from 'react';
import '../styles/AdminRow.css';

function AdminRow(props) {
      const disabledClass = props.disabled ? 'disabled' : '';
      const disabledText = props.disabled ? 'Enable' : 'Disable';
	return (
		<tr className={disabledClass}>
      		<td>{props.name}</td>
      		<td>{props.price}</td>
      		<td>
      			<button className='editCell' onClick={() => props.handleDisable(props.id)}>{disabledText}</button>
      			<button className='editCell' onClick={() => props.handleDelete(props.id)}>Delete</button>
      		</td>
      		
      	</tr>
	);
}

export default AdminRow;