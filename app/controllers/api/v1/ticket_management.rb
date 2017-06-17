module API
  module V1
    class TicketManagement < Grape::API
      include V1::Defaults
      include Rails.application.routes.url_helpers

      use GrapeLogging::Middleware::RequestLogger,
          logger: logger,
          log_level: 'debug'

      resource :test do
        desc "Listar todas as compras"
        params do
        end
        get do
          {status: "ok"}
        end
      end
    end
  end
end
