import React, { useState, useEffect , useContext } from "react"
import './App.css';
import { BrowserRouter, Switch, Route , Redirect} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignupPage";
import Home from "./components/Home";
import NewBudget from "./components/NewBudget";
import BudgetDetails from "./components/BudgetDetails";
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";
import WeeklyInitiatives from "./components/WeeklyInitiatives";
import NewInitiative from "./components/NewInitiative";
import { AppContext , AppProvider } from "./components/AppContext";

function App() {

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || '');
  const [budgets, setBudgets] = useState([]);
  const [budgetList, setBudgetList] = useState([]);
  const [currentBudget, setCurrentBudget] = useState(JSON.parse(localStorage.getItem('currentBudget')) || '');
  const [authCheckCompleted, setAuthCheckCompleted] = useState(false)
  

  console.log(currentUser)

  //Auth fetch to determine if user is logged in and set if yes
  useEffect(() => {
    fetch("/auth")
    .then(res => {
      if(res.ok) {
        res.json().then(user => setCurrentUser(user))
      }
    })
    .finally(() => setAuthCheckCompleted(true));
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
  }, [])

  useEffect(() => {
    fetch("/home")
    .then((r) => r.json())
    .then((data) => setBudgetList(data))
  }, []);

  function handleSetCurrentBudget(budgetName) {
    setCurrentBudget(budgetName);
    localStorage.setItem('currentBudget', JSON.stringify(budgetName));
  }

  function handleUserLogin(user) {
    setCurrentUser(user)
    localStorage.setItem('currentUser', JSON.stringify(user))
  }
  
  function handleLogout() {
    setCurrentUser('');
    localStorage.removeItem('currentUser');
  }

   //deactivate user from db
  const onDeleteUser = (id) => {
    localStorage.removeItem('currentUser');
    return fetch(`users/${id}`, { method: 'DELETE' })
  }

   //edit user profile
  const onEditUserProfile = (modifiedUser) => {
    const updateUser = users.map(user => currentUser.id === user.id ? modifiedUser : user)
    setCurrentUser(updateUser)
    localStorage.setItem('currentUser', JSON.stringify(modifiedUser))
  }

  // const onDeleteBudget = (currentUserId) => {
  //   const updatedBudgets = budgets.filter((budget) => budget.user_id !== currentUserId)
  //   setBudgetList(updatedBudgets)
  // }

  const onEditBudget = (currentUserId) => {
    const updatedBudgets = budgets.filter((budget) => budget.user_id !== currentUserId)
    setBudgetList(updatedBudgets)
  }

  if (!authCheckCompleted) {
    return <div>Checking Authentication...</div>
  }
  
  return (
    <AppProvider>
    <BrowserRouter>
      <div className="App">
        <Header currentUser={currentUser} handleLogout={handleLogout}/>
        <Switch>
          <Route path="/home">
            <Home
            currentUser={currentUser}
            budgets={budgets}
            budgetList={budgetList}
            handleSetCurrentBudget={handleSetCurrentBudget}
            currentBudget={currentBudget}
            />
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
            handleSetCurrentBudget={handleSetCurrentBudget}
            budgetList={budgetList}
            budgets={budgets}
            setBudgets={setBudgets}
            setBudgetList={setBudgetList}
            />
          </Route>
          <Route path="/budgets/:budget">
            <BudgetDetails
            currentUser={currentUser}
            currentBudget={currentBudget}
            budgets={budgets}
            handleSetCurrentBudget={handleSetCurrentBudget}
            onEditBudget={onEditBudget}
            />
          </Route>
          <Route path="/initiatives">
            <WeeklyInitiatives
            currentUser={currentUser}
            />
          </Route>
          <Route path="/newinitiative">
            <NewInitiative
            currentUser={currentUser}
            />
          </Route>
          <Route path="/profile">
            <UserProfile
            currentUser={currentUser}
            onDeleteUser={onDeleteUser}
            onEditUserProfile={onEditUserProfile}
            handleSetCurrentBudget={handleSetCurrentBudget}/>
          </Route>
          <Route path="/">
            {currentUser ? <Redirect to="/home" /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
    </AppProvider>
  );
}

export default App;
