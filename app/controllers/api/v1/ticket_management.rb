module API
  module V1
    class TicketManagement < Grape::API
      include V1::Defaults
      include V1::JWT
      include Rails.application.routes.url_helpers

      use GrapeLogging::Middleware::RequestLogger,
          logger: logger,
          log_level: 'debug'

      before do
        error!('Unauthorized', 401) unless user_id_in_token?
      end

      resource :test do
        desc "Simple test JWT"
        get do
          {status: current_user}
        end
      end
    end
  end
end
