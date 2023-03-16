class Budget < ApplicationRecord
    belongs_to :users
    belongs_to :commitments

    validates :budget_name, :user_id, :commitment_id, :commitment_hours, presence: true
    validates :commitment_hours, numericality: { less_than_or_equal_to: 168 }
end
