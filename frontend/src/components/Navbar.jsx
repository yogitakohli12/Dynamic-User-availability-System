// frontend/src/components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light " style={{borderBottom:"1px solid grey" , marginBottom:"20px"}} >
      <div className="container-fluid" >
        <Link className="navbar-brand" style={{color:"white"}} to="/">
          DYNAMIC-USER-AVAILABILITY-SCHEDULING-SYSTEM
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" style={{color:"white"}} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{color:"white"}} to="/admin">
                Admin
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{color:"white"}} to="/upcoming-sessions">
                Upcoming-Sessions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
