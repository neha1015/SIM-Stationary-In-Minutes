import '../pdfWorker';
import React, { useState, useRef } from 'react';
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
  const [activePages, setActivePages] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [savedOrders, setSavedOrders] = useState([]);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).filter(file => file.type === 'application/pdf');
    if (selectedFiles.length === 0) {
      alert('Please upload only valid PDF files.');
      return;
    }
    setFiles(selectedFiles);
    setNumPagesList({});
  };

  const onDocumentLoadSuccess = (fileName, { numPages }) => {
    setNumPagesList(prev => ({ ...prev, [fileName]: numPages }));
  };

  const calculateFileCost = (pageCount, copies, type) => {
    const perPage = type === 'Colored' ? 10 : 2;
    return pageCount * perPage * copies;
  };

  const calculateCost = () => {
    const totalPages = Object.values(numPagesList).reduce((a, b) => a + b, 0);
    return calculateFileCost(totalPages, copies, printType);
  };

  const getTotalCost = () => {
    const savedCost = savedOrders.reduce((acc, order) => acc + order.cost, 0);
    const currentCost = calculateCost();
    return savedCost + currentCost;
  };

  const handleAddAnother = () => {
    if (files.length === 0) {
      alert("Please upload a file before adding.");
      return;
    }

    const saved = {
      files,
      copies,
      printType,
      sides,
      pagesToPrint,
      cost: calculateCost()
    };

    setSavedOrders(prev => [...prev, saved]);
    setFiles([]);
    setNumPagesList({});
    fileInputRef.current.value = null;

    setCopies(1);
    setPrintType('Colored');
    setSides('One-sided');
    setPagesToPrint('ALL');
  };

  const handleRemoveSaved = (index) => {
    setSavedOrders(prev => prev.filter((_, i) => i !== index));
  };

  const handleConfirmOrder = () => {
    if (files.length === 0 && savedOrders.length === 0) {
      alert("Please upload at least one file to confirm your order.");
      return;
    }

    const finalOrder = {
      files: [...savedOrders, {
        files,
        copies,
        printType,
        sides,
        pagesToPrint,
        cost: calculateCost()
      }],
      date: new Date().toLocaleString()
    };

    const prevOrders = JSON.parse(localStorage.getItem('simOrders') || '[]');
    prevOrders.push(finalOrder);
    localStorage.setItem('simOrders', JSON.stringify(prevOrders));

    setShowSummary(false);
    setFiles([]);
    setNumPagesList({});
    setSavedOrders([]);
    fileInputRef.current.value = null;
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 3000);
  };

  return (
    <div className="new-order-container">
      <div className="left-settings">
        <h3>Upload PDFs</h3>
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleFileChange}
          ref={fileInputRef}
        />

        <h3>Print Settings</h3>
        <label>Print Type:</label>
        <select value={printType} onChange={e => setPrintType(e.target.value)}>
          <option>Colored</option>
          <option>Black & White</option>
        </select>

        <label>Number of Copies:</label>
        <input type="number" min="1" value={copies} onChange={e => setCopies(parseInt(e.target.value))} />

        <label>Pages to Print:</label>
        <input type="text" placeholder="ALL (e.g. 1-3, 5, 8)" value={pagesToPrint} onChange={e => setPagesToPrint(e.target.value)} />

        <label>Sides:</label>
        <select value={sides} onChange={e => setSides(e.target.value)}>
          <option>One-sided</option>
          <option>Both-sided</option>
        </select>

        <div style={{ marginTop: '12px', display: 'flex', gap: '10px' }}>
          <button className="add-another-btn" onClick={handleAddAnother}>
            + Add Another File
          </button>
          <button className="confirm-btn" onClick={() => setShowSummary(true)}>
            Confirm Order
          </button>
        </div>

        {savedOrders.length > 0 && (
          <div className="saved-files" style={{ marginTop: '20px' }}>
            <h4>Saved Files:</h4>
            <ul>
              {savedOrders.map((entry, idx) => (
                <li key={idx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '6px 10px',
                  background: '#fff',
                  borderRadius: '6px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  marginBottom: '8px'
                }}>
                  <div style={{ flex: 1 }}>
                    {entry.files.map((f, i) => (
                      <span key={i}>📄 {f.name}{i < entry.files.length - 1 ? ', ' : ''}</span>
                    ))}
                    &nbsp;| {entry.printType} | {entry.copies} copies | ₹{entry.cost}
                  </div>
                  <span
                    onClick={() => handleRemoveSaved(idx)}
                    style={{
                      cursor: 'pointer',
                      color: 'red',
                      marginLeft: '15px',
                      padding: '4px',
                      borderRadius: '4px',
                      transition: 'background-color 0.2s ease'
                    }}
                    title="Remove File"
                    onMouseEnter={e => e.target.style.backgroundColor = '#ffe6e6'}
                    onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
                  >
                    🗑️
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ marginTop: '12px' }}>
          <strong>Current File Cost:</strong> ₹{calculateCost()}
        </div>
        <div style={{ marginTop: '8px' }}>
          <strong>Grand Total Cost:</strong> ₹{getTotalCost()}
        </div>
      </div>

      <div className="right-preview">
  {files.length > 0 ? (
    files.map((file, idx) => (
      <div key={idx} style={{ marginBottom: '20px' }}>
        <strong>{file.name}</strong>
        <div
          style={{ maxHeight: '500px', overflowY: 'auto', border: '1px solid #ccc', padding: '8px' }}
          onScroll={(e) => {
            const container = e.target;
            const pageHeight = container.scrollHeight / (numPagesList[file.name] || 1);
            const currentPage = Math.min(
              Math.ceil((container.scrollTop + container.clientHeight / 2) / pageHeight),
              numPagesList[file.name] || 1
            );
            setActivePages(prev => ({ ...prev, [file.name]: currentPage }));
          }}
        >
          <Document file={file} onLoadSuccess={(doc) => onDocumentLoadSuccess(file.name, doc)}>
            {Array.from(new Array(numPagesList[file.name] || 0), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} renderAnnotationLayer={false} renderTextLayer={false} />
            ))}
          </Document>
        </div>
        {numPagesList[file.name] && (
          <div style={{ marginTop: '5px', textAlign: 'center', color: '#555' }}>
            Page {activePages[file.name] || 1} of {numPagesList[file.name]}
          </div>
        )}
      </div>
    ))
  ) : (
    <div className="pdf-placeholder">PDF Preview will appear here</div>
  )}
</div>


      {showSummary && (
        <div className="overlay-confirm">
          <div className="summary-modal">
            <h3 className="modal-heading">Confirm Your Order</h3>
            <ul>
              {[...savedOrders, { files, copies, printType, cost: calculateCost() }].flat().map((entry, i) => (
                <li key={i}>
                  {entry.files.map((f, j) => (
                    <span key={j}>📄 {f.name}{j < entry.files.length - 1 ? ', ' : ''}</span>
                  ))}
                  &nbsp;| {entry.printType} | {entry.copies} copies | ₹{entry.cost}
                </li>
              ))}
            </ul>
            <h4 style={{ marginTop: '15px' }}>Total Payable Amount: ₹{getTotalCost()}</h4>

            <div className="modal-buttons">
              <button className="confirm-btn" onClick={handleConfirmOrder}>Proceed to Pay</button>
              <button className="cancel-btn" onClick={() => setShowSummary(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

       {orderPlaced && (
        <div className="success-overlay">
          <div className="success-message">🎉 Order Placed Successfully!</div>
        </div>
      )} 
    </div>
  );
};

export default NewOrder;
