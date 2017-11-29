Rails.application.routes.draw do
  root 'items#index'

  resources :items, only: [:show, :destroy]
end
