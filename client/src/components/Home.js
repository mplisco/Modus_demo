import React from "react";
// import BudgetCard from "./BudgetCard";
import {Link} from 'react-router-dom';
import { List , Button } from "semantic-ui-react";



function Home({budgets, budgetList}) {

    console.log(budgetList)
    console.log(budgets)


    const budgetlist = budgetList.map((budget) => (
       <>
       <Link to="/budgetdeet">
            <List.Item>
                {budget}
            </List.Item>
        </Link>
        </>
    ))



    return (
        <>
        <h1>My Budgets</h1>
        <div>
            <List>
                {budgetlist}
            </List>
        </div>
        <Button as={Link} to ="/newbudget">Create New Budget</Button>
        </>
    )
}

export default Home