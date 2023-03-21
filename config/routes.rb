Rails.application.routes.draw do

  post "/login", to: "sessions#create"
  delete '/logout', to: 'sessions#destroy'

  get '/auth', to: 'users#find_current_user'

  get '/mybudgets', to: 'budgets#user_budgets'
  get '/home', to: 'budgets#budget_list'
  get '/currentbudget', to: 'budgets#current_budget'

  resources :users, except: [:new, :edit]
  resources :budgets, except: [:new, :edit]
  resources :commitments, only: [:index, :show]
  resources :categories, only: [:index, :show]

end
