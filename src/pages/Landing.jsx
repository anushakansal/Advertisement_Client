import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import '../styles/Landing.css';

export default function Landing({ user }) {

  const history = useHistory();

  useEffect(() => {
    if(user) {
      history.push('/home');
    }
  }, [user]);

  return (
    <div>
      <div class="alert-banner">
        <div class="alert alert-primary" role="alert">
          Please disable Adblocker if enabled, otherwise it will block some API requests.
        </div>
      </div>
      <div className="banner">
        <h1 className="mb-4">Welcome to Ads</h1>
        <Link to="/login" className="btn btn-primary">Login</Link>
      </div> 
    </div>
  );
}