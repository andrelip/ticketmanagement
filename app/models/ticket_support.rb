module TicketSupport
  def self.table_name_prefix
    'ticket_support_'
  end

  PUBLIC_KEYS = ["name", "message"]
  CUSTOMER_UPDATE_PARAMS = ["message", "name", "status"]

  def self.register_ticket(customer_id, name, text)
    ticket = Ticket.new profiles_customer_id: customer_id, name: name,
                        message: text, status: :open
    if ticket.save
      { status: :ok, data: ticket }
    else
      { status: :error, errors: ticket.errors.full_messages }
    end
  end

  def self.get_ticket_for_customer(customer_id, ticket_id)
    # Performing a get by id and filtering on ruby has more performance
    # than filtering in database.
    ticket = Ticket.find ticket_id
    ticket && (ticket.profiles_customer_id == customer_id ? ticket : false)
  end

  def self.customer_tickets(customer_id, options = {})
    page = options[:page] || 1
    per_page = options[:per_page] || 10
    query = Ticket.where(profiles_customer_id: customer_id)
    query = query.where(status: options[:status]) if options[:status]
    return query.count if options[:count]
    query.paginate({page: page, per_page: per_page})
  end

  def self.update_ticket(ticket, params)
    permitted = allowed_params(params, CUSTOMER_UPDATE_PARAMS)
    if ticket.update_attributes(permitted)
      { status: :ok, data: ticket }
    else
      { status: :error, errors: ticket.errors.full_messages }
    end
  end

  def self.filter_params(params, array_of_keys)
    params.slice(*array_of_keys)
  end

  def self.allowed_params(params, list_of_keys)
    ActionController::Parameters.new(params).permit(list_of_keys)
  end
end
