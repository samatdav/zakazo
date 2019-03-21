import React, { useState, useEffect } from 'react';
import AdminCategory from './AdminCategory';
import firebase from './Firebase';
import '../styles/Admin.css';

function Admin(props) {
	const userUID = firebase.auth().currentUser.uid;
	const barRef = firebase.db.collection("Bars").doc(userUID);
	const barCategories = barRef.collection("categories");

	const [categories, setCategories] = useState([]);
	const [barName, setBarName] = useState('');
	const [categoryName, setCategoryName] = useState('');
	const [addCategoryDisplay, setAddCategoryDisplay] = useState(false);

	useEffect(() => {
		barRef.get().then(querySnapshot => {
			setBarName(querySnapshot.data().name);
		});

		barCategories.get().then(querySnapshot => {
		    setCategories(querySnapshot.docs.map(query => query.id));
		});
	}, []);

	function handleCategorySave() {
      if (categoryName) {
        barCategories.add({
          name: categoryName,
        })
        .then(function(category) {
        	setCategories([category.id].concat(categories));
        })
        setCategoryName('');
        setAddCategoryDisplay(!addCategoryDisplay)
      }
  }

	const plusSVG = <svg xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
	const minusSVG = <svg xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"/></svg>

	return (
		<div>
	      <div className='AdminContent'>
	      	  <div className='barHeader'>
	      	  	<div className='barName'>{barName}</div>
	      	  	<div className='addCategoryButton' onClick={() => setAddCategoryDisplay(!addCategoryDisplay)}>
	      	  		{addCategoryDisplay ? minusSVG : plusSVG}	
	      	  	</div>
	      	  </div>

	      	  <div className='AdminTile' style={{display: addCategoryDisplay ? 'block' : 'none'}}>
	      	  	<div className='newCategoryTile'>
	      	  		<input
			          value={categoryName}
			          onChange={e => setCategoryName(e.target.value)}
			          className='addCategoryInput'
			          placeholder="Category Name"
			          type="text"
			          name="itemName"
			          required
			        />
			        <button className='editCell saveCategoryButton' onClick={handleCategorySave}>Save</button>
	      	  	</div>
	      	  </div>

	      	  {
	      	  	categories.map(categoryID => <AdminCategory key={categoryID} categoryRef={firebase.db.collection("Bars").doc(userUID).collection("categories").doc(categoryID)}/>)
	      	  }

	      </div>
		</div>
	);
}

export default Admin;