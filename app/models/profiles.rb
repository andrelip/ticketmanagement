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

  def self.list_users(options = {})
    if options[:with_kind]
      query = User.all
      user_ids = query.ids
      staffs_ids = Profiles::Staff.where(user_id: user_ids).pluck(:user_id)
      customers_ids = Profiles::Customer.where(user_id: user_ids).pluck(:user_id)
      query.map do |user|
        user.user_kind = 'customer' if customers_ids.include?(user.id)
        # staff overwrite customer
        user.user_kind = 'staff' if staffs_ids.include?(user.id)
        user
      end
    else
      User.all
    end
  end

  def self.create_user(params)
    user = User.new(params)
    if user.save
      { status: :ok, data: user }
    else
      { status: :error, data: user.errors.full_messages }
    end
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
