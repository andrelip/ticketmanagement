Rails.application.routes.draw do
  get 'ticket_panel/*all' => 'ticket_panel#index', :constraints => { :all => /.*/ }
  get 'user_panel/*all' => 'ticket_panel#index', :constraints => { :all => /.*/ }
  get 'tickets/report' => 'ticket_panel#get_last'

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "ticket_panel#index"

  get "test_api" => "ticket_panel#test_jwt"

  # Grape API
  mount API::API => '/api'
end
