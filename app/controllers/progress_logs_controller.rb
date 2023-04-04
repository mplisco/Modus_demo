class ProgressLogsController < ApplicationController
   skip_before_action :authorized , only: [:index, :show]

    def index
        progress_logs = ProgressLog.all
        render json: progress_logs, status: :ok
    end

    def user_logs
        progress_logs = ProgressLog.where(user_id: session[:user_id])
        render json: progress_logs, status: :ok
    end

    def show
        progress_log = find_log
        render json: progress_log, status: :ok
    end

    def create
        progress_log = ProgressLog.create!(progress_log_params)
        render json: progress_log, status: :created
    end

    def update
        progress_log = find_log
        progress_log.update!(progress_log_params)
        render json: progress_log, status: :accepted
    end

    def destroy
        progress_log = find_log
        progress_log.destroy!
        head :no_content
    end

    private

    def find_log
        ProgressLog.find_by!(id: params[:id])
    end

    def progress_log_params
        params.permit(:weekly_initiative_id, :log_date, :log_amount, :log_description)
    end

end
