import React, { useState, useEffect } from "react"
import './App.css';
import { BrowserRouter, Switch, Route , Redirect} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignupPage";
import Home from "./components/Home";
import NewBudget from "./components/NewBudget";
import BudgetDetails from "./components/BudgetDetails";
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";

function App() {

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [budgets, setBudgets] = useState([]);
  const [budgetList, setBudgetList] = useState([]);
  const [currentBudget, setCurrentBudget] = useState('');

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

  useEffect(() => {
    fetch("/mybudgets")
    .then((r) => r.json())
    .then((data) => setBudgets(data))
  }, []);

  useEffect(() => {
    fetch("/home")
    .then((r) => r.json())
    .then((data) => setBudgetList(data))
  }, []);

  function handleUserLogin(user) {
    setCurrentUser(user)
  }

   //deactivate user from db
   const onDeleteUser = (id) => {
    const updatedUser = users.filter((currentUser) => currentUser.id !== id)
    setCurrentUser(updatedUser)
  }

   //edit user profile
  const onEditUserProfile = (modifiedUser) => {
    const updateUser = users.map(user => currentUser.id === user.id ? modifiedUser : user)
    setCurrentUser(updateUser)
  }

  const onDeleteBudget = (currentUserId) => {
    const updatedBudgets = budgets.filter((budget) => budget.user_id !== currentUserId)
    setBudgetList(updatedBudgets)
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Header currentUser={currentUser}/>
        <Switch>
          <Route path="/home">
            <Home
            budgets={budgets}
            budgetList={budgetList}
            setCurrentBudget={setCurrentBudget}
            currentBudget={currentBudget}/>
          </Route>
          <Route path="/login">
            <LoginPage handleUserLogin={handleUserLogin}/>
          </Route>
          <Route path="/signup">
            <SignUpPage/>
          </Route>
          <Route path="/newbudget">
            <NewBudget
            currentUser={currentUser}
            setCurrentBudget={setCurrentBudget}/>
          </Route>
          <Route path="/:budget">
            <BudgetDetails
            currentUser={currentUser}
            currentBudget={currentBudget}
            budgets={budgets}
            onDeleteBudget={onDeleteBudget}/>
          </Route>
          <Route path="/profile">
            <UserProfile
            currentUser={currentUser}
            onDeleteUser={onDeleteUser}
            onEditUserProfile={onEditUserProfile}/>
          </Route>
          <Route path='*'>
            <Redirect to="/home"/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
