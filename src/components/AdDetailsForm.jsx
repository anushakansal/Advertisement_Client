import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BASE_API_URL } from '../constants';
import '../styles/CreateAd.css';

export default function AdDetailsForm({ ad, heading }) {

  const [title, setTitle] = useState(ad.title || '');
  const [description, setDescription] = useState(ad.description || '');
  const [actionText, setActionText] = useState(ad.action_text || '');
  const [actionUrl, setActionUrl] = useState(ad.action_url || '');
  const [actionColor, setActionColor] = useState(ad.action_color || 'primary');
  const [error, setError] = useState(null);
  const history = useHistory();

  const onSubmit = async (publish) => {
    try {
      if(!title.trim() || !description.trim() || !actionText.trim() || !actionUrl.trim()) {
        setError('All fields are required');
        return;
      }
      setError(null);
      const payload = {
        title: title.trim(),
        description: description.trim(),
        action_text: actionText.trim(),
        action_url: actionUrl.trim(),
        action_color: actionColor,
        published: publish
      };
      if(ad.id) {
        await axios.put(`${BASE_API_URL}/advertisements/${ad.id}`, payload, { withCredentials: true });
      } else {
        await axios.post(`${BASE_API_URL}/advertisements`, payload, { withCredentials: true });
      }
      history.push('/home');
    } catch(err) {
      //
    }
  }

  const onDelete = async () => {
    try {
      await axios.delete(`${BASE_API_URL}/advertisements/${ad.id}`, { withCredentials: true });
      history.push('/home');
    } catch(err) {
      //
    }
  }

  return (
    <div className="container">
      <div className="create-ad">
        <h1>{heading}</h1>
        {error && 
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        }
        <div className="mb-4">
          <label for="title" className="form-label">Title</label>
          <input 
            type="text" 
            className="form-control" 
            id="title" 
            placeholder="Title of your Ad" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>
        <div className="mb-4">
          <label for="description" className="form-label">Description</label>
          <textarea 
            type="text"
            className="form-control"
            id="description"
            placeholder="Description of your Ad"
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label for="title" className="form-label">Action Button Text</label>
          <input 
            type="text"
            className="form-control"
            id="title" 
            placeholder="Text on CTA Button"
            value={actionText} 
            onChange={(e) => setActionText(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label for="title" className="form-label">Action Button URL</label>
          <input 
            type="text" 
            className="form-control" 
            id="title" 
            placeholder="URL for CTA Button"
            value={actionUrl} 
            onChange={(e) => setActionUrl(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label for="title" className="form-label">Action Button Color</label>
          <select className="form-select" value={actionColor} onChange={e => setActionColor(e.target.value)}>
            <option value="primary">Blue</option>
            <option value="success">Green</option>
            <option value="warning">Orange</option>
            <option value="danger">Red</option>
            <option value="dark">Black</option>
          </select>
        </div>
        <div>
          {ad.id ? null : <button className="btn btn-primary me-3" onClick={() => onSubmit(false)}>Save Draft</button>}
          <button className="btn btn-success me-3" onClick={() => onSubmit(true)}>Publish</button>
          {ad.id ? <button className="btn btn-danger me-3" onClick={onDelete}>Delete</button> : null}
          <button className="btn btn-secondary" onClick={() => history.goBack()}>Cancel</button>
        </div>
      </div>  
    </div>
  );
}