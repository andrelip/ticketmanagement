# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = Profiles.create_user(:staff, name: "Master", email: "master@test.com", password: "changeme")
profile = Profiles::Staff.last
profile.permissions = "can_manage_users"
profile.save

(1..5).each do |i|
  Profiles.create_user(:staff, name: "#{ Faker::Superhero.name }", email: "#{Faker::Internet.email}", password: "changeme")
end

(1..200).each do |i|
  Profiles.create_user(:customer,name: "#{ Faker::GameOfThrones.character }", email: "#{Faker::Internet.email}", password: "changeme")
end

(1..100).each do |i|
  number = Random.rand(0..3)
  # status = (number == 0) ? :open : :closed
  TicketSupport.register_ticket(Random.rand(1..100), Faker::Friends.quote, Faker::Friends.quote )
end

tickets = TicketSupport::Ticket.all.ids
selected_tickets = tickets.select do |ticket|
  number = Random.rand(0..5)
  number != 0
end

TicketSupport::Ticket.where(id: selected_tickets).update_all(status: :closed)