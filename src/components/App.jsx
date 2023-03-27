import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import '../app.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
           <Route path="/" element={ <Home />} />
           <Route path="/login" element={ <Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
