import { useState } from "react";
import { useCreateuser } from "../../hooks/useCreateuser";

const CreateUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signup, error, isLoading} = useCreateuser()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email, password)
  }
  return ( 
    <form className="signup__form" onSubmit={handleSubmit}>
      <h3>Add new user.</h3>
      <label>
        Email:
        <input
          type="email"
          onChange={(e)=>{setEmail(e.target.value)}}
          value={email}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          onChange={(e)=>{setPassword(e.target.value)}}
          value={password}
        />
      </label>
      <button disabled={isLoading} type="submit">Submit</button>
      {error && <div className="error"> {error}</div>}
    </form>
   );
}
 
export default CreateUser;