class WeeksController < ApplicationController
    skip_before_action :authorized, only: [:index, :show]
    
    def index
        weeks = Week.all
        render json: weeks, status: :ok
    end

    def show
        week = find_week
        render json: week, status: :ok
    end

    private

    def find_week
        Week.find(params[:id])
    end

end
