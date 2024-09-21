import { Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import About from './views/About';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
