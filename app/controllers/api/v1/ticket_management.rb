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
        desc "Just test jwt"
        get do
          {customer: customer, user: current_user}
        end
      end

      resource :create do
        desc "Create a ticket"
        params do
          requires :name, type: String, desc: "Shot description of the problem"
          requires :message, type: String, desc: "Full message of the problem"
        end
        post do
          ticket = TicketSupport.register_ticket customer.id, params[:name], params[:message]
          if ticket[:status] == :ok
            { data: ticket[:data] }
          else
            status 400
            { errors: ticket[:errors] }
          end
        end
      end
    end
  end
end
