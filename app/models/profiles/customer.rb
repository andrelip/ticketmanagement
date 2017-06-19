module Profiles
  class Customer < ApplicationRecord
    belongs_to :user
    delegate :name, to: :user
  end
end
