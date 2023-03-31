class WeeklyInitiativesController < ApplicationController
skip_before_action :authorized , only: [:index, :show]

def index
    weekly_initiatives = WeeklyInitiative.all
    render json: weekly_initiatives, status: :ok
end

def user_weekly_initiatives
    weekly_initiatives = WeeklyInitiative.where(user_id: session[:user_id])
    render json: weekly_initiatives, status: :ok
end

def show
    weekly_initiative = find_weekly_initiative
    render json: weekly_initiative, status: :ok
end

def create
    weekly_initiative = WeeklyInitiative.create!(weekly_initiative_params)
    render json: weekly_initiative, status: :created
end

def update
    weekly_initiative = find_weekly_initiative
    weekly_initiative.update!(weekly_initiative_params)
    render json: weekly_initiative, status: :accepted
end

def destroy
    weekly_initiative = find_weekly_initiative
    weekly_initiative.destroy!
    head :no_content
end

private

def find_weekly_initiative
    WeeklyInitiative.find_by!(id: params[:id])
end

def weekly_initiative_params
    params.permit(:user_id, :week_id , :initiative_name, :initiative_type, :initiative_target, :open, :budget_id, :category_id, :commitment_id, :priority_id )
end
end