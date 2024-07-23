// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css'; // Tailwind CSS import

function App() {
  const [users, setUsers] = useState([
    { email: 'user1@example.com', userType: 'user type 1' },
    { email: 'user2@example.com', userType: 'user type 1' },
  ]);

  const handleUserTypeChange = (index, newType) => {
    const updatedUsers = users.map((user, i) =>
      i === index ? { ...user, userType: newType } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-300">Email</th>
                <th className="py-2 px-4 border-b-2 border-gray-300">User Type</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-gray-300">{user.email}</td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    <select
                      value={user.userType}
                      onChange={(e) => handleUserTypeChange(index, e.target.value)}
                      className="block w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="user type 1">User Type 1</option>
                      <option value="user type 2">User Type 2</option>
                      <option value="user type 3">User Type 3</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
