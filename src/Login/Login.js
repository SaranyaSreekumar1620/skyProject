import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Grid, Paper, TextField, Button, Typography, Link } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import imglogo from '../logoimg.jpg'
import './login.css'
import { setUserSession } from '../Utils/Common'
const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const paperStyle = { padding: 20, width: 380, margin: '20px auto' }
  const avatarStyle = { width: 230 }
  const btnstyle = { margin: '8px 0', background: '#140261', width: 339, height: 55 }
  const HandleLogin = () => {
    setError(null)
    setLoading(true)
    axios
      .post('https://sk-y.herokuapp.com/users/login', {
        username: username,
        password: password,
      })
      .then((response) => {
        setLoading(false)
        setUserSession(response.data.token, response.data.user)
        console.log('response >>>', response)
      })
      .catch((error) => {
        setLoading(false)
        if (error.response.status === 401 || error.response.status === 400) {
          setError(error.response.data.message)
        } else {
          setError('something went worng ...please try again')
        }
        console.log('error >>>', error)
      })
    // navigate.push('/dashboard')
  }
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <img style={avatarStyle} src={imglogo} alt="" />
          <h3 className="text">The leads machine!</h3>
          <br />
          <br />
          <h3 className="subtext">Get more Customers!</h3>
          <h2 className="login-text">Login</h2>
        </Grid>
        <TextField
          label="Email/MobileNo"
          value={username}
          placeholder="Enter email/mobileno"
          fullWidth
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          value={password}
          placeholder="Enter password"
          type="password"
          fullWidth
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        {error && <div className="error">{error}</div>}
        <Button
          value={loading ? 'Loading..' : 'Login'}
          type="submit"
          disabled={loading}
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={HandleLogin}
        >
          Login
        </Button>
        <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography>
          {' '}
          Do you have an account ?<Link href="#">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default Login
