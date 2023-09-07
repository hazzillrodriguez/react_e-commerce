import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({ isLoggedIn, setIsLoggedIn, searchQuery }) => {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    // Update the URL parameter when a search is performed
    navigate(`?page=1${query ? `&search=${encodeURIComponent(query)}` : ''}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('authData');
    setIsLoggedIn(false);
    navigate('/login');
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5">
      <div className="container">
        <Link className="navbar-brand" to={'/'}>React E-commerce</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to={'/'}>Home</Link>
            </li>
            {!isLoggedIn &&
              <>
                <li className="nav-item">
                  <Link className="nav-link" to={'/login'}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/signup'}>Sign up</Link>
                </li>
              </>
            }
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="javascript:void(0)" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Smartphones</a></li>
                <li><a className="dropdown-item" href="#">Electronics</a></li>
              </ul>
            </li>
            {isLoggedIn &&
              <>
                <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0)" onClick={handleLogout}>Logout</a>
                </li>
              </>
            }
          </ul>
          <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchQuery} onChange={(e) => handleSearch(e.target.value)}
            />
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;