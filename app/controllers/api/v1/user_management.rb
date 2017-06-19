module API
  module V1
    class UserManagement < Grape::API
      include V1::Defaults
      include V1::RequireCustomer
      include Rails.application.routes.url_helpers

      use GrapeLogging::Middleware::RequestLogger,
          logger: logger,
          log_level: 'debug'
      namespace :users do

        resource :create do
          desc "Create a ticket"
          params do
            requires :name, type: String, desc: "Shot description of the problem"
            requires :email, type: String, desc: "Full message of the problem"
            requires :password, type: String, desc: "Full message of the problem"
          end
          post do
            if staff
              user_kind = params[:is_staff] ? :staff : :customer
              user = Profiles.create_user(user_kind, name: params[:name], email: params[:email], 
                                          password: params[:password])
              if user[:status] == :ok
                { data: user[:data] }
              else
                status 400
                { errors: user[:errors] }
              end
            else
              status 405
              { error: 'not allowed' }
            end
          end
        end

        resource :list do
          desc "Create a user"
          get do
            if staff
              count = Profiles.list_users(params.merge(count: true))
              users = Profiles.list_users(params.merge(with_kind: true))
              users = users.map{ |user| { id: user.id, name: user.name,
                                          user_email: user.email,
                                          created_at: user.created_at,
                                          status: user.user_kind, disabled: user.disabled } }
              { data: users, count: count }
            else
              status 405
              { error: 'not allowed' }
            end
          end
        end

        resource :update do
          desc "Update user"
          params do
            requires :user_id, type: String, desc: "User ID"
          end
          patch do
            if staff.can_manage_users?
              user = User.find params[:user_id]
              error!('Cannot modify yourself', 405) if user == current_user
              user = Profiles.change_user user, params
              if user[:status] == :ok
                { data: user[:data] }
              else
                status 400
                { errors: user[:errors] }
              end
            else
              status 405
              { error: 'not allowed' }
            end
          end
        end

      end
    end
  end
end
