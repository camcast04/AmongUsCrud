// import React, { useState } from 'react';
// import useroutlineAmongUs from '../assets/images/useroutlineAmongUs.png';

// function Crewmate({ image, name, color, id, onDelete, onUpdate }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(image);
//   const [selectedColor, setSelectedColor] = useState(color);

//   const handleUpdate = () => {
//     onUpdate(id, { image: selectedImage, color: selectedColor });
//     setIsEditing(false);
//   };

//   if (isEditing) {
//     return (
//       <div>
//         <div>
//           <label>Choose a new color:</label>
//           {/* Color Picker (similar to the one in CreateCrewmateForm) */}
//           {/*...*/}
//         </div>
//         <button onClick={handleUpdate}>Update</button>
//         <button onClick={() => setIsEditing(false)}>Cancel</button>
//       </div>
//     );
//   }

//   return (
//     <div className="crewmate-card">
//       <img src={useroutlineAmongUs} alt="Crewmate Outline" />
//       <div className="crewmate-details">
//         <p>
//           <strong>Name:</strong> {name}
//         </p>
//         <p>
//           <strong>Color:</strong> {color}
//         </p>
//       </div>
//       <button onClick={() => setIsEditing(true)}>Edit</button>
//       <button onClick={() => onDelete(id)}>Delete</button>
//     </div>
//   );
// }

// export default Crewmate;
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import useroutlineAmongUs from '../assets/images/useroutlineAmongUs.png';

function Crewmate({ name, color, speed, id, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedColor, setSelectedColor] = useState(color);

  const handleUpdate = () => {
    onUpdate(id, { color: selectedColor });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="crewmate-card">
        <div>
          <label>Choose a new color:</label>
          {/* Color Picker (similar to the one in CreateCrewmateForm) */}
          {/*...*/}
        </div>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
    );
  }

  return (
    <div className="crewmate-card">
      <img
        src={useroutlineAmongUs}
        alt="Crewmate Outline"
        style={{ width: '150px' }}
      />
      <div className="crewmate-details">
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Color:</strong> {color}
        </p>
        <p>
          <strong>Speed:</strong> {speed}
        </p>
      </div>
      <Link to={`/edit/${id}`}>Edit</Link>
    </div>
  );
}

export default Crewmate;
