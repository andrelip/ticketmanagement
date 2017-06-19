module Profiles
  class Staff < ApplicationRecord
    belongs_to :user

    def can_manage_users?
      permissions.split.include? "can_manage_users"
    end
  end
end
