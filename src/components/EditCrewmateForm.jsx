import React, { useState } from 'react';

function EditCrewmateForm({ crewmate, onUpdate }) {
  // Check if crewmate is provided
  if (!crewmate) {
    return <p>Error: Crewmate data not provided!</p>;
  }

  const [image, setImage] = useState(crewmate.image);
  const [color, setColor] = useState(crewmate.color);
  const [name, setName] = useState(crewmate.name);
  const [speed, setSpeed] = useState(crewmate.speed);

  const colors = [
    { name: 'blue', img: 'blue.png' },
    { name: 'red', img: 'red.png' },
    { name: 'green', img: 'green.png' },
    { name: 'yellow', img: 'yellow.png' },
    { name: 'orange', img: 'orange.png' },
    { name: 'pink', img: 'pink.png' },
    { name: 'purple', img: 'purple.png' },
    { name: 'teal', img: 'teal.png' },
    { name: 'white', img: 'white.png' },
    { name: 'black', img: 'black.png' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !color || !name || !speed) {
      alert('Please fill in all fields.');
      return;
    }

    const updatedCrewmate = {
      image,
      color,
      name,
      speed,
      id: crewmate.id,
    };

    try {
      await onUpdate(updatedCrewmate.id, updatedCrewmate);
      // Navigate back to the gallery page or provide some indication
      // that the update was successful
    } catch (error) {
      console.error('Error updating crewmate:', error);
      alert('There was an error updating the crewmate. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Your Crewmate</h2>
      <img src={image} alt="Crewmate Color" />
      {/* Rest of the form similar to CreateCrewmateForm */}
      <div className="card">{/* ... */}</div>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter crewmate name"
      />

      <label>Speed:</label>
      <input
        type="text"
        value={speed}
        onChange={(e) => setSpeed(e.target.value)}
        placeholder="Enter crewmate speed"
      />

      <label>Choose a color:</label>
      {colors.map((colorItem) => (
        <div key={colorItem.img}>
          <input
            type="radio"
            value={colorItem.img}
            checked={image === colorItem.img}
            onChange={() => {
              setImage(colorItem.img);
              setColor(colorItem.name);
            }}
          />
          <label>{colorItem.name}</label>
        </div>
      ))}
      <button type="submit">Update Crewmate</button>
    </form>
  );
}

export default EditCrewmateForm;
