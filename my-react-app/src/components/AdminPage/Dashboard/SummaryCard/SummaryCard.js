import React from 'react';
import './SummaryCard.css';

function SummaryCard({ title, count, description }) {
  return (
    <div className="summary-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{count}개</span>
    </div>
  );
}

export default SummaryCard;
