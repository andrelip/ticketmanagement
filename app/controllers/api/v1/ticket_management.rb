module API
  module V1
    class TicketManagement < Grape::API
      include V1::Defaults
      include V1::RequireCustomer
      include Rails.application.routes.url_helpers

      use GrapeLogging::Middleware::RequestLogger,
          logger: logger,
          log_level: 'debug'

      resource :test do
        desc "Simple test JWT"
        get do
          {status: customer}
        end
      end
    end
  end
end
