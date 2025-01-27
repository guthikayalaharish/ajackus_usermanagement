import React, { useState, useEffect } from "react";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";
import Pagination from "./components/Pagination";
import "./App.css"; // Import the CSS file

function App() {
  const [users, setUsers] = useState([]);
  const [isAddUser, setIsAddUser] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [logs, setLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();

    const usersWithFirstLastNames = data.map((user) => {
      const [firstName, lastName] = user.name.split(" ");
      return {
        ...user,
        firstName,
        lastName,
        department: user.company.name,
      };
    });

    setUsers(usersWithFirstLastNames);
  };

  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setIsAddUser(false);
    setLogs((prevLogs) => [
      ...prevLogs,
      `User ID: ${newUser.id} added successfully`,
    ]);
    alert(`User added successfully with ID: ${newUser.id}`);
  };

  const handleEditUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditUser(null);
    setIsAddUser(false);
    setLogs((prevLogs) => [
      ...prevLogs,
      `User ID: ${updatedUser.id} edited successfully`,
    ]);
    alert(`User details updated successfully for ID: ${updatedUser.id}`);
  };

  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setLogs((prevLogs) => [...prevLogs, `User ID: ${userId} deleted successfully`]);
    alert(`User with ID: ${userId} deleted successfully`);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleUsersPerPageChange = (e) => {
    setUsersPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="app-container">
      {/* Header Section */}
      <div className="header">
        <h1>User Management Dashboard</h1>
        <button
          onClick={() => setShowLogs(!showLogs)}
          className="account-activity-btn"
        >
          {showLogs ? "Hide Account Activity" : "Show Account Activity"}
        </button>
      </div>

      {/* Centered Search and Add User Section */}
      <div className="centered-section">
        {/* Add User Button */}
        <button
          onClick={() => setIsAddUser(!isAddUser)}
          className="add-user-btn"
        >
          {isAddUser ? "Cancel Add User" : "Add User"}
        </button>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Dropdown for Users Per Page */}
      <div className="pagination-control">
        <label htmlFor="usersPerPage">Users Per Page:</label>
        <select
          id="usersPerPage"
          value={usersPerPage}
          onChange={handleUsersPerPageChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>

      {isAddUser ? (
        <AddUser
          onAddOrEdit={editUser ? handleEditUser : handleAddUser}
          editUser={editUser}
        />
      ) : (
        <>
          <UserList
            users={currentUsers}
            onEdit={(user) => {
              setEditUser(user);
              setIsAddUser(true);
            }}
            onDelete={handleDeleteUser}
          />
          {filteredUsers.length === 0 && (
            <p className="no-users-message">No users found</p>
          )}
        </>
      )}

      <Pagination
        totalUsers={filteredUsers.length}
        usersPerPage={usersPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {showLogs && (
        <div className="logs-container">
          <h3>Account Activity Logs:</h3>
          <ul>
            {logs.length > 0 ? (
              logs.map((log, index) => <li key={index}>{log}</li>)
            ) : (
              <p>No actions logged yet</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
