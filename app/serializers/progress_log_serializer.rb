class ProgressLogSerializer < ActiveModel::Serializer
  attributes :id, :weekly_initiative_id, :log_date, :log_amount
end
