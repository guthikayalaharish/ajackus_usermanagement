import React, { useState, useEffect } from "react";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";
import Pagination from "./components/Pagination";

function App() {
  const [users, setUsers] = useState([]);
  const [isAddUser, setIsAddUser] = useState(false); // Determines whether the form is visible
  const [editUser, setEditUser] = useState(null); // Tracks the user being edited
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [usersPerPage, setUsersPerPage] = useState(10); // Users per page
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [activityLogs, setActivityLogs] = useState([]); // Store activity logs
  const [showActivityLogs, setShowActivityLogs] = useState(false); // Show/hide activity logs

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
 
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();

    const usersWithFirstLastNames = data.map((user, index) => {
      const [firstName, lastName] = user.name.split(" ");
      return {
        id: index + 1, // Ensure IDs are sequential
        firstName,
        lastName,
        email: user.email,
        department: user.company.name,
      };
    });

    setUsers(usersWithFirstLastNames);
  };
  const date=new Date();

  const handleAddUser = (newUser) => {
    newUser.id = users.length + 11; // Assign a sequential ID starting from 11
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setActivityLogs((prevLogs) => [
      ...prevLogs,
      `User ID: ${newUser.id} added on ${date}`,
    ]);
    setIsAddUser(false); // Close the form after adding
    alert(`User added successfully with ID: ${newUser.id}`);
  };

  const handleEditUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setActivityLogs((prevLogs) => [
      ...prevLogs,
      `User ID: ${updatedUser.id} edited on ${date}`,
    ]);
    setEditUser(null); // Clear the edit state
    setIsAddUser(false); // Close the form after editing
    alert(`User details updated successfully for ID: ${updatedUser.id}`);
  };

  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setActivityLogs((prevLogs) => [
      ...prevLogs,
      `User ID: ${userId} deleted on ${date}`,
    ]);
    alert(`User with ID: ${userId} deleted successfully`);
  };

  // Filter users based on the search query
  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );
    
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleUsersPerPageChange = (e) =>
    setUsersPerPage(parseInt(e.target.value, 10));

  return (
    <div className="app-container">
      <div className="header">
        <h1 style={{ textAlign: "center", flex: 1 }}>User Management Dashboard</h1>
        <button
          className="activity-button"
          onClick={() => setShowActivityLogs((prev) => !prev)}
        >
          {showActivityLogs ? "Hide Account Activity" : "Account Activity"}
        </button>
      </div>

      {showActivityLogs ? (
        <div className="activity-log">
          <h2>Account Activity Logs</h2>
          <ul>
            {activityLogs.length > 0 ? (
              activityLogs.map((log, index) => <li key={index}>{log}</li>)
            ) : (
              <p>No activity logged yet.</p>
            )}
          </ul>
        </div>
      ) : (
        <>
          <div className="search-container" style={{ textAlign: "center", margin: "20px 0" }}>
            {!isAddUser && (
              <>
                <button
                  className="add-user-button"
                  onClick={() => {
                    setEditUser(null); // Ensure no user is being edited
                    setIsAddUser(true);
                  }}
                  style={{ marginRight: "10px", padding: "10px 20px" }}
                >
                  Add User
                </button>
                <input
                  type="text"
                  placeholder="Search by name, email, or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    padding: "10px",
                    width: "300px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </>
            )}
          </div>

          {isAddUser && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                minHeight: "50vh",
                marginTop: "20px",
              }}
            >
              <AddUser
                onAddOrEdit={editUser ? handleEditUser : handleAddUser}
                editUser={editUser}
              />
              <button
                className="cancel-add-user-button"
                onClick={() => setIsAddUser(false)}
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Back
              </button>
            </div>
          )}

          {!isAddUser && (
            <>
              <UserList
                users={currentUsers}
                onEdit={(user) => {
                  setEditUser(user);
                  setIsAddUser(true);
                }}
                onDelete={handleDeleteUser}
              />
              <Pagination
                totalUsers={filteredUsers.length}
                usersPerPage={usersPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
              <div className="pagination-settings" style={{ textAlign: "center", marginTop: "20px" }}>
                <label htmlFor="usersPerPage" style={{ marginRight: "10px" }}>
                  Users per page:
                </label>
                <select
                  id="usersPerPage"
                  value={usersPerPage}
                  onChange={handleUsersPerPageChange}
                  style={{
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
