class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  private

  def ensure_logon
    redirect_to new_user_session_path unless current_user
  end

  def ensure_user_is_enabled
    binding.pry
    if current_user.disabled?
      sign_out(current_user)
      redirect_to new_user_session_path
    end
  end
end
