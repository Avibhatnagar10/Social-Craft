import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import UserForm from "./components/Userform";
import AdminDashboard from "./components/AdminDashboard";

// Navigation component
function Navigation() {
  const navigate = useNavigate();

  return (
    <div className="flex gap-6">
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 text-lg font-medium text-white bg-indigo-600 rounded-full shadow-md transition duration-300 hover:bg-indigo-500 hover:shadow-lg"
      >
        Social Media Task
      </button>
      <button
        onClick={() => navigate("/admin")}
        className="px-4 py-2 text-lg font-medium text-white bg-green-600 rounded-full shadow-md transition duration-300 hover:bg-green-500 hover:shadow-lg"
      >
        Admin Dashboard
      </button>
    </div>
  );
}

function App() {
  return (
    <Router>
      {/* Fullscreen White Background */}
      <div className="min-h-screen bg-white text-gray-800">
        {/* Navigation Bar */}
        <nav className="py-6 shadow-md bg-gray-100 sticky top-0 z-10">
          <div className="container mx-auto flex justify-between items-center px-6">
            {/* Website Title */}
            <h1 className="text-3xl font-bold text-indigo-600">Snaplet</h1>
            {/* Navigation Buttons */}
            <Navigation />
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12">
          <Routes>
            {/* User Form */}
            <Route
              path="/"
              element={
                <div className="flex flex-col items-center text-center">
                  <h2 className="text-4xl font-bold text-indigo-600 mb-4">
                    Submit Your Information
                  </h2>
                  <p className="text-gray-600 mb-8 max-w-xl">
                    Enter your name, social media handle, and upload your favorite images to share with the admin team. Let’s get started!
                  </p>
                  <UserForm />
                </div>
              }
            />
            {/* Admin Dashboard */}
            <Route
              path="/admin"
              element={
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-green-600 mb-4">
                    Admin Dashboard
                  </h2>
                  <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                    Review all user submissions, including their names, social media handles, and uploaded images. Stay organized and manage submissions effortlessly!
                  </p>
                  <AdminDashboard />
                </div>
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 text-gray-600 py-6 mt-8 text-center shadow-inner">
          <p>&copy; {new Date().getFullYear()} Snaplet. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
