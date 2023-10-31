import React, { useState, useEffect } from 'react';
import { Route, Link, Routes, useParams, useNavigate } from 'react-router-dom';
import './App.css';
import CrewmateList from './components/CrewmateList';
import CreateCrewmateForm from './components/CreateCrewmateForm';
import EditCrewmateForm from './components/EditCrewmateForm';
import CrewmateGallery from './components/CrewmateGallery';
import amongUsBanner from './assets/images/AmongUsBanner.png';
import peeking from './assets/images/peeking.gif';
import {
  getCrewmates,
  addCrewmate,
  deleteCrewmate,
  updateCrewmate,
} from './supabaseClient';

function CrewmateEditor({ onUpdate, onDelete, crewmates }) {
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  const crewmateToEdit = crewmates.find((c) => c.id === parseInt(paramId));

  const handleDelete = async () => {
    try {
      await onDelete(crewmateToEdit.id);
      // Redirect using React Router's navigate
      navigate('/gallery');
    } catch (error) {
      console.error('Failed to delete the crewmate:', error);
    }
  };

  return (
    <div>
      <EditCrewmateForm crewmate={crewmateToEdit} onUpdate={onUpdate} />
      <button onClick={handleDelete}>Delete Crewmate</button>
    </div>
  );
}

function App() {
  const [crewmates, setCrewmates] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCrewmates = async () => {
      try {
        const data = await getCrewmates();
        setCrewmates(data);
      } catch (error) {
        setError('Failed to fetch crewmates.');
      }
    };

    fetchCrewmates();
  }, []);

  const handleCreateCrewmate = async (crewmate) => {
    try {
      const data = await addCrewmate(crewmate);
      if (data && data.length) {
        setCrewmates([...crewmates, data[0]]);
        navigate('/gallery');
        return data;
      } else {
        throw new Error('Failed to create crewmate.');
      }
    } catch (error) {
      setError('Error creating crewmate.');
    }
  };

  const handleDeleteCrewmate = async (id) => {
    try {
      await deleteCrewmate(id);
      setCrewmates(crewmates.filter((crewmate) => crewmate.id !== id));
    } catch (error) {
      setError('Error deleting crewmate.');
    }
  };

  const handleUpdateCrewmate = async (id, updatedData) => {
    try {
      const data = await updateCrewmate(id, updatedData);
      setCrewmates(
        crewmates.map((crewmate) =>
          crewmate.id === id ? { ...crewmate, ...data[0] } : crewmate
        )
      );
    } catch (error) {
      setError('Error updating crewmate.');
    }
  };

  return (
    <div className="app">
      <div className="sidebar">
        <Link to="/">Home</Link>
        <Link to="/create">Create a Crewmate!</Link>
        <Link to="/gallery">Crewmate Gallery</Link>
        <img src={peeking} alt="Peeking Crewmate" />
      </div>
      <div className="content">
        {error && <div className="error">{error}</div>}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Welcome to the Crewmate Creator!</h1>
                <p>
                  Here is where you can create your very own set of crewmates
                  before sending them off into space!
                </p>
                <img src={amongUsBanner} alt="Crewmates" />
                <footer>Logic Creations</footer>
              </>
            }
          />
          <Route
            path="/create"
            element={<CreateCrewmateForm onCreate={handleCreateCrewmate} />}
          />
          <Route
            path="/gallery"
            element={
              <>
                <h1>Gallery Page</h1>
                <CrewmateGallery
                  crewmates={crewmates}
                  onDelete={handleDeleteCrewmate}
                  onUpdate={handleUpdateCrewmate}
                />
              </>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <CrewmateEditor
                onUpdate={handleUpdateCrewmate}
                onDelete={handleDeleteCrewmate}
                crewmates={crewmates}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
