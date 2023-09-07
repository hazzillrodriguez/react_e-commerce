import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    // Password must be at least 6 characters
    // Must contain at least one number, one uppercase letter, and one special character
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = () => {
    if (!username || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Validate username
    if (username.length < 8 || !/\d/.test(username)) {
      setError('Username must be at least 8 characters long and must contain numbers.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters and include a number, uppercase letter, and special character.');
      return;
    }

    fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      // Handle successful sign up
      navigate('/login?message=Your+account+has+been+created+successfully.');
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
            <h3>Create an account</h3>
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
              <button className="btn btn-primary" onClick={handleSignup}>Sign up</button>
            </form>
          </div>
          <div className="col"></div>
        </div>
      </section>
    );
}

export default Signup;