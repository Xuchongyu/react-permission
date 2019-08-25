/**
 * @author:louhuiru
 * @description: 个人客户管理
 */
import React from 'react';
import { Table, Balloon } from '@alifd/next';
import {timestampToDate} from "../../utils/dateUtils";
import './index.scss';
import ManagementHeader from "./components/ManagementHeader";
import AddProblemList from "./components/AddProblemList";
export default class PersonalManagement extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      customerList:[]
    }
  }

  componentDidMount() {
    this.getCustomers();
  }

  getCustomers = () =>{
    let dataSource = [];
    dataSource.push({customerId: "1231321", name:"张三",balance:"200",openAccountStatus:"农业银行", certNo:"220180199409092134", age:"21",salesmanId:'王同三', registerTime:1565923056000})
    this.setState({
      customerList: dataSource
    })
  }


  operation = (value,index, record) => {
    return (<div>
      < a className='link' onClick = {() =>{}} > 编辑  </a>
      < a className='link' onClick = {() =>{}} > 拜访   </a>
      < a className='link' onClick = {() =>{}} >  设置营销人  </a>
	    <AddProblemList
			    index={index}
			    record={record}
	    />
    </div>)
  };

  renderName = (value,index, record) =>{
    return (<div>< a className='link' onClick = {() =>{}} > {value}  </a><span className='state-text-green'>出借人</span></div>);
  }

  renderAccountInfo = (value,index, record) =>{
	  const defaultValue = <a className='link'>{value}</a>;
	  return (<Balloon trigger={defaultValue} align="b" closable={false} triggerType="hover">
			  <div>
				  绑定卡号：<span>6228480369414944370</span><br/>
				  绑卡时间：<span>2019-03-27 10:47:48</span><br/>
				  存管电子账号：<span>6212461440000032339</span>
			  </div>
	  </Balloon>);
  }

  renderSalesmanInfo = (value,index, record) =>{
	  const defaultValue = <a className='link'>{value}</a>;
	  return (<Balloon trigger={defaultValue} align="b" closable={false} triggerType="hover">
			  <div>
				  工号：<span>110022</span><br/>
				  手机号：<span>15068773632</span><br/>
			  </div>
	  </Balloon>);
  }
  render(){
    return (
        <div>
	        <ManagementHeader />
          <Table className='custom-table' hasBorder={false} dataSource={this.state.customerList} >
            <Table.Column title="姓名" dataIndex="name" cell = {(value, index, record) =>this.renderName(value,index, record)}/>
            <Table.Column title="年龄" dataIndex="age" />
            <Table.Column title="账户余额" dataIndex="balance" />
            <Table.Column title="业务情况" dataIndex="type" />
            <Table.Column title="开户情况" dataIndex="openAccountStatus" cell = {(value, index, record) =>this.renderAccountInfo(value,index, record)}/>
            <Table.Column title="注册时间" dataIndex="registerTime" cell = {(v) =>{return timestampToDate(v)}}/>
            <Table.Column title="经营/通讯地址" dataIndex="address" />
            <Table.Column title="客户经理" dataIndex="salesmanId" cell = {(value, index, record) =>this.renderSalesmanInfo(value,index, record)}/>
            <Table.Column title="操作" dataIndex="" cell = {(value,index, record) =>this.operation(value,index, record)}/>
          </Table>

        </div>

    )
  }
}