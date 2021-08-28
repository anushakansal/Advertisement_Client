import { Fragment, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { BASE_API_URL } from "../constants";

export default function Navbar({ user, unauthorized }) {

  const history = useHistory();

  useEffect(() => {
    if(unauthorized) {
      history.push('/');
    }
  }, [unauthorized]);

  const logout = () => {
    window.location.href = `${BASE_API_URL}/logout`;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to="/" className="navbar-brand">Advertisements</Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
          <div className="d-flex">
            {user ?
              <Fragment>
                <Link className="btn btn-success me-3" to="/create-ad">Create Your Ad</Link>
                <button className="btn btn-dark" onClick={logout}>Logout</button>
              </Fragment>
            :
              <Fragment>
                <Link className="btn btn-dark" to="/login">Login</Link>
              </Fragment>
            }
            
          </div>
        </div>
      </div>
    </nav>
  )
}