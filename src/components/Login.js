import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        // Store the token in local storage
        const authData = {
          accessToken: data.token,
          isLoggedIn: true,
        };
        localStorage.setItem('authData', JSON.stringify(authData));
        setIsLoggedIn(true);
        // Redirect to Home page
        navigate('/');
      } else {
        setError('Incorrect username or password, please try again.');
      }
    })
    .catch(err => {
      setError('An error occurred while processing your request.');
      console.error(err.message);
    });
  };

  // Check if user is already logged in
  useEffect(() => {
    // Retrieve the authData from localStorage
    const storedAuthData = localStorage.getItem('authData');
    if (storedAuthData) {
      // Redirect to another page because a token exists
      navigate('/');
    }
  }, []);

  return (
      <section>
        <div className="row">
          <div className="col"></div>
          <div className="col-6">
            <h3>Login</h3>
            {location.search.includes('message') &&
              <>
                <div className="alert alert-success" role="alert">
                  {decodeURIComponent(location.search.split('=')[1].replace(/\+/g, ' '))}
                </div>
              </>
            }
            {error &&
              <>
                <div class="alert alert-warning" role="alert">
                  {error}
                </div>
              </>
            }
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            </form>
          </div>
          <div className="col"></div>
        </div>
      </section>
    );
}

export default Login;