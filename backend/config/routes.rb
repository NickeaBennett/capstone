# frozen_string_literal: true

Rails.application.routes.draw do
  resources :tags
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  root 'pages#home'
  # root 'projects#index'

  use_doorkeeper
  devise_for :users
  resources :projects
  resources :tags
  resources :reviews

  draw :api
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
