class TicketPanelController < SpaController
  before_action :ensure_logon, :ensure_user_is_enabled
  def index
    if current_user
      gon.jwt = jwt_payload
      gon.user_id = current_user.id
    else
      redirect_to new_user_session_path
    end
  end

  def get_last
    total_entries = params[:total_entries] || 100
    months_ago = params[:months_ago] || 1
    staff = Profiles.get_staff current_user
    if staff
      tickets = TicketSupport.all_tickets(per_page: 100, status: :closed).where("created_at > ?", Date.today - months_ago.month)
      respond_to do |format|
        format.pdf do
          pdf = ::ReportPdf.new(current_user.email, tickets, total_entries, months_ago)
          timestamp = Time.now.strftime("%FT%R")
          send_data pdf.render, filename: "report_closed_tickets_#{timestamp}.pdf", type: 'application/pdf'
        end
      end
    end
  end
end
