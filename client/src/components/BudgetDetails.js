import React, { useState, useEffect }  from "react";
import { useHistory } from "react-router-dom";
import { Button } from 'semantic-ui-react'


function BudgetDetails ( {currentUser , currentBudget, budgets, onDeleteBudget}) {

  const history = useHistory();
  //Defining Categories for Budget Presentation
  const categories = [
    { id: 1, name: "Work & Professional" },
    { id: 2, name: "Sleep & Self-Care" },
    { id: 3, name: "Health & Wellness" },
    { id: 4, name: "Hobbies & Interests" },
    { id: 5, name: "Family & Social" },
    { id: 6, name: "Other" },
  ];

//Defining Priorities for Budget Presentation
  const priority = [
    {id: 0, name: "Fixed"},
    {id: 1, name: "High"},
    {id: 2, name: "Medium"},
    {id: 3, name: "Low"}
  ]

  //Matching Commitment Categories to those outlined above
  const categoryBudgetCommits = categories.map((category) => {
    const budgetCommits = budgets.filter(
      (budget) => budget.budget_name === currentBudget && budget.category_id === category.id
    );
    console.log(category.name, budgetCommits);
    return { category, budgetCommits };
  });

  console.log(categoryBudgetCommits);

//Total Commitment Hours from all Budget Commitments and Calculating Surplus/Deficit
const budgetHours =  budgets
.filter((budget) => budget.budget_name === currentBudget)
.reduce((total , budget) => total + budget.commitment_hours, 0)

const surpDef = (168 - budgetHours)

//Delete Button and Delete Function
const handleDelete = async () => {
  console.log('deleted')
  const deleteBudgets = budgets.filter((budget) => budget.budget_name === currentBudget);
  
  try {
    await Promise.all(deleteBudgets.map(async (budget) => {
      console.log(budget)
      const response = await fetch(`/budgets/${budget.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
      if (response.ok) {
        onDeleteBudget(budget.id);
      } else {
        throw new Error(`Failed to delete budget ${budget.id}`);
      }
    }))
    console.log('all budgets deleted');
    history.push('/home');
  } catch (error) {
    console.error(error);
  }
};



  const deleteButton = <Button negative onClick={handleDelete}>Delete Budget</Button>

const handleEdit = () => {
  console.log('edit') }


const editButton = <Button primary onClick={handleEdit}>Edit Budget</Button>

  return (
    <>
    <h1>{currentBudget}</h1>
    <h2>Total Budget Hours: {budgetHours} / 168 </h2>
    <h3>Surplus/(Deficit): {surpDef}</h3>
    <div>
      {editButton}{deleteButton}
    </div>
    <div>
      {categoryBudgetCommits.map(({ category, budgetCommits }) => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          <ul>
            {budgetCommits.map((commitment) => (
              <li key={commitment.id}>
                <h3>{commitment.commitment_name}</h3>
                <p>Priority: {priority.find(p => p.id === commitment.priority)?.name}</p>
                <p>{commitment.commitment_hours}</p>
              </li>
            ))}
          </ul>
        </div>
        
      ))}
    </div>
     
    </>
  );
}

export default BudgetDetails
