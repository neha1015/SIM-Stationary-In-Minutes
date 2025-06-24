// src/components/History.js

import React, { useEffect, useState } from 'react';

const History = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('simOrders') || '[]');
    setOrders(stored);
  }, []);

  return (
    <div>
      <h3>Your Order History</h3>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <strong>{order.fileName}</strong><br />
              {order.pages} pages - {order.type === 'bw' ? 'B&W' : 'Color'}<br />
              <small>Ordered on: {order.date}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
