module API
  module V1
    class UserManagement < Grape::API
      include V1::Defaults
      include V1::RequireCustomer
      include Rails.application.routes.url_helpers

      use GrapeLogging::Middleware::RequestLogger,
          logger: logger,
          log_level: 'debug'
      namespace :users do

        resource :create do
          desc "Create a ticket"
          params do
            requires :name, type: String, desc: "Shot description of the problem"
            requires :message, type: String, desc: "Full message of the problem"
          end
          post do
            ticket = TicketSupport.register_ticket(customer.id, params[:name], params[:message])
            if ticket[:status] == :ok
              { data: ticket[:data] }
            else
              status 400
              { errors: ticket[:errors] }
            end
          end
        end

        resource :list do
          desc "Create a user"
          get do
            if staff
              count = Profiles.list_users(params.merge(count: true))
              users = Profiles.list_users(params.merge(with_kind: true))
              users = users.map{ |user| { id: user.id, name: user.name,
                                          user_email: user.email,
                                          created_at: user.created_at,
                                          status: user.user_kind } }
              { data: users, count: count }
            else
              status 405
              { error: 'not allowed' }
            end
          end
        end

        resource :update do
          desc "Update a ticket status"
          params do
            requires :ticket_id, type: String, desc: "Ticket ID"
          end
          patch do
            if params[:staff] && staff
              ticket = TicketSupport.get_ticket params[:ticket_id]
            else
              ticket = TicketSupport.get_ticket_for_customer(customer.id, params[:ticket_id])
            end
            ticket = TicketSupport.update_ticket ticket, params
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
end
