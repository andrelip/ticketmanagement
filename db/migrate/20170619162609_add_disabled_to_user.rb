class AddDisabledToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :disabled, :boolean, default: true
  end
end
