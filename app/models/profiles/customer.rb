module Profiles
  class Customer < ApplicationRecord
    belongs_to :user
  end
end
