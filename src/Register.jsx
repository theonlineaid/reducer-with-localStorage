import React, { useState } from "react";

// interface RegisterUser {
//   email: string;
//   password: string;
//   name: string;
//   //   bio?: string;
//   //   ssn?: string;
//   //   phoneNumber?: string;
//   //   dateOfBirth?: string; // Use string to handle date input
//   //   gender?: string;
//   //   isActive?: boolean;
// }

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  //   const [bio, setBio] = useState<string>("");
  //   const [ssn, setSsn] = useState<string>("");
  //   const [phoneNumber, setPhoneNumber] = useState<string>("");
  //   const [dateOfBirth, setDateOfBirth] = useState<string>("");
  //   const [gender, setGender] = useState<string>("");
  //   const [isActive, setIsActive] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
      name,
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
            "User-Agent": navigator.userAgent, // Set User-Agent header
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setSuccess("User registered successfully!");
      setError(null);
      console.log(result);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
      console.error("Registration error:", err);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default Register;
