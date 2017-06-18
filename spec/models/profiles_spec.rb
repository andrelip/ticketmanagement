require 'rails_helper'

RSpec.describe Profiles do
  # Simple tests cause it' just schema and validations of the DDD more on the public API
  describe "should get customer profile" do

    it "should return the customer profile" do
      user = User.new
      user.save(validate: false)
      customer = Profiles::Customer.new(user: user)
      customer.save(validate: false)
      get_customer = Profiles.get_customer user.id
      expect(get_customer).not_to eq(nil)
    end


    it "should return the staff profile" do
      user = User.new
      user.save(validate: false)
      staff_profile = Profiles::Staff.new(user: user)
      staff_profile.save(validate: false)
      get_staff_profile = Profiles.get_staff user.id
      expect(get_staff_profile).not_to eq(nil)
    end

  end
end
