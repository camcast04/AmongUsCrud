import React from 'react';
import Crewmate from './Crewmate';

function CrewmateGallery({ crewmates, onDelete, onUpdate }) {
  return (
    <div className="gallery-container">
      {crewmates.map((crewmate) => (
        <Crewmate
          key={crewmate.id}
          {...crewmate}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

export default CrewmateGallery;
