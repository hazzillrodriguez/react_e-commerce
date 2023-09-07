import Navbar from './Navbar';
import Footer from './Footer';
import PageNotFound from './PageNotFound';
import Home from './Home';
import About from './About';
import Login from './Login';
import Signup from './Signup';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Parse the 'search' parameter from the URL
  const searchQuery = new URLSearchParams(location.search).get('search') || '';

  useEffect(() => {
    const storedAuthData = localStorage.getItem('authData');
    if (storedAuthData) {
      const authData = JSON.parse(storedAuthData);
      setIsLoggedIn(authData.isLoggedIn);
    }
  }, []);

  return (
    <div className="App">
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        searchQuery={searchQuery}
      />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;