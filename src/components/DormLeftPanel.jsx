import React, { useState } from 'react';
import {
  SquareArrowOutUpRight,
  DollarSign,
  Bed,
  Building,
  Utensils,
  BookOpenCheck,
  StickyNote,
  Users,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import RFModal from './RFModal';
import { getSourceUrl } from '../utils/getSourceUrl';
import useDormCSV from '../hooks/useDormCSV';

const groupedDorms = {
  'Crothers Hall': ['Crothers', 'Cro Mem'],
  'FloMo East: Alondra, Cardenal, and Faisan': ['Alondra', 'Cardenal', 'Faisan'],
  'FloMo West: Gavilan, Loro, Mirlo, and Paloma': ['Gavilan', 'Loro', 'Mirlo', 'Paloma'],
  'Norcliffe/Adelfa': ['Norcliffe', 'Adelfa'],
  'Meier/Naranja': ['Meier', 'Naranja'],
};

function DormLeftPanel({ dorm }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedRfAbout, setSelectedRfAbout] = useState('');
  const dormData = useDormCSV();

  if (!dorm) return null;

  const grouped = groupedDorms[dorm.name];
  const subDorms = grouped || [dorm.name];

  const sourceUrl = getSourceUrl(dorm);

  const openModal = (rfAbout) => {
    setSelectedRfAbout(rfAbout);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const fieldConfig = [
    { key: 'University Theme House', label: 'Theme House', icon: <BookOpenCheck size={20} /> },
    { key: 'Notes', label: 'Notes', icon: <StickyNote size={20} /> },
  ];

  const primaryDormInfo = dormData.find(
    (entry) => entry.House?.toLowerCase().trim() === subDorms[0].toLowerCase().trim()
  );

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 0 20px', color: 'white' }}>
      <h1 style={{ fontSize: '30px', marginBottom: '20px' }}>{dorm.name}</h1>

      <p style={{ fontSize: '16px', lineHeight: '1.6',       color: '#d9d9d9', }}>
        {dorm.dorm_gen_statement.replace(/\n/g, '\n')}{' '}
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#f4a261',
            display: 'inline-flex',
            verticalAlign: 'middle',
            marginLeft: '4px',
          }}
        >
          <SquareArrowOutUpRight size={16} />
        </a>
      </p>

      {/* Shared RF Section */}
      {dorm.dorm_rf_image && (
        <div
          onClick={() => openModal(dorm.dorm_rf_about)}
          style={{
            backgroundColor: '#1a1a1a',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            padding: '14px 0px 14px 12px',
            cursor: 'pointer',
            marginTop: '30px',
          }}
        >
          <img
            src={dorm.dorm_rf_image}
            alt="Resident Fellows"
            style={{
              width: '50px',
              height: '50px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginRight: '16px',
            }}
          />
          <div style={{ paddingRight: '12px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{dorm.RF_names}</div>
            <div style={{ fontSize: '14px', color: '#ccc' }}>Resident Fellows</div>
          </div>
        </div>
      )}

      {/* Shared Cost & Meal Plan */}
      {primaryDormInfo && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
          {primaryDormInfo['Academic Year Quarterly Rate'] && (
            <div style={{ backgroundColor: '#1a1a1a', borderRadius: '10px', display: 'flex', alignItems: 'center', padding: '14px 0px 14px 12px' }}>
              <div style={{ marginRight: '16px', color: '#f4a261' }}><DollarSign size={20} /></div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{primaryDormInfo['Academic Year Quarterly Rate']}</div>
                <div style={{ fontSize: '14px', color: '#ccc' }}>Quarterly Rate</div>
              </div>
            </div>
          )}
          {primaryDormInfo['Meal Plan Required'] && (
            <div style={{ backgroundColor: '#1a1a1a', borderRadius: '10px', display: 'flex', alignItems: 'center', padding: '14px 0px 14px 12px' }}>
              <div style={{ marginRight: '16px', color: '#f4a261' }}><Utensils size={20} /></div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{primaryDormInfo['Meal Plan Required']}</div>
                <div style={{ fontSize: '14px', color: '#ccc' }}>Meal Plan</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Render each sub-dorm or the single one */}
      {subDorms.map((subName, index) => {
        const dormInfo = dormData.find(
          (entry) => entry.House?.toLowerCase().trim() === subName.toLowerCase().trim()
        );

        if (!dormInfo) return null;

        const breakdownFields = Object.keys(dormInfo).filter(
          (key) =>
            key.toLowerCase().includes('spaces') &&
            key !== 'Total Assignable Spaces' &&
            dormInfo[key] && dormInfo[key].trim() !== ''
        );

        return (
          <div key={subName} style={{ marginTop: '20px' }}>
            {grouped && (
              <>
                <h2 style={{ fontSize: '22px', marginBottom: '4px', color: 'white' }}>{subName}</h2>
                <hr style={{ border: '1px solid #f4a261', margin: '12px 0 16px' }} />
              </>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {dormInfo['Total Assignable Spaces'] && (
                <div
                  style={{
                    backgroundColor: '#1a1a1a',
                    borderRadius: '10px',
                    padding: '14px 0px 14px 12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Bed size={24} style={{ marginRight: '16px', color: '#f4a261' }} />
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                        {dormInfo['Total Assignable Spaces']}
                      </div>
                      <div style={{ fontSize: '14px', color: '#ccc' }}>Total Assignable Spaces</div>
                    </div>
                  </div>

                  {breakdownFields.length > 0 && (
                    <div style={{ marginTop: '14px', paddingLeft: '40px' }}>
                      {breakdownFields.map((key) => (
                        <div key={key} style={{ fontSize: '14px', color: '#aaa', marginBottom: '4px' }}>
                          <strong>{key}</strong>: {dormInfo[key]}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {fieldConfig.map(({ key, label, icon }) =>
                dormInfo[key] && dormInfo[key].trim() !== '' ? (
                  <div
                    key={key}
                    style={{
                      backgroundColor: '#1a1a1a',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '14px 0px 14px 12px',
                    }}
                  >
                    <div style={{ marginRight: '16px', color: '#f4a261', flexShrink: 0 }}>{icon}</div>
                    <div style={{ paddingRight: '12px' }}>
                      {key === 'Notes' ? (
                        <div style={{ fontWeight: 'normal', fontSize: '16px' }}>
                          <span style={{ fontWeight: 'bold' }}>Notes:</span> {dormInfo[key]}
                        </div>
                      ) : (
                        <>
                          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{dormInfo[key]}</div>
                          <div style={{ fontSize: '14px', color: '#ccc' }}>{label}</div>
                        </>
                      )}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        );
      })}

      <RFModal
        isOpen={showModal}
        onClose={closeModal}
        rfAbout={selectedRfAbout}
        dormName={dorm.name}
      />
    </div>
  );
}

export default DormLeftPanel;