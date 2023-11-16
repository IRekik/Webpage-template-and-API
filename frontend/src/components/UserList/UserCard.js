import React from 'react';
import '../../styles/UserCard.css';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <img src={user.imageUrl} alt={user.name} />
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <button>Edit</button>
      </div>
    </div>
  );
};

export default UserCard;