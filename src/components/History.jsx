import React, { useEffect, useState } from 'react';
import '../styles/History.css';

const History = () => {
  const [orders, setOrders] = useState([]);
  const [sortOrder, setSortOrder] = useState('recent'); 

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('simOrders') || '[]');
    setOrders(stored);
  }, []);

  const sortedOrders = [...orders].sort((a, b) => {
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();
    return sortOrder === 'recent' ? timeB - timeA : timeA - timeB;
  });

  return (
    <div className="history-container">
      <div className="history-header">
        <h2 className="history-title">Your Order History</h2>

        {orders.length > 0 && (
          <div className="sort-dropdown">
            <label>Sort By:</label>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="recent">Recent</option>
              <option value="older">Older</option>
            </select>
          </div>
        )}
      </div>

      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <div className="orders-list">
          {sortedOrders.map((order, index) => (
            <div key={index} className="order-card">
              <h3>Order #{index + 1}</h3>
              <p><strong>Date:</strong> {order.date}</p>

              {order.files.map((fileSet, idx) => (
                <div key={idx} className="file-details">
                  {fileSet.files?.map((f, i) => (
                    <p key={i}>📄 {f.name}</p>
                  ))}
                  <p>Print Type: {fileSet.printType}</p>
                  <p>Copies: {fileSet.copies}</p>
                  <p>Sides: {fileSet.sides}</p>
                  <p>Cost: ₹{fileSet.cost}</p>
                  <hr />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
