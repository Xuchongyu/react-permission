/**
 * @description: 审批记录
 */
import React, { Component } from 'react';
import { Table } from '@alifd/next';

const dataList = [
  {
    chuliren: '李现',
    bumen: 'K&&K俱乐部',
    gangwei: 'Boss',
    jiedian: '提交申请',
    time: '2019-08-15 16:43:29',
    result: '无',
    yijian: '客户优质，希望能够授予二十万的额度'
  }
]
export default class Record extends Component {
  constructor(props){
    super(props);
    this.state = {};
    
  }
  render(){
    return (
      <div style={{marginTop: '20px'}}>
        <Table
          dataSource={dataList}
          hasBorder={false}
        >
          <Table.Column 
            title="处理人" 
            cell={(v, i, r) => {
              return `${r.chuliren}${r.bumen}`
            }}
          />
          <Table.Column dataIndex="gangwei" title="处理人岗位" />                
          <Table.Column dataIndex="jiedian" title="节点名称" />                
          <Table.Column dataIndex="time" title="处理时间" />                
          <Table.Column dataIndex="result" title="审批结果" />                
          <Table.Column dataIndex="yijian" title="意见" />                
        </Table>
      </div>
    )
  }
}