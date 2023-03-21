class BudgetsController < ApplicationController
    skip_before_action :authorized, only: [:index, :show]

    def index
        budgets = Budget.all
        render json: budgets, status: :ok
    end

    def user_budgets
        budgets = Budget.where(user_id: session[:user_id])
        render json: budgets, status: :ok
    end

    def budget_list
        budgets = Budget.where(user_id: session[:user_id])
        budget_names = budgets.pluck(:budget_name)
        render json: budget_names.uniq, status: :ok
    end

    def current_budget
        budgets = Budget.where(budget_name: params[:budget_name])
        render json: budgets, status: :ok
    end

    def show
        budget = find_budget
        render json: budget, status: :ok
    end

    def create
        budget = Budget.create!(budget_params)
        render json: budget, status: :created
    end

    def update
        budget = find_budget
        budget.update!(budget_params)
        render json: budget, status: :accepted
    end

    def destroy
        budget = find_budget
        budget.destroy!
        head :no_content
    end

    private

    def find_budget
        Budget.find_by!(id: params[:id])
    end

    def budget_params
        params.permit(:budget_name, :user_id, :commitment_id, :commitment_hours, :priority)
    end

end
