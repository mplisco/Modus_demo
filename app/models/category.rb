class Category < ApplicationRecord

    has_many :commitments

    validates :category_name, presence: true
end
