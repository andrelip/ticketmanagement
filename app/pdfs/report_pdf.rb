class ReportPdf < Prawn::Document
  def initialize(tickets, total_entries, months_ago)
    super()
    @tickets = tickets
    @total_entries = total_entries
    @months_ago = months_ago
    text_content
    table_content
  end

  def text_content
    # The cursor for inserting content starts on the top left of the page. Here we move it down a little to create more space between the text and the image inserted above
    y_position = cursor - 10

    # The bounding_box takes the x and y coordinates for positioning its content and some options to style it
    bounding_box([0, y_position], :width => 270, :height => 100) do
      text "Report", size: 15, style: :bold
      text "Listing all #{@total_entries} tickets on the previous #{@months_ago} month(s)"
    end

  end

  def table_content
    content = ticket_rows
    table content
  end

  def ticket_rows
    tickets = @tickets.map do |ticket|
      [ticket.id.to_s, ticket.customer.name, ticket.name, ticket.updated_at.strftime("%FT%R")]
    end
    [['#', 'Client', 'Ticket Name', 'updated_at']] + tickets
  end
end
