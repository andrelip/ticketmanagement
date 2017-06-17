class CreateTicketSupportTickets < ActiveRecord::Migration[5.1]
  def change
    create_table :ticket_support_tickets do |t|
      t.integer :profiles_customer_id
      t.string :name, limit: 100
      t.text :message, limit: 30000
      t.string :status, limit: 30


      t.timestamps
    end
    add_index :ticket_support_tickets, :profiles_customer_id
    add_index :ticket_support_tickets, :status
  end
end
