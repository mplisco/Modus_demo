// import React, {useState} from 'react';
// import { Button, Form, TextArea , Container, Dropdown } from 'semantic-ui-react'
// import { Redirect, Route, useHistory } from "react-router-dom";


// function NewBudget ({currentUser , setBudgets , setCurrentBudget , handleSetCurrentBudget , setBudgetList}) {
//     const [budgetName, setBudgetName ] = useState('')
//     const history = useHistory();

//     function handleSubmit(e) {
//         console.log('submitted')
//         console.log({budgetName})
//         console.log({currentUser})
//         // setCurrentBudget(budgetName)

//         e.preventDefault();

//         const newBudget = {
//             user_id: currentUser.id,
//             budget_name: budgetName,
//             commitment_id: 1,
//             commitment_hours: 40,
//             priority: 0
//         }

//         fetch("/budgets", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(newBudget),
//         })
    
//         .then(res => {
//             if(res.status === 201) {
//             fetch("/budgets")
//             .then((r) => r.json())
//             .then((data) => setBudgets(data))
//             fetch("/home")
//             .then((r) => r.json())
//             .then((data) => setBudgetList(data))
            
//             handleSetCurrentBudget(budgetName)
//             history.push(`/budgets/${budgetName}`)
//             window.location.reload()
//         } else {
//             res.json().then((errorData)=> alert(errorData.errors))
//             }
//         });
//     }

//     return (
//         <>
//         <h1>Create New Budget</h1>
//         <div class="ui centered grid">
//         <div class="eight wide column">
//             <div class="ui segment">
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Field>
//                     <label>New Budget Name</label>
//                     <input placeholder='New Budget Name' value={budgetName} onChange={(e) => setBudgetName(e.target.value)} />
//                     </Form.Field>
//                 </Form>
//             </div>
//         </div>
//         </div>
//         <br></br>
//         <Button primary type="submit" onClick={handleSubmit}>Submit</Button>
//         </>
//     )
// }

// export default NewBudget;