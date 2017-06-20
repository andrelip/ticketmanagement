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

    describe "#change_user" do

      it "change cam disable/enable a user" do
        user = Profiles.create_user(:staff, email: "test@test.com",
                                    name: "My name", password: "abc12345")
        user = user[:data]
        u = Profiles.change_user(user, { name: "My new name", email: "jose@gmail.com",
                                                 disabled: true} )
        refresh_user = user.reload
        expect(refresh_user.disabled).to eq(true)
      end

    end

    describe "#create_user" do

      it "should create a user" do
        get_user = Profiles.create_user(:staff, email: "test@test.com",
                                         name: "My name", password: "abc12345")
        expect(get_user[:status]).to eq(:ok)
        expect(get_user[:data].email).to eq("test@test.com")
      end

    end

    describe "#list_users" do

      it "list all users" do
        user = User.new.save(validate: false)
        user = User.new(email: "teste@test.com").save(validate: false)
        expect(Profiles.list_users.size).to eq(2)
      end


      it "list all users with permissions" do
        user1 = User.new(email: "customer@test.com")
        user1.save(validate: false)
        user2 = User.new(email: "staff@test.com")
        user2.save(validate: false)
        Profiles::Customer.new(user: user2).save(validate: false)
        Profiles::Staff.new(user: user1).save(validate: false)
        user_kinds = Profiles.list_users(with_kind: true).map{ |user| user.user_kind }
        expect(user_kinds).to eq(['staff', 'customer'])
      end

    end

  end
end
