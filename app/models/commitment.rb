class Commitment < ApplicationRecord

   has_many :budgets
   has_many :users, through: :budgets
   belongs_to :category

   validates :commitment_name, :category_id, presence: true
end
