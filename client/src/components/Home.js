import React from "react";
// import BudgetCard from "./BudgetCard";
import {Link} from 'react-router-dom';
import { List } from "semantic-ui-react";



function Home({budgets, budgetList}) {

    console.log(budgetList)
    console.log(budgets)


    const budgetlist = budgetList.map((budget) => (
        <List.Item>
            {budget}
        </List.Item>
    ))
   



    return (
        <>
        <h1>My Budgets</h1>
        <div>
            <List>
                {budgetlist}
            </List>
        </div>
        </>
    )
}

export default Home