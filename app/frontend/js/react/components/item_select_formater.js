import React, { Component } from "react"
import TicketItem from './ticket_item'
import UserItem from './user_item'

class ItemSelectFormater extends Component {
  render() {
    const { item, resource_type } = this.props;
    switch (resource_type) {
      case "ticket":
        return (<TicketItem item={item} key={ "ticket" + item.id}  />);
      case "user":
        return (<UserItem item={item} key={ "user" + item.id } />);
      default:
        return (<TicketItem item={item} key={ "user" + item.id } />)
    }
  }
}

export default ItemSelectFormater;
