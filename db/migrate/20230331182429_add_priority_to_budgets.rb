class AddPriorityToBudgets < ActiveRecord::Migration[7.0]
  def change
    add_column :budgets, :priority_id, :integer
  end
end
