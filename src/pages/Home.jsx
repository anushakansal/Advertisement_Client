import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AdCard from "../components/AdCard";
import { BASE_API_URL } from "../constants";
import '../styles/Home.css';

export default function Home({ user }) {
  
  const [ads, setAds] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getAds = async () => {
      try {
        const result = await axios.get(`${BASE_API_URL}/advertisements`, { withCredentials: true });
        setAds(result.data);
      } catch(err) {
        //
      }
    };
    getAds();
  }, []);

  if(user) {
    return (
      <div>
        <div className="feed">
          {ads.map((ad) => (
            <AdCard ad={ad} selfUserId={user.id} history={history} showCommentIcon />
          ))}
        </div>
      </div>
    );
  }

  return <Fragment></Fragment>
  
}