import React, { useState, useEffect }  from "react";
import { useHistory } from "react-router-dom";
import { Button  , Modal , Form} from 'semantic-ui-react';
import CommitmentModal from "./CommitmentModal";
import NewCommitmentModal from "./NewCommitmentModal";


function BudgetDetails ( {currentUser , currentBudget, setCurrentBudget , budgets, setBudgets , onDeleteBudget , onEditBudget}) {

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
  const priorityArray = [
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


//Delete Button and Delete Handler Function

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


//Edit Budget Name Modal & Functions

const [editModalOpen, setEditModalOpen] = useState(false)

const handleEdit = () => {
  setEditModalOpen(true);
}

const handleEditFormSubmit = async (budgetName) => {
  const editBudgets = budgets.filter((budget) => budget.budget_name === currentBudget);

  try {
    await Promise.all(editBudgets.map(async (budget) => {
      console.log(budget)
      const response = await fetch(`/budgets/${budget.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({budget_name: budgetName})
      })
      if (response.ok) {
        onEditBudget(budget.id);
      } else {
        throw new Error(`Failed to edit budget: ${budget.id}`);
      }
    }));

    const updatedBudget = {
      ...currentBudget,
      budget_name: budgetName
    };
    setCurrentBudget(updatedBudget)
    setEditModalOpen(false);
  } catch (error) {
    console.error(error);
  }
};

const editModal = (
  <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
    <Modal.Header>Edit Budget Name</Modal.Header>
    <Modal.Content>
    <Form onSubmit={(e) => {
      e.preventDefault();
      const budgetName = e.target.elements.budgetName.value;
      handleEditFormSubmit(budgetName);
    }}>
        <Form.Field>
          <label>New Budget Name</label>
          <input placeholder="New Budget Name" name="budgetName"/>
        </Form.Field>
        <Button primary type="submit">Submit</Button>
      </Form>
    </Modal.Content>
  </Modal>
)

const editButton = <Button secondary onClick={handleEdit}>Edit Budget</Button>

//Edit Commitment Modal and Form -- See also CommitmentModal

const [selectedCommitmentId, setSelectedCommitmentId] = useState(null);


const handleCommitmentClick = (commitmentId) => {
  setSelectedCommitmentId(commitmentId);
};

//Handle Add new Commitment

const [newCommitmentModalOpen , setNewCommitmentModalOpen] = useState(false)

const handleAdd = () => {
  setNewCommitmentModalOpen(true);
}

const addCommitButton = <Button primary onClick={handleAdd}>Add New Commitment</Button>

return (
    <>
    {editModal}
    <h1>{currentBudget}</h1>
    <h2>Total Budget Hours: {budgetHours} / 168 </h2>
    <h3>Surplus/(Deficit): {surpDef}</h3>
    <div>
      {addCommitButton}
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
            alignItems: "center",
            }}
            >
          <h2 align="left">{category.name}</h2>
          <h3 align="right">Hours</h3>
          </div>
          <ul>
            {budgetCommits.map((commitment) => (
              <li key={commitment.id} onClick={()=> handleCommitmentClick(commitment.id)}>
                <h3>{commitment.commitment_name}</h3>
                <p>Priority: {priorityArray.find(p => p.id === commitment.priority)?.name}</p>
                <p>{commitment.commitment_hours} Hours</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    </div>
        {selectedCommitmentId && (
          <CommitmentModal
          open={true}
          commitment={budgets.find((budget) => budget.id === selectedCommitmentId)}
          priorityArray={priorityArray}
          onClose={() => setSelectedCommitmentId(null)}
          categories={categories}
        />
      )}
       <div>
      <NewCommitmentModal
      open={newCommitmentModalOpen}
      onClose={() => setNewCommitmentModalOpen(false)}
      priorityArray={priorityArray}
      categories={categories}
      currentBudget={currentBudget}
      currentUser={currentUser}
      >
      </NewCommitmentModal>
    </div>
    </>
  );
}

export default BudgetDetails
