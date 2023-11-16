import React, { useState } from 'react';
import '../../styles/UserForm.css';

const UserForm = ({ addUser }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
  
    const handleAddUser = () => {
      // Validate the form fields as needed before adding the user
      if (firstName && lastName && email) {
        addUser({ firstName, lastName, email });
        // Reset form fields after adding the user
        setFirstName('');
        setLastName('');
        setEmail('');
      } else {
        // Handle validation errors or display a message to the user
      }
    };
  
    return (
      <div className="user-form">
        <div className="input-container">
          <input
            className="user-input"
            type="text"
            placeholder=" "
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <div className="user-placeholder">First Name</div>
        </div>
  
        <div className="input-container">
          <input
            className="user-input"
            type="text"
            placeholder=" "
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <div className="user-placeholder">Last Name</div>
        </div>
  
        <div className="input-container">
          <input
            className="user-input"
            type="text"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="user-placeholder">Email</div>
        </div>
  
        <button onClick={handleAddUser}>Submit</button>
      </div>
    );
  };
  
  export default UserForm;