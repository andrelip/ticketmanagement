module Profiles
  class Staff < ApplicationRecord
    belongs_to :user
  end
end
