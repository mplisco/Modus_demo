import React from "react";
// import BudgetCard from "./BudgetCard";
import {Link} from 'react-router-dom';



function Home({budgets, budgetList}) {

    console.log(budgetList)
    console.log(budgets)


    // const budgetArray = budgetList.map((budgetList) => (
        
        
    //     console.log(budgetList)
        // <Link key={budgetList.id} to ={`/posts/${post.id}`} >
        //     <BudgetCard
        //         key={budgetList.id}
        //         budget={budgetList}
        //     />
        // </Link>
    // ))

    return (
        <div>
            {budgetList}
        </div>
    )
}

export default Home