class BudgetSerializer < ActiveModel::Serializer
  attributes :id, :budget_name, :user_id, :commitment_id, :commitment_hours
end
