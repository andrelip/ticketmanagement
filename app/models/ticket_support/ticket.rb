module TicketSupport
  class Ticket < ApplicationRecord
    validates :name, presence: true, length: { in: 6..100 }
    validates :message, presence: true, length: { in: 20..30000 }
    validates :status, inclusion: { in: %w(open closed) }

    belongs_to :customer, foreign_key: :profiles_customer_id, class_name: "Profiles::Customer"
  end
end
