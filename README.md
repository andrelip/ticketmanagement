# Ticket Management

Considerations:
- Created using Domain Driven Design.
- We can only manage user and tickets through their own public API in the root of api/models.

Roles: 

- Customer: can create and manage own tickets.
- Staff: can create tickets and manage tickets from others.
- Admin: staff permissions and can manage user

Dependencies: 

- ruby 2.4.1 or newer
- mysql 5.7 or newer
- node 7.9 or newer
- npm 4.2 or newer

## Installation:

1. Install packages:
      ```bash
      bundle install
      npm install
      ```
2. migrate db:
      ```bash
      bundle exec rake db:create
      bundle exec rake db:migrate
      bundle exec rake db:seed # if you want some showcase test data
      ```
      
3. start the application:

      ```bash
      bundle exec rails s
      ```
      
## Starting with a clean db

For security we don' have a method to create the master admin. You should get the staff profile and update his params directly.

1. Run rails console:
      ```bash
      bundle exec rails s
      ```
      
2. Create a staff profile:
      
      ```ruby
      profile_creation = Profiles.create_user(:staff, name: "master", email: "master@test.com", password: "changeme")
      user_model = profile_creation[:data]
      staff_model = Profiles.get_staff(user_model)
      staff_model.update(permissions: "can_manage_users")
      ```
      This is a little verbose but we are respecting the boundaries and context and accessing the models thought a public API.
      