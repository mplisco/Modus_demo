class PrioritiesController < ApplicationController
    skip_before_action :authorized, only: [:index, :show]
    
    def index
        priorities = Priority.all
        render json: priorities, status: :ok
    end

    def show
        priority = find_priority
        render json: priority , status: :ok
    end

    private

    def find_priority
        Priority.find(params[:id])
    end
end
