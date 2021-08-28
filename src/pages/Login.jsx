import '../styles/Login.css';

export default function Login() {
  
  const handleLogin = () => {
    window.location.href = 'https://rails-ads-api.herokuapp.com/auth/google_oauth2';
  }

  return (
    <div className="container">
      <button className="btn btn-primary" onClick={handleLogin}>Login with Google</button>     
    </div>
  );
}