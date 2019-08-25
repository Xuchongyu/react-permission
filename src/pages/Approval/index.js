import React, { Component } from 'react';
import ApprovalResult from '../../components/ApprovalResult'
import ApprovalUnitModule from '../../components/ApprovalUnitModule'
import Popup from '../../components/Popup'
import './index.scss'

export default class Approval extends Component {
  constructor() {
    super()
    this.state = {
      visible: false
    }
  }
  tooglePopup = () => {
    this.setState({ visible: !this.state.visible })
  }
  render() {
    const { visible } = this.state
    return (
      <div className='approval-wrapper'>
        <div className='approval-content'>
          <ApprovalUnitModule title='原授信产品' />
          <a className='link' onClick={this.tooglePopup}>配置客户</a>
        </div>
        <Popup visible={visible} tooglePopup={this.tooglePopup}>
          <div>
            配置客户
          </div>
        </Popup>
        <ApprovalResult />
      </div>
    );
  }
}
