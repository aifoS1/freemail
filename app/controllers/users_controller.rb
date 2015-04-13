class UsersController < ApplicationController
  before_action :user_is_current_user, only: [:edit, :update]
 

 def current

    respond_to do |format|
      format.json { render json: { 
        id: current_user.id,
        name: current_user.name,
        username: current_user.username
        }
       }
    end 
  end
 

  def new
    @user = User.new
  end

  def create
    @user = User.new( user_params)

    if @user.save
      redirect_to new_session_url
    else
      render :new
    end
  end

  def edit
   @user = current_user
  end

  def update
     @user = current_user

     if @user.authenticate(params[:user][:current_password])
      @user.update(password_params)

      redirect_to user_messages_url(@user)
    else
       render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :name, :password, :password_confirmation);
  end

  def password_params
    params.require(:user).permit(:password, :password_confirmation);
  end
  
  def user_is_current_user
    user = User.find(params[:id])
     if current_user
      redirect_to user_messages_path(current_user) unless user == current_user
    else
      redirect_to new_session_path
    end
  end

end
