import { useState } from "react";
import presentation from '../../assets/presentation-640.png'
import './login.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
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
        <button type="submit">Submit</button>
      </form>
      {/* <div className="login__img-wrapper">
          <img src={presentation}/>
      </div> */}
    </div>
  );
};

export default Login;
