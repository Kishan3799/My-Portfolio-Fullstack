import React, { useEffect, useState } from "react";
import { images } from "../../constants";
import "./About.css"
import { SiKotlin } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { SiAndroidstudio } from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";
import { IoLogoFirebase } from "react-icons/io5";
import { FaGitAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import axios from "axios";

const About = () => {

  const [image, setImage] = useState(null);
  const [bio, setBio] = useState("")

  useEffect(()=> {
    const setAboutDescription = async () => {
      try {
        const response = await axios.get("/api/v1/about/get_about_detail", {withCredentials:true});
        console.log();
        setImage(response.data.data.profileImage)
        setBio(response.data.data.about_description);
      } catch (error) {
        console.log(error)
      }
    }

    setAboutDescription();
  }, [])

  return (
    <section className="app__about-section | container">
  
      <div className="app__about-profile-picture">
        {/* <div className="background"></div> */}
        <img src={image} alt="Kishan Verma" className="profile-picture"/>
      </div>

      <div className="app__about-content">
        <h1>About Me.</h1>
        {/* <p>
          Hello there! My name is <span className="bold__italic">Kishan Verma</span>, and I am a skilled Android
          Developer and Software Engineer. I have a passion for creating
          innovative mobile applications that meet the needs of businesses and
          their customers.</p>
          <p>I have experience in both Android and web development
          and have gained expertise in several programming languages and tools
          such as <span className="bold"><SiKotlin/> Kotlin, <FaJava/> Java, <FaHtml5/> HTML,<FaCss3Alt/> CSS, <IoLogoJavascript/> JavaScript, <FaReact/> ReactJs, <FaNodeJs/> NodeJs,
          ExpressJs, <SiMongodb/> MongoDb, <FaGitAlt/> Git and <FaGithub/> Github, <SiAndroidstudio/> Android Studio, <TbBrandVscode/> VS Code, and
          <IoLogoFirebase/> Firebase</span>. </p>
          <p> I hold a Bachelor's degree in Information Technology from
          Nsut West Campus. Throughout my academic and professional career, I
          have been involved in various projects that have honed my skills and
          expertise in the field of mobile app development. I am confident that
          my skills, experience, and passion for mobile app development make me
          a valuable asset.
        </p> */}

        <p>
          {bio}
        </p>
      </div>
    </section>
  );
};

export default About;
