import { useDispatch } from 'react-redux';
import { setPage } from '../store/navigationSlice';
import { useNavigate } from 'react-router-dom';

function About() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToHome = () => {
    dispatch(setPage('home'));
    navigate('/');
  };

  return (
    <div>
      <h1>About Page</h1>
      <button onClick={goToHome}>Go to Home</button>
    </div>
  );
}

export default About;
