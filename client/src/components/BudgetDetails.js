import React, { useState, useEffect }  from "react";
import { useHistory } from "react-router-dom";
import { Button  , Modal , Form} from 'semantic-ui-react';
import CommitmentModal from "./CommitmentModal";


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
    })
    )
    console.log('budget successfully deleted');
    history.push('/home');
  } catch (error) {
    console.error(error);
  }
};

const deleteButton = <Button negative onClick={handleDelete}>Delete Budget</Button>

//TO-DO - Edit Budget Name
const handleEdit = () => {
  console.log('edit') }


const editButton = <Button primary onClick={handleEdit}>Edit Budget</Button>

const [modalOpen, setModalOpen] = useState({})

const handleClick = (commitmentId) => {
  setModalOpen((prev) => ({...prev, [commitmentId]: true}));
}

const handleClose = (commitmentId) => {
  setModalOpen((prev) => ({ ...prev, [commitmentId]: false }));
};

const handleFormSubmit = (hours, priority, commitmentId) => {
  // code to update commitment with new hours and priority
};

  return (
    <>
    <h1>{currentBudget}</h1>
    <h2>Total Budget Hours: {budgetHours} / 168 </h2>
    <h3>Surplus/(Deficit): {surpDef}</h3>
    <div>
      {editButton}
      {deleteButton}
    </div>
    <br></br>
    <div class="ui centered grid">
      <div class="ten wide column">
      {categoryBudgetCommits.map(({ category, budgetCommits }) => (
        <div key={category.id}>
          <div class="ui raised segment"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
            }}
            >
          <h2 align="left">{category.name}</h2>
          <h3 align="right">Hours</h3>
          </div>
          <ul>
            {budgetCommits.map((commitment) => (
              <li key={commitment.id} onClick={()=> handleClick(commitment.id)}>
                <h3>{commitment.commitment_name}</h3>
                <p>Priority: {priority.find(p => p.id === commitment.priority)?.name}</p>
                <p>{commitment.commitment_hours} Hours</p>
                <CommitmentModal
                  open={modalOpen[commitment.id]}
                  commitment={commitment}
                  priority={priority}
                  onClose={()=> handleClose(commitment.id)}
                  onFormSubmit={handleFormSubmit}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    </div>
    </>
  );
}

export default BudgetDetails
