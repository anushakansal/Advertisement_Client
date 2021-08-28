import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div>
      <h1>Welcome to Ads</h1>
      <Link to="/login" className="btn btn-primary">Login</Link>     
    </div>
  );
}