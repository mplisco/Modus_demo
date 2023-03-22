import {React , useEffect, useState } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { Button, Form, TextArea , Container, Dropdown } from 'semantic-ui-react'

function LoginPage({ handleUserLogin, currentUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  
  function handleSubmit(e) {
    e.preventDefault();

    fetch("/login", {
      method: "POST",
      mode:"cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "username": username, "password": password })
    })
      .then(res => {
        if(res.ok) {
          res.json().then(user => handleUserLogin(user))
          .then(()=> history.push('/home'))
        } else {
          res.json().then((errorData)=> alert("Invalid username or password"))
        }
      })
    // window.location.reload()
    setPassword('');
  }

  return (
    <>
    <div>
      <form>
        <div>
          <label>Username: </label>
          <input type="text" name="username" value={username}
            onChange={ (e) => setUsername(e.target.value) }/>
        </div>
        <div id="password-field" className="basic-box">
          <label>Password: </label>
          <input type="password" name="password" className="basic-box max-w-max" value={password}
            onChange={ (e) => setPassword(e.target.value) }/>
        </div>
        <div>
          <input type="submit" onClick={handleSubmit}/>
        </div>
      </form>
    </div>
    </>
  )
}

export default LoginPage