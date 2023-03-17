class CommitmentsController < ApplicationController

    def index
        commits = Commitment.all
        render json: commits, status: :ok
    end

    def show
        commit = find_commit
        render json: commit, status: :ok
    end


    #Determine how to handle user commitments... should not be able to delete default commits or commits in use by other users..

    def create
        commit = Commitment.create!(commit_params)
        render json: commit, status: :created
    end

    # def update
    #     commit = find_commit
    #     commit.update!(commit_params)
    #     render json: commit, status: :accepted
    # end

    # def destroy
    #     commit = find_commit
    #     commit.destroy!
    #     head :no_content
    # end

    private

    def find_commit
        Commitment.find(params[:id])
    end

    def commit_params
        params.permit(:commitment_name, :category_id)
    end




end
