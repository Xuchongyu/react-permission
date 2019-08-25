import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

@withRouter
export default class Approval extends Component {
  componentDidMount() {
  }
  jump = () => {
    const {itemCollapse} = this.props
    itemCollapse && itemCollapse('/daily/approval/towLever')
    this.props.history.push('/daily/approval/towLever')
  }
  render() {
    return (
      <div>2222222<a onClick={this.jump} >点击</a></div>
    );
  }
}
