module API
  module V1
    module JWT
      # if you're using Grape outside of Rails, you'll have to use Module#included hook
      extend ActiveSupport::Concern


      included do
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
              User.find(auth_token[:user_id])
            else
              error_response(message: "Internal server error", status: 500)
            end
          end
        end
      end
    end
  end
end
