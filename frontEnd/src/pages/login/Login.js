import { useState } from "react";
//img's
import presentation from '../../assets/presentation-640.png'
//css
import './login.css'
//hooks
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
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
              setEmail(e.target.value);
            }}
            value={email}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </label>
        <button disabled={isLoading} type="submit">Submit</button>
        {error && <div className="error"> {error}</div>}
      </form>
      {/* <div className="login__img-wrapper">
          <img src={presentation}/>
      </div> */}
    </div>
  );
};

export default Login;
