require 'rails_helper'

RSpec.describe Profiles::Staff, type: :model do

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

  it "should know if staff can manage other users" do
    right1 = Profiles::Staff.new(permissions: "can_manage_users")
    right2 = Profiles::Staff.new(permissions: "can_do_other_things can_manage_users")
    wrong1 = Profiles::Staff.new(permissions: "do_nothing")
    expect(right1.can_manage_users?).to eq(true)
    expect(right2.can_manage_users?).to eq(true)
    expect(wrong1.can_manage_users?).to eq(false)
  end

end
