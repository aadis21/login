import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [agreement, setAgreement] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event) => {
    setAgreement(event.target.checked);
  };

  async function handleLogin(e) {
    e.preventDefault();
    const userInfo = { email, password };
    const apiBaseUrl = 'http://localhost:5000'; // API server address

    try {
      // Send login information to the /login endpoint
      await axios.post(`${apiBaseUrl}/login`, userInfo);
      alert('Successfully logged in');

      // Send user information to the /users endpoint
      await axios.post(`${apiBaseUrl}/users`, userInfo);

      // Optional: Redirect to another page after successful login
      // For example, if you have a component that represents the dashboard:
      // history.push('/dashboard');
    } catch (error) {
      // Handle error if login or data integration fails
      console.error('Error during login or data integration:', error.message);
    }
  }

  return (
    <div>
      <form className="flex flex-col justify-center items-center" onSubmit={handleLogin}>
        <h1 className="text-4xl py-6 font-mono antialiased">Login</h1>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex gap-4 justify-center">
          <input
            type="checkbox"
            name="agreement"
            id="agreement"
            onChange={handleChange}
            className="rounded-full"
          />
          <label htmlFor="agreement">I agree to the terms and conditions</label>
        </div>

        <button
          disabled={!agreement}
          className="mt-6 border py-3 px-3 rounded-2xl my-3 disabled:bg-gray-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
