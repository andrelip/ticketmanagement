require 'rails_helper'

RSpec.describe TicketSupport do
  # Simple tests cause it' just schema and validations of the DDD more on the public API
  describe "should get customer profile" do

    describe "#register_ticket" do
      it "should open a new ticket" do
        customer = Profiles::Customer.new
        customer.save(validate: false)
        ticket = TicketSupport.register_ticket customer.id, "Sample name",
                                               "Sample message with more than 20 char"
        expect(ticket[:status]).to eq(:ok)
        expect(ticket[:data].status).to eq("open")
      end
    end
  end
end
