import React, { useState } from "react";
import "./Contact.css";
import axios from "axios";
import { toast } from "react-toastify";
const Contact = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('userName', userName);
    formData.append('userEmail', userEmail);
    formData.append('userMessage', userMessage);

    const contactPromise = axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/contact`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials:true
    });

    toast.promise(
      contactPromise,
      {
        pending:"Sending...",
        success:"Message send successfully",
        error:{
          render({data}){
            return data.response?.data?.message || "Message is not send"
          }
        }
      }
    )

    try {
      const response = await contactPromise
      setUserEmail("")
      setUserName("")
      setUserMessage("")

    } catch (error) {
      console.error("Message is not send",error)
    }  
  };

  return (
    <section className="app__contact | container">
      <h1 className="contact_heading">Contact</h1>
      <div className="form_content">
        <form onSubmit={handleSubmit}>
          <div>
            {/* <label htmlFor='username'>Name</label> */}
            <input
              type="text"
              name="username"
              placeholder="Name"
              id="username"
              autoComplete="off"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div>
            {/* <label htmlFor="email">Email</label> */}
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              id="email"
              autoComplete="off"
              value={userEmail}
              onChange={(e)=> setUserEmail(e.target.value)}
              required
            />
          </div>
          <div>
            {/* <label htmlFor="message">Message</label> */}
            <textarea
              name="email"
              placeholder="Write a message"
              id="email"
              cols="30"
              rows="10"
              required
              value={userMessage}
              onChange={(e)=>setUserMessage(e.target.value)}
              autoComplete="off"
            ></textarea>
          </div>
          <div>
            <button className="send" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
