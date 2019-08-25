/**
 * @author:LouHuiRu
 * @description: 输入框选择组件，根据下拉框的值改变输入框的placeholder
 * @param: isRequired: 是否开启验证
 *         inputMessage: 自定义验证提示
 *         父组件通过ref获取到输入框数据
 */
import React, { Component } from 'react';
import { FormBinderWrapper, FormBinder, FormError } from '@icedesign/form-binder';
import { Input, Select } from '@alifd/next';


const sel = [{label: '姓名', value: '1'}, {label: '手机号', value: '2'}]
export default class InputBox extends Component{
  constructor(props){
    super(props);
    this.state = {
      d: {
        selectValue: '1', // 下拉框值
        inputValue: '', // 输入框值
      },
      inpPlaceholder: '请输入姓名',
    }
  }
  render(){
    const { isRequired, inputMessage } = this.props;
    const { d, inpPlaceholder } = this.state;
    return(
      <FormBinderWrapper
        value={d}
        ref={ele => this.formData = ele}
      >
        <div style={{ display: 'flex',  alignItems: 'center' }}>
          <FormBinder name="selectValue" required>
            <Select dataSource={sel} onChange={this.selectChange} />
          </FormBinder>
          <div style={{ display: 'inline-block', marginLeft: '8px' }}>
            <FormBinder name="inputValue" required={isRequired} message={inputMessage}>
              <Input placeholder={inpPlaceholder} />
            </FormBinder>
            <div style={{ display: 'table' }}>
              <FormError name="inputValue" />
            </div>
          </div>
        </div>
      </FormBinderWrapper>
    )
  }
  // 下拉框change
  selectChange = (v) => {
    let { inpPlaceholder, d } = this.state;
    v === '1' ? inpPlaceholder = '请输入姓名' : inpPlaceholder = '请输入手机号';
    this.setState({
      inpPlaceholder, 
      d: {
        selectValue: v,
      }
    })
  }
}
