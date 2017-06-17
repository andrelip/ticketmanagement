Rails.application.routes.draw do
  get 'ticket_panel/index'

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # root to: "home#index"

  get "test_api" => "ticket_panel#test_jwt"
end
