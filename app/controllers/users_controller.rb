class UsersController < ApplicationController
    skip_before_action :authorized, only: [:create, :show]

    #will need to use custom method to pull budgets for specific users and/or by name - get route for custom method
end
