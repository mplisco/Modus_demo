import React from "react";
import {Link} from 'react-router-dom';
import { List , Button } from "semantic-ui-react";



function Home({budgets, budgetList, currentBudget, setCurrentBudget}) {

    console.log(budgetList)
    console.log(budgets)


    const handleClick = (e) => {
        const budgetName = e.target.innerText
        setCurrentBudget(budgetName)
        console.log(currentBudget)
    }
    
    const budgetlist = budgetList.map((budget) => (
       <>
       <Link key={budget} to={`/${budget}`} onClick={handleClick}>
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