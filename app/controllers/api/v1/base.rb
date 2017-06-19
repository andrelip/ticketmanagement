module API
  module V1
    class Base < Grape::API
      mount V1::TicketManagement
      mount V1::UserManagement
    end
  end
end