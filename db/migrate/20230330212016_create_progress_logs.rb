class CreateProgressLogs < ActiveRecord::Migration[7.0]
  def change
    create_table :progress_logs do |t|

      t.integer :weekly_initiative_id
      t.datetime :log_date
      t.float :log_amount
      t.text :log_description

      t.timestamps
    end
  end
end
