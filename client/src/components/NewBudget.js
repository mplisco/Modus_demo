import React, { useState } from "react";
import {
  Button,
  Form,
  Container,
  Dropdown,
  Checkbox
} from "semantic-ui-react";
import { useHistory } from "react-router-dom";

function NewBudget({
  currentUser,
  setBudgets,
  setCurrentBudget,
  handleSetCurrentBudget,
  setBudgetList,
  budgetList,
  budgets
}) {
  const [budgetName, setBudgetName] = useState("");
  const [templateBudget, setTemplateBudget] = useState(null);
  const history = useHistory();
  const [useTemplate , setUseTemplate] = useState(false)

  function handleToggleUseTemplate() {
    setUseTemplate(!useTemplate)
    setTemplateBudget(null)
  }


  const budgetOptions = budgetList.map((budget) => ({
    key: budget,
    text: budget,
    value: budget,
  }));

  function handleTemplateSelection(e, data) {
    setTemplateBudget(data.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
  
    if (!templateBudget) {
      // Create a new budget with default commitment when no template is selected
      const newBudget = {
        user_id: currentUser.id,
        budget_name: budgetName,
        commitment_id: 1,
        commitment_hours: 40,
        priority: 0,
      };
  
      const response = await fetch("/budgets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBudget),
      });
  
      if (response.status === 201) {
        updateBudgetsAndNavigate(budgetName);
      } else {
        const errorData = await response.json();
        alert(errorData.errors);
      }
    } else {
      // Create a new budget using existing budget as a template
      const templateBudgets = budgets.filter(
        (budget) => budget.budget_name === templateBudget
      );
  
      try {
        await Promise.all(
          templateBudgets.map(async (budget) => {
            const newBudget = {
              ...budget,
              budget_name: budgetName,
              user_id: currentUser.id,
            };
  
            const response = await fetch("/budgets", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newBudget),
            });
  
            if (response.status !== 201) {
              throw new Error(`Failed to create budget from template`);
            }
          })
        );
  
        updateBudgetsAndNavigate(budgetName);
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function updateBudgetsAndNavigate(budgetName) {
    const budgetData = await fetch("/budgets");
    const budgetJson = await budgetData.json();
    setBudgets(budgetJson);

    const budgetListData = await fetch("/home");
    const budgetListJson = await budgetListData.json();
    setBudgetList(budgetListJson);

    handleSetCurrentBudget(budgetName);
    history.push(`/budgets/${budgetName}`);
  }

  return (
    <Container>
      <h1>Add New Time Budget</h1>
      <div className="ui centered grid">
        <div className="eight wide column">
          <div className="ui segment">
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label>New Budget Name</label>
                <input
                  placeholder="New Budget Name"
                  value={budgetName}
                  onChange={(e) => setBudgetName(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Use Existing Time Budget as Template</label>
                <Checkbox
                  toggle
                  onChange={handleToggleUseTemplate}
                />
               </Form.Field>
               <Form.Field>
                <Dropdown
                  placeholder="Select a Template"
                  fluid
                  selection
                  options={budgetOptions}
                  value={templateBudget}
                  onChange={handleTemplateSelection}
                  disabled={!useTemplate}
                />
              </Form.Field>
              <Button primary type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <br />
    </Container>
  );
  }
export default NewBudget;