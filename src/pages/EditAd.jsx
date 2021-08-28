import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdDetailsForm from "../components/AdDetailsForm";
import { BASE_API_URL } from "../constants";

export default function EditAd() {

  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const getAd = async (_id) => {
      try {
        const result = await axios.get(`${BASE_API_URL}/advertisements/${_id}`, { withCredentials: true });
        setAd(result.data);
      } catch(err) {
        if(err.request) {
          setAlert('Please Disable your AdBlocker, it blocked the API request');
        }
      }
    }
    if(id) {
      getAd(id);
    }
  }, [id]);

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
    return <AdDetailsForm ad={ad}  heading="Edit Your Ad" />;
  }

  return <Fragment></Fragment>;
};
