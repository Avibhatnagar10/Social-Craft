import React, { useState } from "react";

function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    socialHandle: "",
    images: [],
  });
  const [showNotification, setShowNotification] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      images: Array.from(e.target.files),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("socialMediaHandle", formData.socialHandle);
    
    formData.images.forEach((file) => {
      formDataToSend.append("images", file);
    });

    try {
      const response = await fetch("http://localhost:5000/api/users/submit", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      } else {
        console.error("Error submitting the form");
      }
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  return (
    <div style={{
      backgroundColor: "#f4f4f9",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div className="container" style={{
        background: "white",
        borderRadius: "12px",
        padding: "25px",
        maxWidth: "600px",
        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
      }}>
        <h1 style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#007bff",
          fontSize: "1.8rem",
          fontWeight: "bold",
        }}>Social Media Submission</h1>
        <p style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#555",
          fontSize: "1rem",
        }}>Fill out the form below with your details and upload images to get started.</p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "5px",
              color: "#555",
              fontWeight: "bold",
            }}>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }} placeholder="Enter your name" />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "5px",
              color: "#555",
              fontWeight: "bold",
            }}>Social Media Handle:</label>
            <input type="text" name="socialHandle" value={formData.socialHandle} onChange={handleChange} style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }} placeholder="Enter your social media handle" />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "5px",
              color: "#555",
              fontWeight: "bold",
            }}>Upload Images:</label>
            <input type="file" name="images" multiple onChange={handleFileChange} style={{
              display: "block",
              width: "100%",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }} />
          </div>
          <button type="submit" style={{
            padding: "17px 40px",
            borderRadius: "50px",
            cursor: "pointer",
            border: "0",
            backgroundColor: "white",
            boxShadow: "rgb(0 0 0 / 5%) 0 0 8px",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            fontSize: "15px",
            transition: "all 0.5s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.letterSpacing = "3px";
            e.target.style.backgroundColor = "hsl(261deg 80% 48%)";
            e.target.style.color = "hsl(0, 0%, 100%)";
            e.target.style.boxShadow = "rgb(93 24 220) 0px 7px 29px 0px";
          }}
          onMouseOut={(e) => {
            e.target.style = "";
          }}
          onMouseDown={(e) => {
            e.target.style.transform = "translateY(10px)";
            e.target.style.transition = "100ms";
            e.target.style.boxShadow = "rgb(93 24 220) 0px 0px 0px 0px";
          }}
          onMouseUp={(e) => {
            e.target.style = "";
          }}>
            Submit
          </button>
        </form>
      </div>
      {showNotification && (
        <div style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#28a745",
          color: "white",
          padding: "15px 20px",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          fontSize: "1rem",
        }}>
          ✅ Form submitted successfully!
        </div>
      )}
    </div>
  );
}

export default UserForm;
