import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdDetailsForm from "../components/AdDetailsForm";
import { BASE_API_URL } from "../constants";

export default function EditAd() {

  const { id } = useParams();
  const [ad, setAd] = useState(null);

  useEffect(() => {
    const getAd = async (_id) => {
      try {
        const result = await axios.get(`${BASE_API_URL}/advertisements/${_id}`, { withCredentials: true });
        setAd(result.data);
      } catch(err) {
        //
      }
    }
    if(id) {
      getAd(id);
    }
  }, [id]);

  if(ad) {
    return <AdDetailsForm ad={ad}  heading="Edit Your Ad" />;
  }

  return <Fragment></Fragment>;
};