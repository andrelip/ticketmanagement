module Profiles

  USER_UPDATE_PARAMS = [:disabled]
  USER_CREATE_PARAMS = [:name, :email, :password]

  def self.table_name_prefix
    'profiles_'
  end

  # Public API
  def self.get_customer(user_id)
    Customer.find_by user_id: user_id
  end

  def self.create_customer(user_id)
    Customer.create user_id: user_id
  end

  def self.get_staff(user_id)
    Staff.find_by user_id: user_id
  end

  def self.create_staff(user_id)
    Staff.create user_id: user_id
  end

  def self.list_users(options = {})
    page = options[:page] || 1
    per_page = options[:per_page] || 10
    query = User.order(created_at: :desc)
    query = query.where("email LIKE ?", "%#{options[:query_string]}%") if options[:query_string]
    return query.count if options[:count]
    query = query.paginate({page: page, per_page: per_page})
    if options[:with_kind]
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
      query
    end
  end

  def self.create_user(user_kind, params)
    ActiveRecord::Base.transaction do
      permitted_params = allowed_params(params, USER_CREATE_PARAMS)
      user = User.new(permitted_params)
      if user.save
        create_profile(user.id, user_kind)
        { status: :ok, data: user }
      else
        { status: :error, errors: user.errors.full_messages }
      end
    end
  end

  def self.create_profile(user_id, user_kind)
    if user_kind == :staff
      create_staff(user_id)
    else
      create_customer(user_id)
    end
  end

  def self.change_user(user, params)
    permitted_params = allowed_params(params, USER_UPDATE_PARAMS)
    user.assign_attributes(permitted_params)
    if user.save
      { status: :ok, data: user }
    else
      { status: :error, data: user.errors.full_messages }
    end
  end

  def self.allowed_params(params, list_of_keys)
    # I know it's from another layer. But it's the best built-in method to filter a hash.
    ActionController::Parameters.new(params).permit(list_of_keys)
  end
end
