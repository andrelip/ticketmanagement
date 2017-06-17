class CreateTicketSupportTickets < ActiveRecord::Migration[5.1]
  def change
    create_table :ticket_support_tickets do |t|
      t.integer :profiles_customer_id
      t.string :name
      t.text :message
      t.string :status

      t.timestamps
    end
    add_index :ticket_support_tickets, :profiles_customer_id
  end
end
