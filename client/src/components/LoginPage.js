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
      <h1>User Login</h1>
      <div class="ui centered grid">
      <div class="eight wide column">
          <div class="ui segment">
              <Form>
                <Form.Field>
                  <label>Username: </label>
                  <input placeholder="Username" value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                  <label>Password: </label>
                  <input placeholder="Password" type="password" name="password" value={password}
                    onChange={ (e) => setPassword(e.target.value) }/>
                </Form.Field>
              <Button primary type="submit" onClick={handleSubmit}>Submit</Button>
              </Form>
          </div>
      </div>
      </div>
    </>
  )
}

export default LoginPage