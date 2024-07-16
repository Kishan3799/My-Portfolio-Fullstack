import React, { useEffect, useState } from 'react'
import './ContactTable.css';
import axios from 'axios';

const ContactTable = () => {
    const [contacts ,setContacts] = useState([])
   
    useEffect(()=> {
        const fetchContact = async ()=> {
            try {
                const response = await axios.get('/api/v1/all_contact');
                setContacts(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchContact();
    },[]);

  return (
    <div className="contact-table-container">
      <table className="contact-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (contacts.map((contact, index) => (
            <tr key={index}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
            </tr>
          ))) : <p>No contacts here</p>}
        </tbody>
      </table>
    </div>
  )
}

export default ContactTable
