module Profiles
  def self.table_name_prefix
    'profiles_'
  end

  # Public API
  def self.get_customer(user_id)
    Customer.find_by user_id: user_id
  end

  def self.get_staff(user_id)
    Staff.find_by user_id: user_id
  end
end
