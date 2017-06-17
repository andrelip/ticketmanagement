class TicketPanelController < SpaController
  def index
    gon.jwt = jwt_payload
  end

  def test_jwt
    binding.pry
    render json: {test: "ok"}
  end
end
