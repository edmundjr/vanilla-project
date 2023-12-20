import React, { useState } from 'react';
import "./ManageUsers.css"

const mockUsers = [
  { name: 'Alice', permissions: 'Admin', emailAddress: 'alice@example.com' },
  { name: 'Bob', permissions: 'User', emailAddress: 'bob@example.com' },
  // ... more users
];

const ManageUsers = () => {
  const [users, setUsers] = useState(mockUsers);
  const [filter, setFilter] = useState('');

  const handleResetPassword = (user) => {
    const newPassword = window.prompt(`Enter New Password for ${user.name}`);
    if (newPassword) {
      // Here you would implement the actual logic to update the password in your database
      // and send an email to the user
      console.log(`Password for ${user.name} is updated and an email is sent to ${user.emailAddress}`);
      alert(`Password has been reset and sent to ${user.emailAddress}!`);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Filter users by name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Permissions</th>
            <th>Email Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.permissions}</td>
              <td>{user.emailAddress}</td>
              <td>
                <button onClick={() => handleResetPassword(user)}>
                  Reset Password
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
