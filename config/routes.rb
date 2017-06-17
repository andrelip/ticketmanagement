Rails.application.routes.draw do
  get 'ticket_panel/*all' => 'ticket_panel#index', :constraints => { :all => /.*/ }

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # root to: "home#index"

  get "test_api" => "ticket_panel#test_jwt"

  # Grape API
  mount API::API => '/api'
end
