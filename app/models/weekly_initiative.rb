class WeeklyInitiative < ApplicationRecord
    belongs_to :user
    belongs_to :week
    belongs_to :priority, optional: true
    belongs_to :category, optional: true
    belongs_to :commitment, optional: true
    belongs_to :budget, optional: true
  
    has_many :progress_logs
  
    validates :user_id, :week_id, :initiative_name, :initiative_type, :initiative_target, :open, presence: true
  end
  