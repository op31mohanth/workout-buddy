import { useContext, useState } from 'react';
import { WorkoutsContext } from '../context/WorkoutContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useContext(WorkoutsContext);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/workouts/${workout._id}`, {
        method: 'DELETE',
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error || 'Unable to delete workout.');
        return;
      }

      setError(null);
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    } catch (requestError) {
      console.error('Failed to delete workout:', requestError);
      setError('Unable to delete workout. Check that the backend server is running.');
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (in Kg's): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p className="date-text">
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <button className="delete-btn" onClick={handleClick}>
        🗑
      </button>
      {error && <div className="error" role="alert">{error}</div>}
    </div>
  );
};

export default WorkoutDetails;