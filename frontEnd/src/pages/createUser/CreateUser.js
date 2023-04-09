import { useState } from "react";

const CreateUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(email, password)
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
    </form>
   );
}
 
export default CreateUser;