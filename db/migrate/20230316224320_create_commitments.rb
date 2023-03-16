class CreateCommitments < ActiveRecord::Migration[7.0]
  def change
    create_table :commitments do |t|
      t.string :commitment_name
      t.integer :category_id

      t.timestamps
    end
  end
end
