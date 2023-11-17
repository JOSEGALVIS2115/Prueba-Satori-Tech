// Cards.js

import React, { useState } from 'react';
import Card from './Card';

const Cards = ({ residents }) => {
  const [activeResident, setActiveResident] = useState(null);

  const handleResidentClick = (resident) => {
    setActiveResident(resident);
  };

  return (
    <div className="cards-container">
      {residents.map(resident => (
        <Card
          key={resident.id}
          resident={resident}
          isActive={resident === activeResident}
          onClick={() => handleResidentClick(resident)}
        />
      ))}
    </div>
  );
};

export default Cards;
