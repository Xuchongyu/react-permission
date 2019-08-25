import React, { Component } from 'react';
import Notice from './components/notice'
import DayBusiness from '../../components/DayBusiness';
import InputBox from '../../components/InputBox';

import './index.scss'


export default class Management extends Component {
  toMorePage = () => {
    const {itemCollapse} = this.props
    itemCollapse && itemCollapse('/daily/console/insert')
  }
  render() {
    return (
      <div className='management-wrapper scroll'>
        1111111
        <div className='management-content'>
          <div className='left'>
          <DayBusiness />
          </div>
          <div className='right'>
            <Notice header={() => <div>代办（4）</div>} operationClick={this.toMorePage}>
              <div>2222222</div>
            </Notice>
            <Notice header={() => <div>代办（4）</div>} operationClick={this.toMorePage}>
              <div>2222222</div>
            </Notice>
          </div>
        </div>
        <InputBox ref={ele => this.inputBoxRef = ele} isRequired={true} inputMessage={'测试'} />
        <button onClick={this.handeChange}>点击获取数据</button>
      </div>
    );
  }
  handeChange = () => {
    const { validateFields } = this.inputBoxRef.formData;
    validateFields((errors, values) => {
      if(errors){
        return false;
      }
      console.log(errors, values)
    })
  }
}
