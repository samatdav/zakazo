import React, { useState, useEffect } from 'react';
import '../styles/Main.css';
import Box from './Box'
import db from './Firestore';

function Main() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
      db.collection("orders").get().then((querySnapshot) => {
        setOrders(querySnapshot.docs.map(order => 
          ({id: order.id, name: order.data().name, status: order.data().status})
        ));
    });
  }, []);

  
  function handleClick (orderID, newStatus) {
    const orderRef = db.collection("orders").doc(orderID);

    orderRef.get().then(function(order) {
      const orderData = order.data();
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
    <div className="Main">
    { 
      orders.filter(order => order.status === 'new').map(order => 
        <Box key={order.id} id={order.id} name={order.name} handleClick={handleClick}/>
      )
    }
    </div>
  );
}

export default Main;
