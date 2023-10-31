import React, { useState } from 'react';

function CreateCrewmateForm({ onCreate }) {
  const [image, setImage] = useState('');
  const [color, setColor] = useState('');
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');

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

    // Validate form data
    if (!image || !color || !name || !speed) {
      alert('Please fill in all fields.');
      return;
    }

    const newCrewmate = {
      image,
      color,
      name,
      speed,
      id: Date.now(),
    };

    try {
      // Try adding the crewmate
      const data = await onCreate(newCrewmate);
      // Clear the form if successful
      setImage('');
      setColor('');
      setName('');
      setSpeed('');
    } catch (error) {
      console.error('Error creating crewmate:', error);
      alert('There was an error creating the crewmate. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card">
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
      </div>
      <button type="submit">Create Crewmate</button>
    </form>
  );
}

export default CreateCrewmateForm;
