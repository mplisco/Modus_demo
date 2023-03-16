class CreateBudgets < ActiveRecord::Migration[7.0]
  def change
    create_table :budgets do |t|
      t.string :budget_name
      t.integer :user_id
      t.integer :commitment_id
      t.float :commitment_hours
      t.integer :priority

      t.timestamps
    end
  end
end
