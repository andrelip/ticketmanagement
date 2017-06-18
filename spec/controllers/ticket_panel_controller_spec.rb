require 'rails_helper'

RSpec.describe TicketPanelController, type: :controller do

  describe "GET #index" do

    context "not signed in" do
      it "returns redirect sign in" do
        get :index
        expect(response).to redirect_to("/users/sign_in")
      end
    end

    context "signed in" do

      it "returns gon with jwt" do
        @user = User.new
        @user.save(validate: false)
        sign_in @user
        get :index
        expect(response).to have_http_status(:success)
        gon = RequestStore.store[:gon].gon
        user_jwt = JsonWebToken.encode({ user_id: @user.id })
        expect(gon["jwt"][:auth_token]).to eq(user_jwt)
      end

    end
  end

end
