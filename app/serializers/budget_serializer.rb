class BudgetSerializer < ActiveModel::Serializer
  attributes :id, :budget_name, :user_id, :commitment_id, :commitment_name, :commitment_hours, :priority, :category_id

  def category_id
    object.commitment.category_id
  end
  
  def commitment_name
    object.commitment.commitment_name
  end
end
