import React, { useEffect, useState } from "react";
import { images } from "../../constants";
import "./About.css";
import Loader from '../../component/Loader'
import axios from "axios";
import { FETCH_STATUS } from "../../utils/fetchStatus";

const About = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState(FETCH_STATUS.IDLE)

  const setAboutDescription = async () => {
    try {
      setStatus(FETCH_STATUS.LOADING)
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/about/get_about_detail`, {
        withCredentials: true,
      });

      const aboutData = response?.data?.data;
      if (aboutData) {
        const aboutDetail = aboutData.about_description || "";
        const aboutProfile = aboutData.profileImage || null;

        if (aboutDetail) {
          setBio(aboutDetail);
        }
        if (aboutProfile) {
          setProfileImage(aboutProfile);
        }

        setStatus(FETCH_STATUS.SUCCESS);
      } else {
          setStatus(FETCH_STATUS.ERROR);
        }
     
    } catch (error) {
      setStatus(FETCH_STATUS.ERROR)
      console.log(error);
    }
  };

  useEffect(() => {
    setAboutDescription();
  }, []);

  const isLoading = status === FETCH_STATUS.LOADING
  const isSuccess = status === FETCH_STATUS.SUCCESS
  const isError = status === FETCH_STATUS.ERROR
  
  if(isLoading) return <Loader/>

  return (
    <section className="container">
        <h1 className="heading">About Me.</h1>
      <div className="app__about-section">
      <div className="app__about-profile-picture">
          <img
            src={profileImage == null ? images.previewDefault : profileImage}
            alt="Profile"
            className="profile-picture"
          />
        </div>
        <div className="app__about-content">
          <p>{ bio === "" ? "No Bio" : bio}</p>
        </div>
      </div>
    </section>
  );
};

export default About;
