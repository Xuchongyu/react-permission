/**
 * @description: 员工管理
 */
import React, { Component } from 'react';
import { Nav, Button, Table, Pagination } from '@alifd/next';
import JurisdictionDialog from './components/JurisdictionDialog';
import SearchParams from './components/SearchParams';
import NewEmployeesDialog from './components/NewEmployeesDialog';
import SubordinateDialog from './components/SubordinateDialog';
import StationsDialog from './components/StationsDialog';
import './css.scss';

const { Item, SubNav } = Nav;
const navList = [
  {
    department: '总经理办公室',
    children: [
      {
        yi: '财务安全部',
      },
      {
        yi: '人力资源部',
      },
      {
        yi: '分县管理部',
      },
      {
        yi: '客户服务部',
      },
      {
        yi: '技术发展部',
      },
      {
        yi: '运营部'
      }
    ]
  },
  {
    department: '业务发展部',
    children: [
      {
        yi: '总部业务部',
      },
      {
        yi: '新河营业部',
      },
      {
        yi: '大溪营业部'
      }
    ]
  }
]

export default class Staff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false, // 员工编辑弹框
      title: '', // 员工title
      qxVisible: false, // 权限弹框
      xsVisible: false, // 选择下属弹框
      gwVisible: false, // 选择岗位弹框
    }
  }
  render() {
    const { isVisible, title, qxVisible, xsVisible, gwVisible } = this.state;
    const aa = `${window.location.href}`;
    console.log(aa, 'aa')
    return (
      <div className="staff-page">
        <div className="staff-nav">
          <Nav>
            {
              navList.map((v, i) => {
                return (
                  <SubNav key={i} label={v.department}>
                    {v.children.map((item, k) => <Item key={k}>{item.yi}</Item>)}
                  </SubNav>
                )
              })
            }
          </Nav>
        </div>
        <div className="staff-content">
          <SearchParams />
          <Button type="primary" onClick={() => this.addEmployees('add')}>新增员工</Button>
          <Button type="primary" onClick={this.handelJurisdictionClick}>权限配置</Button>
          <Button type="primary" onClick={this.handelXSClick}>选择下属</Button>
          <Button type="primary" onClick={this.handelGWClick}>选择岗位</Button>
          <Table>
            <Table.Column title="员工姓名" />
            <Table.Column title="岗位" />
            <Table.Column title="所属机构/上级主管" />
            <Table.Column title="生日" />
            <Table.Column title="居住地址" />
            <Table.Column title="入职时间" />
            <Table.Column title="合同签订时间" />
            <Table.Column title="合同到期时间" />
            <Table.Column title="权限类型" />
            <Table.Column title="状态" />
            <Table.Column title="操作" cell={this.handelOperationCell} />
          </Table>
          <div className="div-pagination">
            <span>共有0条数据</span>
            <Pagination 
              link={aa}
              pageSizeSelector="dropdown"
            />
          </div>
        </div>
        <NewEmployeesDialog isVisible={isVisible} title={title} employeesClose={this.employeesClose} />
        <JurisdictionDialog qxVisible={qxVisible} qxOnClose={this.qxOnClose} /> 
        <SubordinateDialog xsVisible={xsVisible} xsOnClose={this.xsOnClose} />
        <StationsDialog gwVisible={gwVisible} gwOnClose={this.gwOnClose} />
      </div>
    )
  }
  // 选择岗位弹框关闭
  gwOnClose = () => {
    this.setState({gwVisible: false})
  }
  // 选择岗位
  handelGWClick = () => {
    this.setState({gwVisible: true})
  }
  // 选择下属弹框关闭
  xsOnClose = () => {
    this.setState({xsVisible: false})
  }
  // 选择下属
  handelXSClick = () => {
    this.setState({xsVisible: true})
  }
  // 权限弹框关闭
  qxOnClose = () => {
    this.setState({qxVisible: false})
  }
  // 权限配置点击事件
  handelJurisdictionClick = () => {
    this.setState({qxVisible: true})
  }
  // 关闭新增员工弹框
  employeesClose = () => {
    this.setState({isVisible: false})
  }
  // 新增员工
  addEmployees = (type) => {
    this.setState({isVisible: true, title: type === 'add' ? '新增员工' : '编辑'})
  }
  // 操作展示
  handelOperationCell = () => {
    return (
      <React.Fragment>
        <a href="javascript:;">编辑</a>
        <a href="javascript:;">分配下属劳动合同管理</a>
        <a href="javascript:;">分配岗位修改权限</a>
      </React.Fragment>
    )
  }
}