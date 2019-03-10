import React, { useState, useEffect } from 'react';
import AdminRow from './AdminRow';
import AdminFirstRow from './AdminFirstRow';
import db from './Firestore';
import '../styles/Admin.css';


function Admin(props) {

	const [items, setItems] = useState([]);

	useEffect(() => {
	  	db.collection("items").get().then((querySnapshot) => {
		    setItems(querySnapshot.docs.map(item => 
		    	({id: item.id, name: item.data().name, price: item.data().price})
		    ));
		});
	}, []);
	
	function handleDelete (itemID) {
	    setItems(items.filter(item => item.id != itemID));
	    db.collection("items").doc(itemID).delete();
	}

	return (
		<div>
	      <div className='AdminContent'>
		      <table className='AdminTable'>
			      <thead>
			      	<tr>
			      		<th>Name</th>
			      		<th>Price</th>
			      		<th>Change</th>
			      	</tr>
		      	  </thead>
			      <tbody>
			      	<AdminFirstRow items={items} setItems={setItems} />
		      		{ items.map(item => 
		      			<AdminRow key={item.id} id={item.id} name={item.name} price={item.price} handleDelete={handleDelete}/>
		      		) }
		      	  </tbody>
		      </table>
	      </div>
		</div>
	);
}

export default Admin;