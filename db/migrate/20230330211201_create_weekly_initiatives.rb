class CreateWeeklyInitiatives < ActiveRecord::Migration[7.0]
  def change
    create_table :weekly_initiatives do |t|
      t.integer :user_id
      t.string :initiative_name
      t.integer :initiative_type
      t.integer :budget_id
      t.integer :category_id
      t.integer :commitment_id
      t.float :initiative_target
      t.integer :priority_id
      t.integer :week_id
      t.boolean :open

      t.timestamps
    end
  end
end
