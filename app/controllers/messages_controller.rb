class MessagesController < ApplicationController
   before_action :require_current_user, only: :inbox
   before_action :user_is_current_user, only: [:index, :new, :create]

  def inbox
     @users = User.all
  end

  def received_messages
    #todo: swtich to this
  
    @messages = current_user.received_messages
    
    respond_to do |format|
      format.html  { render text: "Please go to .json"}
      format.json { render json: @messages.to_json(include: :sender) }
    end
  end

def sent_messages
  #this should reverse what index is rgiht now
  @messages = current_user.sent_messages
 
    respond_to do |format|
      format.html  { render text: "Please go to .json"}
      format.json { render json: @messages.to_json(include: :recipient) }
    end

end
 

  def create
    # Pry.start(binding)
    @message = current_user.sent_messages.create(message_params)

    respond_to do |format|
      format.html  { render text: "Please go to .json"}
      format.json { render json: @message.to_json(include: :sender ) } 
    end
  end


  private

   def message_params
     params.require(:message).permit(:recipient_id, :subject, :content, :important)
   end

  def user_is_current_user
     redirect_to user_messages_path(current_user) unless params[:user_id].to_i == current_user.id
  end

end
