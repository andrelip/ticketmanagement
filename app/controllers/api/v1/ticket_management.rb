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
          ticket = TicketSupport.register_ticket(customer.id, params[:name], params[:message])
          if ticket[:status] == :ok
            { data: ticket[:data] }
          else
            status 400
            { errors: ticket[:errors] }
          end
        end
      end

      resource :show do
        desc "Show a ticket"
        params do
          requires :ticket_id, type: Integer, desc: "ID of the ticket"
        end
        get do
          ticket = TicketSupport.get_ticket_for_customer customer.id, params[:ticket_id]
          if ticket
            { data: ticket }
          else
            status 400
            { error: "Ticket not found or does not belong to you" }
          end
        end
      end

      resource :list do
        desc "Create a ticket"
        get do
          if params[:staff] && staff
            count = TicketSupport.all_tickets(params.merge(count: true))
            tickets = TicketSupport.all_tickets(params).includes({customer: :user})
          else
            count = TicketSupport.customer_tickets(customer.id, params.merge(count: true))
            tickets = TicketSupport.customer_tickets(customer.id, params).includes({customer: :user})
          end
          tickets = tickets.map{ |t| { id: t.id, name: t.name, message: t.message,
                                       status: t.status, user_name: t.customer.user.name , user_email: t.customer.user.email } }
          { data: tickets, count: count }
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
