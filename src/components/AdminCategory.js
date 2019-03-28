import React, { useState, useEffect } from 'react';
import AdminRow from './AdminRow';
import '../styles/AdminCategory.css';

function AdminCategory(props) {
  const categoryID = props.categoryID;
  const barCategories = props.barCategories;
  const categoryRef = props.categoryRef;
  const categoryItemsRef = categoryRef.collection("items")
  const [categoryName, setCategoryName] = useState('');
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [categoryItems, setCategoryItems] = useState([]);
  const [addCategoryItemDisplay, setAddCategoryItemDisplay] = useState(false);
  const [categoryEdit, setCategoryEdit] = useState(false);
  const [hideCategoryClass, setHideCategoryClass] = useState('block');

  const plusSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fillRule="evenodd" clipRule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
  const minusSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fillRule="evenodd" clipRule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"/></svg>
  const editSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 528.899 528.899">  <path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981 c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611 C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069 L27.473,390.597L0.3,512.69z"/></svg>

  useEffect(() => {

    categoryRef.get().then(querySnapshot => {
      setCategoryName(querySnapshot.data().name);
    });

    categoryItemsRef.get().then(querySnapshot => {
      setCategoryItems(querySnapshot.docs.map(item => 
        ({id: item.id, name: item.data().name, price: item.data().price, disabled: item.data().disabled})
      ));
    });

  }, []);

  function handleItemSave() {
    if (itemName && itemPrice && !isNaN(itemPrice)) {
      categoryItemsRef.add({
        name: itemName,
        price: parseFloat(itemPrice),
        disabled: false,
      })
      .then(function(item) {
        setCategoryItems([{id: item.id, name: itemName, price: parseFloat(itemPrice)}].concat(categoryItems));
      })
      .catch(function(error) {
          console.log('error:', error);
      })
      setItemName('');
      setItemPrice('');
    }
  }


  function handleDelete (itemID) {
      setCategoryItems(categoryItems.filter(item => item.id !== itemID));
      categoryItemsRef.doc(itemID).delete();
  }

  function handleDisable (itemID) {
    const itemRef = categoryItemsRef.doc(itemID);

    itemRef.get().then(function(item) {
      const itemData = item.data();
      setCategoryItems(categoryItems.map(item => 
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

  function handleCategoryEdit () {
    setCategoryEdit(!categoryEdit);
    categoryRef.update({
      name: categoryName,
    });
  }

  function handleCategoryDelete () {
    setHideCategoryClass('none');
    barCategories.doc(categoryID).delete();
  }

  return (
    <div className='AdminTile' style={{display: hideCategoryClass}}>
      <div className='categoryHeader'>
          {
            !categoryEdit ?
            <div className='categoryNameShown'>
              <div className='categoryName'>{categoryName}</div>
              <div className='categoryEdit' onClick={handleCategoryEdit}>{editSVG}</div>
              <div className='addCategoryItemButton' onClick={() => setAddCategoryItemDisplay(!addCategoryItemDisplay)}>
                {addCategoryItemDisplay ? minusSVG : plusSVG} 
              </div>
            </div>
            :
            <div className='categoryNameEdited'>
              <div className='newCategoryTile'>
                <input
                  value={categoryName}
                  onChange={e => setCategoryName(e.target.value)}
                  className='editCategoryInput'
                  placeholder="Category Name"
                  type="text"
                  name="itemName"
                  required
                />
                <div className='categoryEditButtons'>
                  <button className='editCell editCategoryButton' onClick={handleCategoryEdit}>Save</button>
                  <button className='editCell deleteCategoryButton' onClick={handleCategoryDelete}>Delete Category</button>
                </div>
              </div>
            </div>
          }
      </div>

      <div className='newCategoryItem' style={{display: addCategoryItemDisplay ? 'block' : 'none'}}>
        <input
          value={itemName}
          onChange={e => setItemName(e.target.value)}
          className='addItemInput addItemNameInput'
          placeholder="Item Name"
          type="text"
          name="itemName"
          required
        />
        <input
          value={itemPrice}
          onChange={e => setItemPrice(e.target.value)}
          className='addItemInput addItemPriceInput'
          placeholder="Item Price"
          type="text"
          name="itemPrice"
          required
        />
        <button className='editCell saveCategoryItemButton' onClick={() => handleItemSave()}>Save</button>
       </div>

      { 
        categoryItems.map(item => 
        <AdminRow 
          key={item.id} 
          id={item.id} 
          name={item.name} 
          price={item.price} 
          disabled={item.disabled}
          handleDelete={handleDelete} 
          handleDisable={handleDisable}
        />) 
      }
    </div>
  );
}

export default AdminCategory;