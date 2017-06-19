class AddPermissionsToStaff < ActiveRecord::Migration[5.1]
  def change
    add_column :profiles_staffs, :permissions, :string
  end
end
