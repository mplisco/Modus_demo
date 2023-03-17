class Budget < ApplicationRecord
    belongs_to :user
    belongs_to :commitment

    validates :budget_name, :user_id, :commitment_id, :commitment_hours, :priority, presence: true
    validates :commitment_hours, numericality: { less_than_or_equal_to: 168 }
    validates :priority, numericality: { in: 0..3 }
end
