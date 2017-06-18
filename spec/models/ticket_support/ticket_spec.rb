require 'rails_helper'

RSpec.describe TicketSupport::Ticket, type: :model do

  before(:all) do
    customer = Profiles::Customer.new
    customer.save(validate: false)
    @valid_attr = { name: "Simple helper name", message: "Simple ticket full message text with more than 30 chars.",
                    customer: customer, status: "open" }
  end

  # Simple tests cause it' just schema and validations of the DDD more on the public API
  it "should be valid when have valid params" do
    ticket = TicketSupport::Ticket.new(@valid_attr)
    expect(ticket.valid?).to eq(true)
  end

end
