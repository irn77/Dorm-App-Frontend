// DormGenPanel.jsx
import React, { useState } from 'react';
import RFModal from './RFModal';

function DormGenPanel({ dorm }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedRfAbout, setSelectedRfAbout] = useState('');

  const openModal = (rfAbout) => {
    setSelectedRfAbout(rfAbout);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const sourceUrl = dorm.neighborhood === 'Rowan'
  ? `https://resed.stanford.edu/neighborhoods/${dorm.neighborhood}/${dorm.neighborhood}-houses/${dorm.name.toLowerCase().replace(/ /g, '-')}`
  : `https://resed.stanford.edu/neighborhoods/${dorm.neighborhood}-neighborhood/${dorm.neighborhood}-houses/${dorm.name.toLowerCase().replace(/ /g, '-')}`;


  const hasRfInfo = dorm.dorm_rf_image || dorm.Resident_Fellows || dorm.dorm_rf_about;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      {hasRfInfo ? (
        <>
          <div style={{ flex: 1, marginRight: '20px' }}>
            {dorm.dorm_rf_image && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img
                  src={dorm.dorm_rf_image}
                  alt="Resident Fellows"
                  style={{
                    maxWidth: '200px',
                    maxHeight: '200px',
                    height: 'auto',
                    borderRadius: '8px',
                    marginBottom: '5px',
                    cursor: 'pointer',
                  }}
                  onClick={() => openModal(dorm.dorm_rf_about)}
                />
                <p
                  style={{
                    fontSize: '0.8em',
                    color: '#white',
                    cursor: 'pointer',
                    marginBottom: '0px',
                    display: 'block',
                  }}
                  onClick={() => openModal(dorm.dorm_rf_about)}
                >
                  Resident Fellows:
                </p>
                <p
                  style={{
                    fontSize: '0.9em',
                    color: 'white',
                    cursor: 'pointer',
                    marginTop: '0px',
                    display: 'block',
                  }}
                  onClick={() => openModal(dorm.dorm_rf_about)}
                >
                  {dorm.RF_names}
                </p>
              </div>
            )}
          </div>
          <div style={{ flex: 2, textAlign: 'left', position: 'relative' }}>
            <p style={{ fontWeight: 'bold' }}>Neighborhood: {dorm.neighborhood}</p>
            <p style={{ display: 'inline', whiteSpace: 'pre-line', marginRight: '5px' }}>
              {dorm.dorm_gen_statement.replace(/\\n/g, '\n')}
            </p>
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'absolute',
                display: 'inline-block',
                verticalAlign: 'top',
                textDecoration: 'none',
              }}
            >
              <span
                style={{
                  fontSize: '1em',
                  color: 'white',
                  cursor: 'pointer',
                  title: 'Source and More Info',
                }}
              >
                🔗 {/* Replace with your actual icon */}
              </span>
            </a>
          </div>
        </>
      ) : (
        <div style={{ flex: 2, textAlign: 'left', position: 'relative' }}>
          <p style={{ fontWeight: 'bold' }}>Neighborhood: {dorm.neighborhood}</p>
          <p style={{ display: 'inline', whiteSpace: 'pre-line', marginRight: '5px' }}>
            {dorm.dorm_gen_statement.replace(/\\n/g, '\n')}
          </p>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'absolute',
              display: 'inline-block',
              verticalAlign: 'top',
              textDecoration: 'none',
            }}
          >
            <span
              style={{
                fontSize: '1em',
                color: 'white',
                cursor: 'pointer',
                title: 'Source and More Info',
              }}
            >
              🔗 {/* Replace with your actual icon */}
            </span>
          </a>
        </div>
      )}
      <RFModal isOpen={showModal} onClose={closeModal} rfAbout={selectedRfAbout} dormName={dorm.name} />
    </div>
  );
}

export default DormGenPanel;