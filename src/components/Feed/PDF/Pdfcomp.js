import React from 'react';

function Pdfcomp({ file }) {
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <iframe
        src={file}
        title="PDF Viewer"
        style={{ height: '100%', width: '100%', border: 'none' }}
        allow="fullscreen"
      />
    </div>
  );
}

export default Pdfcomp;
