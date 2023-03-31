class ProgressLog < ApplicationRecord

    belongs_to :weekly_initiative



    validates :weekly_initiative_id, :log_date , :log_amount , presence: true

end
