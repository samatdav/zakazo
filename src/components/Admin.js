import React, { useState, useEffect } from 'react';
import AdminRow from './AdminRow';
import AdminFirstRow from './AdminFirstRow';
import firebase from './Firebase';
import '../styles/Admin.css';


function Admin(props) {

	const [items, setItems] = useState([]);

	useEffect(() => {
	  	firebase.db.collection("items").get().then((querySnapshot) => {
		    setItems(querySnapshot.docs.map(item => 
		    	({id: item.id, name: item.data().name, price: item.data().price, disabled: item.data().disabled})
		    ));
		});
	}, []);
	
	function handleDelete (itemID) {
	    setItems(items.filter(item => item.id !== itemID));
	    firebase.db.collection("items").doc(itemID).delete();
	}

	function handleDisable (itemID) {
	    const itemRef = firebase.db.collection("items").doc(itemID);

	    itemRef.get().then(function(item) {
	    	const itemData = item.data();
	    	setItems(items.map(item => 
	    		{
		    		if (item.id === itemID) item.disabled = !item.disabled;
		    		return item;
	    		}
	    	));
	    	itemRef.update({
		    	disabled: !itemData.disabled,
		    });
	    });
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
		      		{ 
		      			items.map(item => 
			      			<AdminRow 
				      			key={item.id} 
				      			id={item.id} 
				      			name={item.name} 
				      			price={item.price} 
				      			disabled={item.disabled}
				      			handleDelete={handleDelete} 
				      			handleDisable={handleDisable}
			      			/>
		      			) 
		      		}
		      	  </tbody>
		      </table>
	      </div>
		</div>
	);
}

export default Admin;