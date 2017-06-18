import React, { Component } from "react"
import TicketItem from './ticket_item'

class ItemSelectFormater extends Component {
  render() {
    const { item, resource_type } = this.props;
    switch (resource_type) {
      case "ticket":
        return (<TicketItem item={item} />);
      default:
        return (<TicketItem item={item} />)
    }
  }
}

export default ItemSelectFormater;
