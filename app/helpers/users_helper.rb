module UsersHelper

   def current_id
    respond_to do |format|

      format.json { render json: { id: current_user.id } }
    end 
  end
  
end
