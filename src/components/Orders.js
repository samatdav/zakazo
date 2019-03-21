import React, { useState, useEffect } from 'react';
import '../styles/Orders.css';
import Box from './Box'
import firebase from './Firebase';

function Orders() {
  const [orders, setOrders] = useState([]);
  const userUID = firebase.auth().currentUser.uid;
  const barOrders = firebase.db.collection("Bars").doc(userUID).collection("orders");

  useEffect(() => {
      barOrders.get().then((querySnapshot) => {
        setOrders(querySnapshot.docs.map(order => 
          ({id: order.id, name: order.data().name, status: order.data().status})
        ));
    });
  }, []);

  function handleClick (orderID, newStatus) {
    const orderRef = barOrders.doc(orderID);

    orderRef.get().then(function(order) {
      setOrders(orders.map(order => 
        {
          if (order.id === orderID) order.status = newStatus;
          return order;
        }
      ));
      orderRef.update({
        status: newStatus,
      });
    });
  }

  return (
    <div className="Orders">
    { 
      orders.filter(order => order.status === 'new').map(order => 
        <Box key={order.id} id={order.id} name={order.name} handleClick={handleClick}/>
      )
    }
    </div>
  );
}

export default Orders;
