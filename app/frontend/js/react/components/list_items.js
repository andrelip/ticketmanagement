import React, { Component } from "react"
import { changeSearchString } from '../actions/api_navigation'
import { changePage, deleteItem } from '../actions/api_navigation'
import PaginationBasic from './pagination'
import { connect } from 'react-redux';
import { _ } from 'lodash';
import SearchInput from './search_input';
import NotifyPanel from './notify_panel';
import ItemSelectFormater from './item_select_formater'

class ListItems extends Component {
  componentDidMount() {
    console.log("did mount");
    this.props.changePage(this.props.searchUrl, 1, this.props.per_page);
  }

  renderSearchInput() {
    if (this.props.showBar == true) {
      return < SearchInput searchUrl={this.props.searchUrl}/>
    }
  }

  render() {
    const responseItems = () => {
      const { resource_type, search_items } = this.props;
      console.log(search_items)
      return _.map(search_items, (item, index) => {
          return <ItemSelectFormater item={item} key={ resource_type + item.id } resource_type={ resource_type } />
        }
      );
    };

    return (
      <div className="global-search">
        { this.renderSearchInput() }
        {<PaginationBasic searchUrl={this.props.searchUrl}/>}
        {/*<Route path="/" render={ () => <li>{responseItems()}</li> }/>*/}
        <li>{ responseItems() }</li>
      </div>
    )
  }

  deleteItem(item_id) {
    this.props.deleteItem( item_id );
  }
}

const mapStateToProps = ({ ticketsReducer }) => {
  console.log(ticketsReducer);
  const { current_page, per_page, query_string, search_items } = ticketsReducer;
  return { current_page, per_page, query_string, search_items };
};

export default connect(mapStateToProps, { changePage, deleteItem })(ListItems);
