Rails.application.routes.draw do

  resources :users, except: [:new, :edit]
  
  get '/auth', to: 'users#find_current_user'
  # get '/hello', to: 'application#hello_world'
  # get '*path',
  #     to: 'fallback#index',
  #     constraints: ->(req) { !req.xhr? && req.format.html? }

  post "/login", to: "sessions#create"
  delete '/logout', to: 'sessions#destroy'
end
