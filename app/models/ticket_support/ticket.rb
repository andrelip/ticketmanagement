module TicketSupport
  class Ticket < ApplicationRecord
    validates :name, presence: true, length: { in: 6..100 }
    validates :message, presence: true, length: { in: 20..30000 }
  end
end
