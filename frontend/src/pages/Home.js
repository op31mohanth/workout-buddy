import { useEffect, useContext, useState } from 'react';
import { WorkoutsContext } from '../context/WorkoutContext';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
  const { workouts, dispatch } = useContext(WorkoutsContext);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let ignore = false;

    const fetchWorkouts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/workouts');
        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.error || 'Unable to load workouts.');
        }

        if (!ignore) {
          setError(null);
          dispatch({ type: 'SET_WORKOUTS', payload: json });
        }
      } catch (requestError) {
        console.error('Failed to load workouts:', requestError);
        if (!ignore) {
          setError('Unable to load workouts. Check that the backend server is running.');
        }
      }
    };

    fetchWorkouts();

    return () => {
      ignore = true;
    };
  }, [dispatch, retryCount]);

  return (
    <div className="home">
      <div className="workouts">
        {error && (
          <div className="error" role="alert">
            {error}{' '}
            <button type="button" onClick={() => setRetryCount((count) => count + 1)}>
              Retry
            </button>
          </div>
        )}
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;