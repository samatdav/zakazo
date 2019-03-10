import React from 'react';
import '../styles/AdminRow.css';

function AdminRow(props) {

	return (
		<tr>
      		<td>{props.name}</td>
      		<td>{props.price}</td>
      		<td>
      			<button className='editCell' onClick={() => alert('Disabled')}>Disable</button>
      			<button className='editCell' onClick={() => props.handleDelete(props.id)}>Delete</button>
      		</td>
      		
      	</tr>
	);
}

export default AdminRow;