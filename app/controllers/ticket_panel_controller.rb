class TicketPanelController < SpaController
  def index
    gon.jwt = jwt_payload
  end
end
