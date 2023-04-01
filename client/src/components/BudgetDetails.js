import { lineHeight } from "@mui/system";
import React, { useState, useEffect }  from "react";
import { useHistory } from "react-router-dom";
import { Button  , Modal , Form , Accordion, Segment , Icon} from 'semantic-ui-react';
import CommitmentModal from "./CommitmentModal";
import NewCommitmentModal from "./NewCommitmentModal";


function BudgetDetails ( { setBudgetList , currentUser , currentBudget, setCurrentBudget , handleSetCurrentBudget ,  budgets, setBudgets , onEditBudget}) {

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
    {id: 1, name: "High Priority"},
    {id: 2, name: "Medium Priority"},
    {id: 3, name: "Low Priority"}
  ]

  const [activeIndexes, setActiveIndexes] = useState(categories.map((_, index) => index));

  const handleAccordionClick = (index) => {
    const newIndex = [...activeIndexes];
    if (newIndex.includes(index)) {
      newIndex.splice(newIndex.indexOf(index), 1);
    } else {
      newIndex.push(index);
    }
    setActiveIndexes(newIndex);
  };

  const priorityColorClass = (priority , surpDef) => {
    if (surpDef < 0 && priority === 3) {
      return "red";
    } else if (priority === 0) {
      return "black";
    }
    else {
      return "";
    }
  };

  const commitmentRowClass = (priority , surpDef) => {
    if (surpDef < 0 && priority === 3) {
      // Highlight Low priority commitments if surpDef is negative
      return "negative";
    } else {
      return "";
    }
  };


  //Matching Commitment Categories to those outlined above
  const categoryBudgetCommits = categories.map((category) => {
    const budgetCommits = budgets.filter(
      (budget) => budget.budget_name === currentBudget && budget.category_id === category.id
    );
    console.log(category.name, budgetCommits);
    const totalHours = budgetCommits.reduce((total, {commitment_hours}) => total + commitment_hours, 0)
    return { category, budgetCommits , totalHours};
  });

  console.log(categoryBudgetCommits);

//Total Commitment Hours from all Budget Commitments and Calculating Surplus/Deficit
const budgetHours =  budgets
.filter((budget) => budget.budget_name === currentBudget)
.reduce((total , budget) => total + budget.commitment_hours, 0)

const surpDef = (168 - budgetHours)

const surpDefColorClass = surpDef < 0 ? "red" : "black"
const surpDefWord = surpDef < 0 ? "Total Time Deficit" : "Total Time Surplus"


//Delete Button and Delete Handler Function

const handleDelete = async () => {
  const deleteBudgets = budgets.filter((budget) => budget.budget_name === currentBudget);

  try {
    await Promise.all(deleteBudgets.map(async (budget) => {
      const response = await fetch(`/budgets/${budget.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
      if (response.ok) {
        fetch("/budgets")
        .then((r) => r.json())
            .then((data) => setBudgets(data))
            fetch("/home")
            .then((r) => r.json())
            .then((data) => setBudgetList(data))

            history.push(`/home`)
            window.location.reload()
      } else {
        throw new Error(`Failed to delete budget ${budget.id}`);
      }
    })
    )
    console.log('budget successfully deleted');
  } catch (error) {
    console.error(error);
  }
};

const deleteButton = <Button negative onClick={handleDelete} style={{marginBottom: "2em"}}>Delete Time Budget</Button>


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
        // onEditBudget(budget.id);
        fetch("/budgets")
            .then((r) => r.json())
            .then((data) => setBudgets(data))
            .then(handleSetCurrentBudget(budgetName))
            fetch("/home")
            .then((r) => r.json())
            .then((data) => setBudgetList(data))

            .then(handleSetCurrentBudget(budgetName))
            window.location.reload()
      } else {
        throw new Error(`Failed to edit budget: ${budget.id}`);
      }
    }));

    const updatedBudget = {
      ...currentBudget,
      budget_name: budgetName
    };
    handleSetCurrentBudget(budgetName)
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

const editButton = <Button secondary onClick={handleEdit}>Edit Time Budget</Button>

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

const addCommitButton = <Button primary onClick={handleAdd}>New Time Commitment</Button>

return (
    <>
    {editModal}
    <h1>{currentBudget}</h1>
    <h2>Total Budget Hours: {budgetHours} / 168 </h2>
    <h3 style={{color: surpDefColorClass}}>
      {surpDefWord}: <br></br>
      {surpDef} Hours
    </h3>
    <div>
      {addCommitButton}
      {editButton}
    </div>
    <br></br>
    <div class="ui centered grid">
  <div class="ten wide column">
    {categoryBudgetCommits.map(({ category, budgetCommits, totalHours }, index) => (
      <div key={category.id}>
        <Accordion styled fluid>
          <Accordion.Title
            active={activeIndexes.includes(index)}
            index={index}
            onClick={() => handleAccordionClick(index)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1.5em 1em",
            }}
          >
            <div class="vertically fitted item" style={{
              display: "flex",
              alignItems: "center",
              lineHeight: 1 ,
              alignSelf: "center"
            }}>
              <h2 style={{marginRight: "0.5em"}}>{category.name}</h2>
              <Icon name={activeIndexes.includes(index) ? "chevron up" : "chevron down"} 
              style={{ 
                position: 'relative',
                top: '-6px'}} />
            </div>
            <div class="ui tiny statistic vertically fitted item" style={{ marginBottom: ".25em", alignSelf:"center" }}>
              <div class="value">{totalHours}</div>
              <div class="label">Hours</div>
            </div>
          </Accordion.Title>
          <Accordion.Content
            active={activeIndexes.includes(index)}
            style={{
              padding: 0,
            }}
          >
            <div class="eight wide column" style={{ marginLeft: "auto", marginRight: "auto" }}>
              <table class="ui striped table" style={{ width: "100%", margin: "0" }}>
                <tbody>
                  {budgetCommits.map((commitment) => (
                    <tr
                      key={commitment.id}
                      onClick={() => handleCommitmentClick(commitment.id)}
                      className={commitmentRowClass(commitment.priority, surpDef)}
                    >
                      <td class="collapsing">
                        <a>
                          <h3>{commitment.commitment_name}</h3>
                        </a>
                      </td>
                      <td>
                        <div class={`ui small ${priorityColorClass(commitment.priority, surpDef)} label`}>
                          {priorityArray.find((p) => p.id === commitment.priority)?.name}
                        </div>
                      </td>
                      <td class="right aligned collapsing">
                        <a>
                          <h4>{commitment.commitment_hours} Hours</h4>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Accordion.Content>
        </Accordion>
        <br />
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
    <div style={{marginBottom: "1em"}}>
    {deleteButton}
    </div>
    </>
  );
}

export default BudgetDetails

