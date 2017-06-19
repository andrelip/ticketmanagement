require 'rails_helper'

RSpec.describe TicketSupport do
  # Simple tests cause it' just schema and validations of the DDD more on the public API
  describe "should get customer profile" do
    before(:each) do
      @customer = Profiles::Customer.new
      @customer.save(validate: false)
      ticket = TicketSupport.register_ticket @customer.id, "Sample name",
                                             "Sample message with more than 20 char"
      @ticket = ticket[:data]
      customer2 = Profiles::Customer.new
      customer2.save(validate: false)
      ticket2 = TicketSupport.register_ticket customer2.id, "Sample name",
                                             "Sample message with more than 20 char"
      @ticket2 = ticket2[:data]
    end

    describe "#register_ticket" do
      it "should open a new ticket" do
        ticket = TicketSupport.register_ticket @customer.id, "Sample name",
                                               "Sample message with more than 20 char"
        expect(ticket[:status]).to eq(:ok)
        expect(ticket[:data].status).to eq("open")
      end
    end

    describe "#get_ticket" do
      it "should get any ticket by id" do
        ticket = TicketSupport.get_ticket(@ticket.id)
        expect(ticket).not_to eq(nil)
      end
    end

    describe "#get_ticket_for_customer" do
      it "should get a ticket for a given customer" do
        ticket = TicketSupport.get_ticket_for_customer(@customer.id, @ticket.id)
        expect(ticket).not_to eq(nil)
      end

      it "should not expose a ticket for other customer" do
        ticket = TicketSupport.get_ticket_for_customer(@customer.id, @ticket2.id)
        expect(ticket).to eq(false)
      end
    end

    describe "#all_tickets" do
      it "should list all tickets" do
        tickets = TicketSupport.all_tickets
        expect(tickets.size).to eq(2)
      end
    end

    describe "#customer_tickets" do
      it "should list of allowed tickets for a given customer" do
        tickets = TicketSupport.customer_tickets(@customer.id)
        expect(tickets.size).to eq(1)
      end
    end

    describe "#update_ticket" do
      it "should update params for a ticket" do
        ticket = TicketSupport.get_ticket(@ticket.id)
        TicketSupport.update_ticket(ticket, status: :closed)
        expect(ticket.reload.status).to eq("closed")
      end
    end
  end
end
