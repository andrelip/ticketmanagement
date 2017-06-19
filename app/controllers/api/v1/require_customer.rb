module API
  module V1
    module RequireCustomer
      # if you're using Grape outside of Rails, you'll have to use Module#included hook
      extend ActiveSupport::Concern


      included do

        before do
          error!('Unauthorized', 401) unless user_id_in_token?
        end

        helpers do
          # API-wide helper to declare params
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

          def current_user
            if user_id_in_token?
              @user ||= User.find(auth_token[:user_id])
              return error!('Unauthorized', 401) if @user.disabled
              @user
            else
              error_response(message: "Internal server error", status: 500)
            end
          end

          def customer
            @customer ||= Profiles.get_customer(current_user.id)
          end

          def staff
            @customer ||= Profiles.get_staff(current_user.id)
          end
        end
      end
    end
  end
end
