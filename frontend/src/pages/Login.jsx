import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(username, password)
  }

  const lgin = () => {
    setLogin(true);
  }

  const sgnup = () => {
    setLogin(false);
  }

  return (
      <div className="container">
        <div className="form-container log-in-container">
          <div>
            <Typography variant="h4" textAlign="center" fontWeight="bold">Jiraji</Typography>
            <Typography variant="h8" sx={{color:"#666666"}}>Project management made easy</Typography><br/><br/>
            <Button sx={{ bgcolor: login ? "#fae4b1" : "#fffaef" }} onClick={lgin}>Login</Button>
            <Button sx={{ bgcolor: login ? "#fffaef" : "#fae4b1" }} onClick={sgnup}>Signup!</Button>
          </div>
          {login ? <form className="login" onSubmit={handleSubmit}>
            <h3>Log In</h3>

            <TextField
              onChange={(e) => setUsername(e.target.value)}
              value={username} variant="outlined" id="Username" name="username" label='Username' />

            <TextField
              onChange={(e) => setPassword(e.target.value)}
              value={password} variant="outlined" id="Password" name="password" label='Password' type="password"/>

            <button variant="contained" className="login-btn" onClick={() => { 
              if (password === "password" && username === "kirthi") {navigate("/home")}}}>Log in</button></form>
            : <form className="signup" onSubmit={handleSubmit}>
              <h3>Sign Up</h3>

              <TextField
                onChange={(e) => setUsername(e.target.value)}
                value={username} variant="outlined" id="Username" name="username" label='Username' />

              <TextField
                onChange={(e) => setPassword(e.target.value)}
                value={password} variant="outlined" id="Password" name="password" label='Password' type="password"/>

              <button variant="contained" className="login-btn" onClick={() => { navigate("/home") }}>Sign up</button>
            </form>}
        </div>
        <div className="overlay-container">
        </div>
      </div>

    /*<div>
        <Button sx={{ bgcolor: login ? "#E98074" : "#D8C3A5" }} onClick={lgin}>Login</Button><Button sx={{ bgcolor: login ? "#D8C3A5" : "#E98074" }} onClick={sgnup}>Signup!</Button>
        {login ? <form className="login" onSubmit={handleSubmit}>
          <h3>Log In</h3>
  
          <TextField
            onChange={(e) => setUsername(e.target.value)}
            value={username} variant="outlined" id="Username" name="username" label='Username' />
  
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            value={password} variant="outlined" id="Password" name="password" label='Password' />
  
          <Button variant="contained" bgcolor="#E98074" onClick={() => { navigate("/home") }}>Log in</Button></form> : <form className="signup" onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
  
          <TextField
            onChange={(e) => setUsername(e.target.value)}
            value={username} variant="outlined" id="Username" name="username" label='Username' />
  
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            value={password} variant="outlined" id="Password" name="password" label='Password' />
  
          <Button variant="contained" bgcolor="#E98074" onClick={() => { navigate("/home") }}>Sign up</Button>
        </form>}
      </div>*/
  )
}

export default Login
