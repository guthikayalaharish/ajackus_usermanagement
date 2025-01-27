import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditUser = ({ user, onSave }) => {
  const [updatedUser, setUpdatedUser] = useState(user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(updatedUser);
    navigate("/view-users");
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={updatedUser.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          value={updatedUser.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          value={updatedUser.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="company.name"
          value={updatedUser.company.name}
          onChange={handleChange}
          required
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditUser;
