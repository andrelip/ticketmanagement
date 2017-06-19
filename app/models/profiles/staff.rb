module Profiles
  class Staff < ApplicationRecord
    belongs_to :user

    def can_manage_user?
      permissions.split.include? "can_manage_user"
    end
  end
end
