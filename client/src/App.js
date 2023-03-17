import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignupPage";

function App() {
  const [count, setCount] = useState(0);

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  // useEffect(() => {
  //   fetch("/hello")
  //     .then((r) => r.json())
  //     .then((data) => setCount(data.count));
  // }, []);

  //Auth fetch to determine if user is logged in and set if yes
  useEffect(() => {
    fetch("/auth")
    .then(res => {
      if(res.ok) {
        res.json().then(user => setCurrentUser(user))
      }
    })
  },[])

  useEffect(()=> {
    fetch("/users")
    .then(r => r.json())
    .then(data => {
      setUsers(data)
    })
  }, [])

  function handleUserLogin(user) {
    setCurrentUser(user)
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/login">
            <LoginPage handleUserLogin={handleUserLogin}/>
          </Route>
          <Route path="/signup">
            <SignUpPage/>
          </Route>
          <Route path="/home">
            <h1>Page Count: {count}</h1>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
