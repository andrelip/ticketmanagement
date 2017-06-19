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

  def self.can_manage_user(profile_staff)
    profile_staff.permissions.split('can')
  end

  def self.change_user(user, hash)
    email = user.email
    user.assign_attributes(hash)
    if user.save
      { status: :ok, data: user }
    else
      { status: :error, data: user.errors.full_messages }
    end
  end
end
