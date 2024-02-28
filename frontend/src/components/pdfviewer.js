import React from 'react';

function PdfViewer({ pdfBase64 }) {
  const pdfUrl = `data:application/pdf;base64,${pdfBase64}`;

  return (
    <div className="pdf-viewer">
      <iframe src={pdfUrl} width="100%" height="600px" title="PDF Viewer" />
    </div>
  );
}

export default PdfViewer;
