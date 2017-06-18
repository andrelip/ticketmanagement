require 'rails_helper'

RSpec.describe Profiles::Customer, type: :model do

  # Simple tests cause it' just schema and validations of the DDD more on the public API
  it "should have a user" do
    user = User.new
    user.save(validate: false)
    # no need to mock db in a simple system
    profile = Profiles::Customer.new
    expect(profile.valid?).to eq(false)
    profile.user = user
    expect(profile.valid?).to eq(true)
  end

end
