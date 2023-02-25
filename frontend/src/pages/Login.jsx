import { Button } from "@mui/material";
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(username, password)
  }

  const lgin =() => {
    setLogin(true);
  }

  const sgnup = () => {
    setLogin(false);
  }

  return (
    <div>
      <Button sx={{bgcolor:login ? "#E98074" : "#EAE7DC"}} onClick={lgin}>Login</Button><Button sx={{bgcolor:login ? "#EAE7DC" : "#E98074"}} onClick={sgnup}>Signup!</Button>
      {login ? <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>Username:</label>
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button onClick={() => {navigate("/home")}}>Log in</button></form> : <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>Username:</label>
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button onClick={() => {navigate("/home")}}>Sign up</button>
    </form>}
    </div>
  )
}

export default Login
