import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from "./components/NavBar";
import { BASE_API_URL } from "./constants";
import axios from "axios";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import CreateAd from "./pages/CreateAd";
import EditAd from "./pages/EditAd";
import Login from "./pages/Login";
import ViewAd from "./pages/ViewAd";

function App() {

  const [user, setUser] = useState(null);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(`${BASE_API_URL}/user`, { withCredentials: true });
        setUser(result.data);
        setUnauthorized(false);
      } catch(err) {
        setUnauthorized(true);
      }
    }
    getUser();
  }, []);

  return (
    <Router>
      <Navbar user={user} unauthorized={unauthorized} />
      <Switch>
        <Route path="/home" strict>
          <Home user={user}/>
        </Route>
        <Route path="/login" strict>
          <Login user={user}/>
        </Route>
        <Route path="/create-ad" strict>
          <CreateAd />
        </Route>
        <Route path="/edit-ad/:id" strict>
          <EditAd />
        </Route>
        <Route path="/ad/:id" strict>
          <ViewAd user={user} />
        </Route>
        <Route path="/" strict>
          <Landing user={user} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
