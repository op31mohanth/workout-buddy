import { useState, useContext } from 'react';
import { WorkoutsContext } from '../context/WorkoutContext';

const WorkoutForm = () => {
  const { dispatch } = useContext(WorkoutsContext);
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    try {
      const response = await fetch('http://localhost:5000/api/workouts', {
        method: 'POST',
        body: JSON.stringify(workout),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error || 'Unable to add workout.');
        setEmptyFields(json.emptyFields || []);
        return;
      }

      setTitle('');
      setLoad('');
      setReps('');
      setError(null);
      setEmptyFields([]);
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    } catch (requestError) {
      console.error('Failed to add workout:', requestError);
      setError('Unable to add workout. Check that the backend server is running.');
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Load (in Kg's):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;