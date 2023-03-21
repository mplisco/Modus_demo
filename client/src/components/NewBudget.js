import React, {useState} from 'react';
import { Button, Form, TextArea , Container, Dropdown } from 'semantic-ui-react'
import { Redirect, Route, useHistory } from "react-router-dom";


function NewBudget ({currentUser , setBudgets}) {
    const [budgetName, setBudgetName ] = useState('')
    const history = useHistory();

    function handleSubmit(e) {
        console.log('submitted')
        console.log({budgetName})
        console.log({currentUser})
        e.preventDefault();

        const newBudget = {
            user_id: currentUser.id,
            budget_name: budgetName,
            commitment_id: 1,
            commitment_hours: 40,
            priority: 0
        }

        fetch("/budgets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBudget),
        })
        // .then(resp => resp.json())
        .then(res => {
            if(res.status === 201) {
            fetch("/budgets")
            .then((r) => r.json())
            .then((data) => setBudgets(data))
            
            history.push('/home')
        } else {
            res.json().then((errorData)=> alert(errorData.errors))
            }
        });
    }

    return (
        <>
        <h1>New Budget Page</h1>
        <div class="ui centered grid">
        <div class="eight wide column">
            <div class="ui segment">
                <Form onSubmit= {handleSubmit}>
                    <Form.Field>
                    <label>Budget Name</label>
                    <input placeholder='Budget Name' value={budgetName} onChange={(e) => setBudgetName(e.target.value)} />
                    </Form.Field>
                </Form>
            </div>
        </div>
        </div>
        <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </>
    )
}

export default NewBudget;