/**
 * @author:LouHuiRu
 * @description: 部门和人员之间的联动下拉框
 * 
 */
import React, { Component } from 'react';
import { Select } from '@alifd/next';


const departmentList = ['张三', '李四'];
const personList = {
    '张三': ['张小一','张小二', '张小三'],
    '李四': ['李小一', '李小一', '李小二'],
  };

export default class LinkageSelect extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: [],
      disabled: true
    }
  }

  render(){
    const { personValue, departmentValue, disabled, data } =this.state;
    return (
      <div>
        <Select 
          dataSource={departmentList} 
          value={departmentValue} 
          onChange={this.handleDepartmentChange}
        />
        <Select 
          dataSource={data}
          value={personValue}
          onChange={this.handlePersonChange}
          disabled={disabled}
        />
      </div>
    )
  }
  // 部门
  handleDepartmentChange = (v) => {
    const data = personList[v];
    this.setState({data, departmentValue: v, personValue: '', disabled: !data});
  }
  // 人员
  handlePersonChange = (v) => {
    this.setState({
      personValue:v,
    })
  }
}