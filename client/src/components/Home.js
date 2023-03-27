import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { List, Button, Segment } from "semantic-ui-react";
import { AppContext } from "./AppContext";

function Home({ budgets, budgetList, currentBudget, setCurrentBudget }) {

  const handleClick = (e) => {
    const budgetName = e.target.innerText;
    setCurrentBudget(budgetName);
  };


  const budgetHours = (budgetName) => {
    const matchingBudgets = budgets.filter((budget) => budget.budget_name === budgetName);
    const totalHours = matchingBudgets.reduce((total, {commitment_hours}) => total + commitment_hours, 0);
    return totalHours;
  };


  const budgetlist =
    budgetList.length > 0 ? (
      budgetList.map((budget) => (
        <List.Item key={budget}>
            <Link to={`/budgets/${budget}`} onClick={handleClick}>
            <Segment textAlign="left" size="big" >
              <h2>{budget}</h2>
              <p>{budgetHours(budget)} Hours</p>
            </Segment>
            </Link>
        </List.Item>
      ))
    ) : (
      <Segment placeholder textAlign="center">
        <h4>
        You have not yet created any Time Budgets.
        <br></br>
        Select 'Create New Budget' below to get started.
        </h4>
      </Segment>
    );

  return (
    <>
      <h1>My Weekly Time Budgets</h1>
      <div class="ui centered grid">
        <div class="eight wide column">
            <List divided relaxed>
                {budgetlist}
            </List>
        </div>
    </div>
    <br></br>
        <Button primary as={Link} to="/newbudget">
                Create New Budget
        </Button>
    </>
  );
}

export default Home;
