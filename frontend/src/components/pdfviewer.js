import React from 'react';

function PdfViewer({ pdfBase64 }) {
  const pdfUrl = `data:application/pdf;base64,${pdfBase64}#toolbar=0`;


  return (
    <div className='pdf'>
      <iframe src={pdfUrl} type="application/pdf" className='pdf' />
    </div>
  );
}

export default PdfViewer;
