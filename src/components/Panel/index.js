import React, { Component } from 'react'
import './index.scss'

export default class Panel extends Component {
  click = () => {
    const {handleClick} = this.props
    handleClick && handleClick()
  }
  render() {
    const { title, children, extraOperation, describe='' } = this.props
    return (
      <div className='panel-wrapper'>
        <div className='panel-header'>
          <div className='panel-title'>{title}</div>
          <div className='panel-desc'>{describe}</div>
          <div className='operation'>
            {extraOperation || <a className='link' onClick={this.click}>保存</a>}
          </div>
        </div>
        <div className='panel-content'>
          {children}
        </div>
      </div>
    )
  }
}