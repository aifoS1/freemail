Rails.application.routes.draw do
  
root 'messages#inbox'
get '/inbox', to: 'messages#inbox'
get '/users/current', to: 'users#current'
get '/users/:user_id/messages' => 'messages#received_messages'
 get '/outbox', to: 'messages#sent_messages'
get '/users/:user_id/messages/sent', to: 'messages#sent_messages'


  resources :users, except: [:index, :show] do
    resources :messages, shallow: true
  end

  resource :session, only: [:new, :create, :destroy]

end
