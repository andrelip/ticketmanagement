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

  def http_token
    @http_token ||= if request.headers['Authorization'].present?
                      request.headers['Authorization'].split(' ').last
                    end
  end

  def auth_token
    @auth_token ||= JsonWebToken.decode(http_token)
  end

  def user_id_in_token?
    http_token && auth_token && auth_token[:user_id].to_i
  end
end
