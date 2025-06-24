// src/components/NewOrder.js
import '../pdfWorker';
import React, { useState } from 'react';
import { Document, Page} from 'react-pdf';
import '../styles/NewOrder.css';


const NewOrder = () => {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please upload a valid PDF file');
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="new-order-container">
      {/* Left: Print Settings */}
      <div className="left-settings">
        <h3>Upload Document</h3>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />

        <h3>Print Settings</h3>

        <label>Print Type:</label>
        <select>
          <option>Colored</option>
          <option>Black & White</option>
        </select>

        <label>Paper Size:</label>
        <select>
          <option>A4</option>
          <option>Letter</option>
          <option>Legal</option>
        </select>

        <label>Number of Copies:</label>
        <input type="number" min="1" defaultValue="1" />

        <label>Pages to Print:</label>
        <select>
          <option>All</option>
          <option>Only Even</option>
          <option>Only Odd</option>
        </select>

        <label>Sides:</label>
        <select>
          <option>One-sided</option>
          <option>Both-sided</option>
        </select>

        <label>Orientation:</label>
        <select>
          <option>Portrait</option>
          <option>Landscape</option>
        </select>

        <label>Margins:</label>
        <select>
          <option>Normal</option>
          <option>Narrow</option>
          <option>Custom</option>
        </select>
      </div>

      {/* Right: PDF Preview */}
      <div className="right-preview">
      {file ? (
  <Document
    file={file}
    onLoadSuccess={onDocumentLoadSuccess}
    onLoadError={(error) => console.error("PDF load error:", error)}
  >
    {Array.from(new Array(numPages), (el, index) => (
      <Page key={`page_${index + 1}`} pageNumber={index + 1} />
    ))}
  </Document>
) : (
  <div className="pdf-placeholder">PDF Preview will appear here</div>
)}


      </div>
    </div>
  );
};

export default NewOrder;
