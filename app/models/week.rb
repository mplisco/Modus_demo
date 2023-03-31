class Week < ApplicationRecord

    has_many :weekly_initiatives

    validates :start_date , :end_date , presence: true
end
