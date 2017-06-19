class TicketPanelController < SpaController
  def index
    if current_user
      gon.jwt = jwt_payload
      gon.user_id = current_user.id
    else
      redirect_to new_user_session_path
    end
  end

  def test_jwt
    binding.pry
    render json: {test: "ok"}
  end
end
