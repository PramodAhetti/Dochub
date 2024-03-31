import React from 'react';

function PdfViewer({ pdfBase64 }) {
  const pdfUrl = `data:application/pdf;base64,${pdfBase64}#toolbar=0`;

  return (

<iframe src={pdfUrl} type="application/pdf" className='pdf' />

  );
}

export default PdfViewer;
