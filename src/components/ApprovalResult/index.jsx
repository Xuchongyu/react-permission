import React, { Component } from 'react';
import { Input, Button, SplitButton } from '@alifd/next';
import './index.scss'

const { Item } = SplitButton;

export default class ApprovalResult extends Component {
  agree = () => {
  }
  refuse = () => {

  }
  render() {
    const menu = ['上一步', '发起人'].map(item => <Item key={item}>{item}</Item>)
    return (
      <div className='approval-result-wrapper'>
        <div className='approval-result-header'>审批</div>
        <div className='approval-result-content'>
          <div className='text-area'>
            <Input.TextArea placeholder="请输入审批意见" className='text' aria-label="TextArea" rows='6' />
          </div>
          <div className='operation-button'>
            <Button type="primary" onClick={this.agree}>同意</Button>
            <Button className='refuse' type="normal" warning onClick={this.refuse}>拒绝</Button>
          </div>
          <div className='operation-return'>
            <SplitButton label="回退" type="primary" triggerProps={{ 'aria-label': "click to see more menu option" }}>{menu}</SplitButton>
          </div>
        </div>
      </div >
    )
  }
}