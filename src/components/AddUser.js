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
      <h2>{editUser ? "Edit Task" : "Add Task"}</h2>
      <input
        type="text"
        name="firstName"
        value={user.firstName}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <input
        type="text"
        name="lastName"
        value={user.lastName}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <input
        type="text"
        name="department"
        value={user.department}
        onChange={handleChange}
        placeholder="Priority"
        required
      />
      <button type="submit">{editUser ? "Save Changes" : "Add Task"}</button>
    </form>
  );
};

export default AddUser;
