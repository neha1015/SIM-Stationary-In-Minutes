// // import { pdfjs } from 'react-pdf';
// // import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js?url';

// // pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
// // src/pdfWorker.js
// import { pdfjs } from 'react-pdf';
// import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

// src/pdfWorker.js
import { pdfjs } from 'react-pdf';

// Use direct CDN worker to avoid Vite bundling issues
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
