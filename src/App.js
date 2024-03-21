import React, { useState } from 'react';
import './App.css'; // Import CSS file for styling

// Sample user data (replace with your backend API calls)
const initialUsers = [
  { id: 1, username: 'user1', email: 'user1@example.com' },
  { id: 2, username: 'user2', email: 'user2@example.com' },
  { id: 3, username: 'user3', email: 'user3@example.com' }
];

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState(initialUsers);

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // CRUD functions
  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const editUser = (id, updatedUser) => {
    setUsers(users.map(user => (user.id === id ? updatedUser : user)));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  // Login function
  const handleLogin = (e) => {
    e.preventDefault();
    // Perform authentication (e.g., check credentials against a backend API)
    if (username === 'admin' && password === 'password') {
      setLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="app">
      {!loggedIn ? (
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
          <button type="submit">Login</button>
          </div>
        </form>
      ) : (
        <div className="user-management">
          <h1>User Management</h1>
          <UserList users={users} deleteUser={deleteUser} editUser={editUser} />
          <AddUserForm addUser={addUser} />
        </div>
      )}
    </div>
  );
};

// Component to display list of users
const UserList = ({ users, deleteUser, editUser }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [editedUsername, setEditedUsername] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditedUsername(user.username);
    setEditedEmail(user.email);
  };

  const handleSave = () => {
    editUser(editingUser.id, { ...editingUser, username: editedUsername, email: editedEmail });
    setEditingUser(null);
  };

  return (
    <ul className="user-list">
      {users.map(user => (
        <li key={user.id}>
          {editingUser === user ? (
            <>
              <input
                type="text"
                value={editedUsername}
                onChange={(e) => setEditedUsername(e.target.value)}
              />
              <input
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
              <button onClick={handleSave}>Save</button>
            </>
          ) : (
            <>
              <div>
                <span>{user.username}</span>
                <span>{user.email}</span>
              </div>
              <div>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
                <button onClick={() => handleEdit(user)}>Edit</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

// Component for adding new users
const AddUserForm = ({ addUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate input fields
    if (!username || !email) {
      alert('Please fill in all fields');
      return;
    }
    // Generate unique ID (for simplicity)
    const id = Math.floor(Math.random() * 1000);
    // Create new user object
    const newUser = { id, username, email };
    // Add new user
    addUser(newUser);
    // Clear input fields
    setUsername('');
    setEmail('');
  };

  return (
    <form className="add-user-form" onSubmit={handleSubmit}>
      <h2>Add User</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div>
      <button type="submit">Add User</button>
      </div>
    </form>
  );
};

export default App;
