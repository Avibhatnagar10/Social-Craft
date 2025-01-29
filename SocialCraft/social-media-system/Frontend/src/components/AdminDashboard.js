import React, { useState, useEffect } from "react";

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from backend
    fetch('http://localhost:5000/api/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data); // Update state with fetched data
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-800 to-black text-white p-10">
      <h1 className="text-4xl font-extrabold text-indigo-400 text-center mb-10 tracking-tight">
        Admin Dashboard
      </h1>
      <div className="container mx-auto px-4">
        {users.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.map((user) => (
              <div
                key={user._id} // Assuming _id is used as the identifier
                className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-indigo-400">{user.name}</h3>
                  <p className="text-lg text-gray-400 mb-4">{user.socialHandle}</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  {user.images.map((image, index) => (
                    <a
                      key={index}
                      href={image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity duration-300"
                    >
                      <img
                        src={image} // Cloudinary URL
                        alt={`uploaded-${index}`}
                        className="w-32 h-32 object-cover rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
                      />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-lg">No users to display. Please check back later!</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
