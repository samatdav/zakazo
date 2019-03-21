import React, { useState, useEffect } from 'react';
import AdminRow from './AdminRow';
import '../styles/AdminCategory.css';

function AdminCategory(props) {
  const categoryRef = props.categoryRef;
  const categoryItemsRef = categoryRef.collection("items")
  const [categoryName, setCategoryName] = useState('');
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [categoryItems, setCategoryItems] = useState([]);
  const [addCategoryItemDisplay, setAddCategoryItemDisplay] = useState(false);

  const plusSVG = <svg xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
  const minusSVG = <svg xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"/></svg>

  categoryRef.get().then(querySnapshot => {
        setCategoryName(querySnapshot.data().name);
  });

  useEffect(() => {
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
      setItemName('')
      setItemPrice('')
      // setAddCategoryItemDisplay(!addCategoryItemDisplay)
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

return (
        <div className='AdminTile'>
            <div className='categoryHeader'>
              <div className='categoryName'>{categoryName}</div>
              <div className='addCategoryItemButton' onClick={() => setAddCategoryItemDisplay(!addCategoryItemDisplay)}>
                    {addCategoryItemDisplay ? minusSVG : plusSVG} 
              </div>
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