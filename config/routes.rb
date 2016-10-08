Rails.application.routes.draw do

  root 'artists#index'
  get 'works' => 'works#all', as: :all_works
  resources :artists do
    resources :works do
      resources :pieces
    end
  end

  namespace :api do
    namespace :v1 do
      get 'works/:id/pieces' => 'works#pieces'
      get 'pieces/:id' => 'pieces#piece'

      post 'add_to_cart' => 'carts#add_to_cart'
      post 'remove_from_cart' => 'carts#remove_from_cart'
      get 'initialize_cart' => 'carts#initialize_cart'

      get 'get_token' => 'payments#get_token'
      get 'checkout' => 'payments#new'
      post 'checkout' => 'payments#checkout'
    end
  end

  devise_for :users
  get 'users/account' => 'users#account'

  get 'admin' => 'admin#show'
  post 'confirm_artist_email' => 'admin#confirm_artist_email'
  post 'confirm_artist' => 'admin#confirm_artist'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
