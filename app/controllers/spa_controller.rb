class SpaController < ApplicationController
  protect_from_forgery with: :exception
  helper_method :jwt_payload

  private

  def jwt_payload
    return nil unless current_user && current_user.id
    staff = Profiles::Staff.find_by(user_id: current_user.id)
    staff_permission = true if staff
    create_admin_permission = true if staff && staff.can_manage_users?
    {
        auth_token: JsonWebToken.encode({ user_id: current_user.id }),
        is_staff: staff_permission,
        can_manage_users: create_admin_permission
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
