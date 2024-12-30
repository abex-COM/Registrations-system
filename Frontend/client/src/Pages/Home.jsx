import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
export default function Home() {
  return (
    <div className="h-screen bg-green-200">
      <nav className="flex justify-center p-2">
        <h1 className="uppercase text-teal-600 font-semibold font-serif">
          Welcome to Registration System
        </h1>
      </nav>
      <div className="p-2 m-2">
        <NavLink
          to="/adminpage"
          className="bg-green-500 rounded-full px-4 py-2 text-green-200 hover:bg-green-600 "
        >
          Login as Admin
        </NavLink>
      </div>
      <Form />
    </div>
  );
}

function Form() {
  const [message, setMessage] = useState([]);

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target; // Get name and value of the input
    setFormData({
      ...formData,
      [name]: value, // Update the corresponding field
    });
  };

  const handleForm = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const resp = await axios.post(
        "http://localhost:8000/api/v1/users",
        formData
      ); // Use the correct backend port (likely 8000, not 5173)

      console.log(resp.data);
      setMessage("Regisetred succefully");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
      });
      setError("");
    } catch (err) {
      console.error(
        "Error during registration:",
        err.response?.data || err.message
      );
      setError(err.response?.data);
    }
  };

  return (
    <>
      <form
        onSubmit={handleForm}
        className="grid gap-4 justify-items-center bg-teal-500 p-6"
      >
        <div className="grid gap-2 sm:grid-cols-2">
          <Input
            label="First Name"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
          />
          <Input
            label="Last Name"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
        </div>
        <span
          className={`py-1 h-7 `}
          style={{ color: error.message ? "red" : "white" }}
        >
          {error?.message ? `${error.message}!` : message || ""}
        </span>

        <button className="bg-teal-300 py-2 px-4 rounded-full">Register</button>
      </form>
    </>
  );
}

function Input({ label, name, value, type, onChange }) {
  return (
    <div className="grid gap-2 bg-teal-400 p-2 rounded-md shadow-md">
      <label className="text-teal-100">{label}</label>
      <input
        className="rounded-md w-max px-4 py-1 shadow-md outline-orange-500"
        name={name} // Assign the name prop to the input
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function Select({ name, value, onChange }) {
  return (
    <div className="grid gap-2 bg-teal-400 p-2 rounded-md">
      <label className="text-teal-100">Gender</label>
      <select
        className="rounded-md px-4 py-1 outline-orange-500"
        name={name} // Pass the name attribute to bind correctly
        value={value} // Bind the value from state
        onChange={onChange} // Handle change event
      >
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
  );
}
