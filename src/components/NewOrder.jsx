// src/components/NewOrder.js
import '../pdfWorker';
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import '../styles/NewOrder.css';

const NewOrder = () => {
  const [files, setFiles] = useState([]);
  const [numPagesList, setNumPagesList] = useState({});
  const [printType, setPrintType] = useState('Colored');
  const [copies, setCopies] = useState(1);
  const [sides, setSides] = useState('One-sided');
  const [pagesToPrint, setPagesToPrint] = useState('ALL');
  const [showSummary, setShowSummary] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).filter(file => file.type === 'application/pdf');
    if (selectedFiles.length === 0) {
      alert('Please upload only valid PDF files.');
      return;
    }
    setFiles(selectedFiles);
    setNumPagesList({}); // reset page counts
  };

  const onDocumentLoadSuccess = (fileName, { numPages }) => {
    setNumPagesList(prev => ({ ...prev, [fileName]: numPages }));
  };

  const estimateDelivery = () => {
    const totalPages = Object.values(numPagesList).reduce((a, b) => a + b, 0);
    if (totalPages > 100) return 'Tomorrow';
    else if (totalPages > 30) return 'Today Evening';
    return 'Within 2 hours';
  };

  const calculateCost = () => {
    const totalPages = Object.values(numPagesList).reduce((a, b) => a + b, 0);
    const perPage = printType === 'Colored' ? 5 : 1;
    return totalPages * perPage * copies;
  };

  const handleConfirmOrder = () => {
    const newOrder = {
      files: files.map(f => f.name),
      copies,
      printType,
      sides,
      pagesToPrint,
      date: new Date().toLocaleString(),
      delivery: estimateDelivery(),
      cost: calculateCost(),
    };

    const prevOrders = JSON.parse(localStorage.getItem('simOrders') || '[]');
    prevOrders.push(newOrder);
    localStorage.setItem('simOrders', JSON.stringify(prevOrders));
    alert('Order placed successfully!');
    setFiles([]);
    setShowSummary(false);
  };

  return (
    <div className="new-order-container">
      {/* Left: Print Settings */}
      <div className="left-settings">
        <h3>Upload PDFs</h3>
        <input type="file" accept="application/pdf" multiple onChange={handleFileChange} />

        <h3>Print Settings</h3>

        <label>Print Type:</label>
        <select value={printType} onChange={e => setPrintType(e.target.value)}>
          <option>Colored</option>
          <option>Black & White</option>
        </select>

        <label>Number of Copies:</label>
        <input
          type="number"
          min="1"
          value={copies}
          onChange={(e) => setCopies(parseInt(e.target.value))}
        />

        <label>Pages to Print:</label>
        <input
          type="text"
          placeholder="ALL (e.g. 1-3, 5, 8)"
          value={pagesToPrint}
          onChange={(e) => setPagesToPrint(e.target.value)}
        />

        <label>Sides:</label>
        <select value={sides} onChange={e => setSides(e.target.value)}>
          <option>One-sided</option>
          <option>Both-sided</option>
        </select>

        <div style={{ marginTop: '20px' }}>
          <strong>Estimated Delivery:</strong> {estimateDelivery()}
        </div>

        <div>
          <strong>Total Cost:</strong> ₹{calculateCost()}
        </div>

        <button style={{ marginTop: '15px' }} onClick={() => setShowSummary(true)}>
          Confirm Order
        </button>
      </div>

      {/* Right: PDF Preview */}
      <div className="right-preview">
        {files.length > 0 ? (
          files.map((file, idx) => (
            <div key={idx} style={{ marginBottom: '20px' }}>
              <strong>{file.name}</strong>
              <Document
                file={file}
                onLoadSuccess={(doc) => onDocumentLoadSuccess(file.name, doc)}
              >
                {Array.from(new Array(numPagesList[file.name] || 0), (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                  />
                ))}
              </Document>
            </div>
          ))
        ) : (
          <div className="pdf-placeholder">PDF Preview will appear here</div>
        )}
      </div>

      {/* Order Summary Modal (Fake inline) */}
      {showSummary && (
        <div className="overlay-confirm">
          <div className="summary-modal">
            <h3>Confirm Your Order</h3>
            <ul>
              {files.map((f, i) => (
                <li key={i}>{f.name}</li>
              ))}
            </ul>
            <p><strong>Copies:</strong> {copies}</p>
            <p><strong>Print Type:</strong> {printType}</p>
            <p><strong>Sides:</strong> {sides}</p>
            <p><strong>Pages to Print:</strong> {pagesToPrint || 'All'}</p>
            <p><strong>Estimated Delivery:</strong> {estimateDelivery()}</p>
            <p><strong>Total Cost:</strong> ₹{calculateCost()}</p>

            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button onClick={handleConfirmOrder}>Place Order</button>
              <button onClick={() => setShowSummary(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewOrder;
