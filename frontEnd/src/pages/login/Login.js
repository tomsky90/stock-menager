import { useState } from "react";
import { useNavigate } from "react-router-dom";
//css
import './login.css'
//hooks
import { useAuthContext } from '../../hooks/useAuthContext'
//components
import Loader from '../../components/loader/Loader'

import { BASEURL } from '../../config.js'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogingIn, setIsLogingIn] = useState(null);
  const [error, setError] = useState(null)
  const { dispatch } = useAuthContext()
  const navigate = useNavigate()
  // const { login, error, isLoading } = useLogin();
  
  const login = async () => {
    setIsLogingIn(true)
    setError(null)

    const response = await fetch(BASEURL + '/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLogingIn(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLogingIn(false)
      const redirect = async () => {
        
        const user = await json 
        if(user) {
          navigate('/home')
        }
      }
      redirect()
    }
  }

  const emailOnChange = (e) => {
    setEmail(e.target.value);
  }

  const passwordOnChange = (e) => {
    setPassword(e.target.value)
  }

  if(isLogingIn) {
    return <Loader/>
  }
  return (
    <div className="login__page-wrapper">
      <form className="login__form" onSubmit={login}>
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
        <button disabled={isLogingIn}>Submit</button>
        {error && <div className="error"> {error}</div>}
      </form>
    </div>
  );
};

export default Login;