class SpaController < ApplicationController
  protect_from_forgery with: :exception
  helper_method :jwt_payload

  private

  def jwt_payload
    return nil unless current_user && current_user.id
    {
        auth_token: JsonWebToken.encode({user_id: current_user.id})
    }
  end
end
