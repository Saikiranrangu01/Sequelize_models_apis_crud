import React from 'react'
import "./List.css"
import axios from 'axios'
import { useState, useEffect } from 'react';

const List = () => {
    const [users, setUsers] = useState([]);

      useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => {
        if (res.data && res.data.data) {
          setUsers(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

    return (
    <div className="user-container">
      <h1>User List</h1>
      <div className="user-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <img
              src={`http://localhost:5000/assets/${user.image}`}
              alt={user.userName}
              className="user-image"
            />
            <h3 className="user-name">{user.userName}</h3>
            <p className="user-email">{user.email}</p>
            <small className="user-date">
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );

}

export default List
