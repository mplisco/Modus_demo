class WeeklyInitiativeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :initiative_name, :initiative_type, :budget_id, :category_id, :commitment_id, :initiative_target, :priority_id, :week_id, :progress_logs
end
