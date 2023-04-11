import { useState } from "react";
import { useNavigate } from "react-router-dom";
//css
import './login.css'
//hooks
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate()

  const emailOnChange = (e) => {
    setEmail(e.target.value);
  }

  const passwordOnChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/home')
  };
  return (
    <div className="login__page-wrapper">
      <form className="login__form" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label>
          Email:
          <input
            type="email"
            onChange={(e) => {
              emailOnChange(e)
            }}
            value={email}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            onChange={(e) => {
              passwordOnChange(e)
            }}
            value={password}
          />
        </label>
        <button disabled={isLoading} type="submit">Submit</button>
        {error && <div className="error"> {error}</div>}
      </form>
    </div>
  );
};

export default Login;
