import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Context from "../../Component/Context/Context";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("image", image);
    formData.append("address", address);
    console.log(formData);
    try {
      console.log(formData);
      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.status === 200) {
        console.log("User registered successfully!");
        alert(" registered  !!!!!!!!");
        // Redirect to login page or show success message
        navigate("/login");
      } else {
        console.log("email already in use!!!!:", result.message);
        alert(`Email Already Registered !!!`);
        // Show error message
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="login">
      <div className="form">
        <h1 className="text-center mb-5">Sign Up </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <br />
          <div className="form-group">
            <label>Email </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <br />
          <div className="form-group">
            {" "}
            <label>Phone </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <br />
          <div className="form-group">
            {" "}
            <label>Password </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <br />
          <div className="form-group">
            {" "}
            <label>address </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <br />
          <div className="form-group">
            {" "}
            <label>Profile Image </label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <br />
          <button
            type="submit"
            onSubmit={() => handleSubmit()}
            className="btn btn-success"
          >
            Register
          </button>
          <br />

          <br />
          <Link to="/login" className="btn btn-link">
            Sign In
          </Link>
          <br />
          <Link to="/forgotpassword" className="btn btn-link">
            Forgot Password
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
