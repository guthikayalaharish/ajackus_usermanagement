import React, { useState, useEffect } from "react";

const AddUser = ({ onAddOrEdit, editUser }) => {
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    if (editUser) {
      setUser({
        id: editUser.id,
        firstName: editUser.firstName,
        lastName: editUser.lastName,
        email: editUser.email,
        department: editUser.department,
      });
    }
  }, [editUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editUser) {
      // When editing, pass the updated user to the onAddOrEdit function
      onAddOrEdit(user);
    } else {
      // When adding a new user, generate a new ID
      const newUser = { ...user, id: Date.now() }; // Ensure unique ID
      onAddOrEdit(newUser); // Add the new user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editUser ? "Edit User" : "Add User"}</h2>
      <input
        type="text"
        name="firstName"
        value={user.firstName}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        name="lastName"
        value={user.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="department"
        value={user.department}
        onChange={handleChange}
        placeholder="Department"
        required
      />
      <button type="submit">{editUser ? "Save Changes" : "Add User"}</button>
    </form>
  );
};

export default AddUser;
