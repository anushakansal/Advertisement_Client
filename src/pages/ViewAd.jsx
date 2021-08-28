import axios from "axios";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import AdCard from "../components/AdCard";
import { BASE_API_URL } from "../constants";
import '../styles/ViewAd.css';

export default function ViewAd({ user }) {

  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [alert, setAlert] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const getAd = async (_id) => {
      try {
        const result = await axios.get(`${BASE_API_URL}/advertisements/${_id}`, { withCredentials: true });
        setAd(result.data);
      } catch(err) {
        if(err.request) {
          setAlert('Please Disable your AdBlocker and refresh the page, it blocked the API request');
        }
      }
    }
    const getComments = async (_id) => {
      try {
        const result = await axios.get(`${BASE_API_URL}/advertisements/${_id}/comments`, { withCredentials: true });
        setComments(result.data);
      } catch(err) {
        if(err.request) {
          setAlert('Please Disable your AdBlocker, it blocked the API request');
        }
      }
    }
    if(id) {
      getAd(id);
      getComments(id);
    }
  }, [id]);

  const submitComment = async () => {
    if(comment.trim()) {
      const payload = {
        advertisement_id: ad.id,
        text: comment.trim()
      }
      const result = await axios.post(`${BASE_API_URL}/comments`, payload, { withCredentials: true });
      setComments((comments) => [...comments, {...result.data, user_name: user.name}]);
      setComment('');
    }
  }

  if(alert) {
    return (
      <div class="alert-banner my-4">
        <div class="alert alert-danger" role="alert">
          {alert}
        </div>
      </div>
    );
  }

  if(ad) {
    return (
      <div className="feed">
        <AdCard ad={ad} showPostedBy selfUserId={user.id} history={history} />
        <div>
          <p className="text-muted">Posted by {ad.user_name} at {moment(ad.created_at).format('lll')}</p>
        </div>
        <div className="card my-4">
          <p class="card-header">Comments</p>
          <div className="card-body">
            {comments.length === 0 ?
              <div className="text-center py-4">
                <p>No comments yet</p>
              </div>
            :
              <div>
                {comments.map((comment) => (
                  <div className="pt-3 ms-4">
                    <p className="m-0">{comment.text}</p>
                    <p>- {comment.user_name}</p>
                  </div>
                ))}
              </div>
            }
          </div>
        </div>
        <div className="mb-4">
          <label for="title" className="form-label">Add your comment</label>
          <div className="d-flex">
            <input 
              type="text" 
              className="form-control" 
              id="title" 
              placeholder="Your comments about this ad" 
              value={comment} 
              onChange={(e) => setComment(e.target.value)} 
            />
            <button className="ms-3 btn btn-primary" onClick={submitComment}>Comment</button>
          </div>
        </div>
      </div>
    );
  }

  return <Fragment></Fragment>;
};
