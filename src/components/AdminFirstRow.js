import React, { useState } from 'react';
// import '../styles/AdminFirstRow.css';
import db from './Firestore';

function AdminFirstRow(props) {
      const [addNewBool, setAddNew] = useState(true);

      let addRow = <tr className='AdminAddRow'>
                        <td colSpan='3'>
                              <button className='AdminAddButton' onClick={() => setAddNew(!addNewBool)}>Add new</button>
                        </td>
                   </tr>

      function AddItemForm() {
            const [itemName, setItemName] = useState("");
            const [itemPrice, setItemPrice] = useState("");

            function handleCancel() {
                  setAddNew(!addNewBool);
            }

            function handleSave() {
                  if (itemName && itemPrice && !isNaN(itemPrice)) {
                        db.collection("items").add({
                            name: itemName,
                            price: parseFloat(itemPrice),
                            disabled: false,
                        })
                        .then(function(item) {
                              props.setItems([{id: item.id, name: itemName, price: itemPrice}].concat(props.items));
                        })
                        setAddNew(!addNewBool)
                  }
            }

            return (
                  <tr className='AdminAddRow'>
                  <td><input
                    value={itemName}
                    onChange={e => setItemName(e.target.value)}
                    className='AdminAddRowInput'
                    placeholder="Item Name"
                    type="text"
                    name="itemName"
                    required
                  /></td>
                  <td><input
                    value={itemPrice}
                    onChange={e => setItemPrice(e.target.value)}
                    className='AdminAddRowInput'
                    placeholder="Item Price"
                    type="text"
                    name="itemPrice"
                    required
                  /></td>
                        <td>
                              <button className='editCell' onClick={handleSave}>Save</button>
                              <button className='editCell' onClick={handleCancel}>Cancel</button>
                        </td>
                    </tr>
            );
      }

      return addNewBool ? addRow : <AddItemForm/>
}

export default AdminFirstRow;