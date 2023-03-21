import React from "react";


function BudgetDetails ( {currentUser , currentBudget, budgets, onDeleteBudget}) {


   const categories = [
    { id: 1, name: "Work & Professional" },
    { id: 2, name: "Sleep & Self-Care" },
    { id: 3, name: "Health & Wellness" },
    { id: 4, name: "Hobbies & Interests" },
    { id: 5, name: "Family & Social" },
    { id: 6, name: "Other" },
  ];

  const priority = [
    { id: 0, name: "Fixed"},
    {id: 1, name: "High"},
    {id: 2, name: "Medium"},
    {id: 3, name: "Low"}
  ]

  console.log(budgets);

  const categoryBudgetCommits = categories.map((category) => {
    const budgetCommits = budgets.filter(
      (budget) => budget.budget_name === currentBudget && budget.category_id === category.id
    );
    console.log(category.name, budgetCommits);
    return { category, budgetCommits };
  });

  console.log(categoryBudgetCommits);

const budgetHours =  budgets
.filter((budget) => budget.budget_name === currentBudget)
.reduce((total , budget) => total + budget.commitment_hours, 0)

const surpDef = (168 - budgetHours)

  return (
    <>
    <h1>{currentBudget}</h1>
    <h2>Total Budget Hours: {budgetHours} / 168 </h2>
    <h3>Surplus/(Deficit): {surpDef}</h3>
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

export default BudgetDetails;
