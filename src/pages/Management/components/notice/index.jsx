// 传参：
//   header： 头部标题
//   width：面板宽度
//   moreOperation： 头部右侧操作
//   operationClick：头部右侧操作按钮点击操作，若有moreOperation传入，此参数可以不传

import React, {Component} from 'react'
import './index.scss'

export default class Notice extends Component{
  operationClick = () => {
    const {operationClick} = this.props
    operationClick && operationClick()
  }
  render() {
    const {width, header, moreOperation, children} = this.props
    return (
      <div className='notice-wrapper' style={{width: width || '100%'}}>
        <div className='noptice-header'>
          <span>{header && header() || 自定义}</span>
          {moreOperation ? moreOperation() : <a className='link' onClick={this.operationClick}>更多</a>}
        </div>
        <div className='noptice-content'>
          {children}
        </div>
      </div>
    )
  }
}