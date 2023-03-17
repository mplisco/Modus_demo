class CategoriesController < ApplicationController
 # skip_before_action :authorized, only: [:index, :show]

    def index
        categories = Category.all
        render json: categories, status: :ok
    end

    def show
        category = find_category
        render json: category, status: :ok
    end

    private

    def find_category
        Category.find(params[:id])
    end
end
