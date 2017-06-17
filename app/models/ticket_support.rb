module TicketSupport
  def self.table_name_prefix
    'ticket_support_'
  end

  def self.register_ticket(customer_id, name, text)
    ticket = Ticket.new profiles_customer_id: customer_id, name: name, message: text
    if ticket.save
      { status: :ok, data: ticket }
    else
      { status: :error, errors: ticket.errors.full_messages }
    end
  end
end
