import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";

function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);
  const handleName = (event) => setName(event.target.value);

  const handleSignup = (event) => {
    event.preventDefault();

    const requestBody = { email, password, name };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="Signup">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignup}>
        <label>Email: </label>
        <input type="email" name="email" value={email} onChange={handleEmail} />
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <label>Name: </label>
        <input type="text" name="name" value={name} onChange={handleName} />

        <button>Sign Up</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>Do you have an account?</p>
        <Link to={"/login"}> Login</Link>
      </form>
    </div>
  );
}

export default Signup;


