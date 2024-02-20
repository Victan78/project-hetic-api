import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Modal from 'react-modal';

const PdfViewer = ({ pdfUrl }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [fileName, setFileName] = useState('file.pdf');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    setFileName(e.target.value);
  };

  const TelechargerPDF = () => {
    closeModal();

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName || 'file.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    pdfUrl !== '' && (
      <div className='pdfviewer'>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer fileUrl={pdfUrl} />
        </Worker>
        <button className='Telecharger' onClick={openModal}>
          Télécharger
        </button>
        {modalIsOpen && (
          <div
          className='modal'
        
          
          >
            <label>
              Nom du fichier:
              <input className='input_' type='text' value={fileName} onChange={handleInputChange} />
            </label>
            <button onClick={TelechargerPDF}>Valider</button>
            <button onClick={closeModal}>Annuler</button>
          </div>
        )}
      </div>
    )
  );
};

export default PdfViewer;