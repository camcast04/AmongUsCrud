import React from 'react';
import Crewmate from './Crewmate';

function CrewmateList({ crewmates, onDelete, onUpdate }) {
  return (
    <div>
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

export default CrewmateList;
