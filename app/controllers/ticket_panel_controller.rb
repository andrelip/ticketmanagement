class TicketPanelController < SpaController
  before_action :ensure_logon, :ensure_user_is_enabled
  def index
    if current_user
      gon.jwt = jwt_payload
      gon.user_id = current_user.id
    else
      redirect_to new_user_session_path
    end
  end
end
