import React, { useEffect, useState } from "react";
import { images } from "../../constants";
import "./About.css";

import axios from "axios";

const About = () => {
  const [image, setImage] = useState(null);
  const [bio, setBio] = useState("");

  useEffect(() => {
    const setAboutDescription = async () => {
      try {
        const response = await axios.get('/api/v1/about/get_about_detail', {
          withCredentials: true,
        });
        console.log();
        setImage(response.data.data.profileImage);
        setBio(response.data.data.about_description);
      } catch (error) {
        console.log(error);
      }
    };

    setAboutDescription();
  }, []);

  return (
    <section className="container">
        <h1 className="heading">About Me.</h1>
      <div className="app__about-section">
     
        <div className="app__about-profile-picture">
          <img src={(image == null) ? images.previewDefault : image} alt="Kishan Verma" className="profile-picture" />
        </div>
        <div className="app__about-content">
          <p>{bio}</p>
        </div>
      </div>

    </section>
  );
};

export default About;
