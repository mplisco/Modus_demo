class Priority < ApplicationRecord

    has_many :budgets
    has_many :weekly_initiatives

    validates :priority_name, presence: true
end
