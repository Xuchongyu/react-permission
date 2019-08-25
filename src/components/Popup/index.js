import React, { Component } from 'react'
import { Icon } from '@alifd/next';
import './index.scss'

export default class Popup extends Component {
  closePopup = () => {
    const {tooglePopup} = this.props
    tooglePopup && tooglePopup()
  }
  render() {
    const {visible, children} = this.props
    return (
      <div className='popup-wrapper' style={{right: visible ? 0 : -520}}>
        <div className='popup-back'>
          <Icon type='arrow-right' size="small" style={{float: 'right', cursor: 'pointer', padding: '10px 0'}} onClick={this.closePopup}/>
        </div>
        <div className='popup-content'>
          {children}
        </div>
      </div>
    )
  }
}