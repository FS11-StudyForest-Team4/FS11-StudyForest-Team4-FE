/* src/pages/home/StudyCard.jsx */
import React from 'react';

const StudyCard = ({ study, onClick }) => {
  if (!study) return null;
  return (
    <div
      onClick={onClick}
      style={{
        background: '#ffffff',
        padding: '24px',
        borderRadius: '15px',
        border: '1px solid #e9e9e9',
        cursor: 'pointer',
      }}
    >
      <div
        className={study.background}
        style={{
          height: '100px',
          borderRadius: '10px',
          marginBottom: '16px',
          background: '#f5f5f5',
        }}
      ></div>
      <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>
        {study.title}
      </h4>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          color: '#818181',
          fontSize: '14px',
        }}
      >
        <span>{study.nickName}</span>
        <span style={{ color: '#3692ff', fontWeight: '600' }}>
          {study.totalPoint?.toLocaleString()} P
        </span>
      </div>
    </div>
  );
};

export default StudyCard;
