import React from 'react';
import { FormBinderWrapper, FormBinder } from '@icedesign/form-binder';
import { DatePicker, Input, Select, Radio, Button, Icon } from '@alifd/next';
import InputBox from '../../../../components/InputBox';
import LinkageSelect from '../../../../components/LinkageSelect';
import './css.scss';

const RadioGroup = Radio.Group;

export default class ManagementHeader extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      headerData: {
        name: '', // 名字
        tel: '', // 手机号
        startDate: '', // 注册开始日期
        endDate: '', // 注册结束日期
        startLoanMoney: '', // 借款开始金额
        endLoanMoney: '', // 借款结束金额
        startLendMoney: '', // 出借开始金额
        endLendMoney: '', // 出借结束金额
        startCreditMoney: '', // 授信开始金额
        endCreditMoney: '', // 授信结束金额
        marketing: '', // 机构/客户经理
        department: '', // 部门
        staff: '', // 员工
        address: '', // 地址
        grade: '', // 信用评级
        startAge: '', // 开始年龄
        endAge: '', // 结束年龄
        status: '', // 账户状态
        people: '', // 借款人/出借人
        activationStatus: '', // 激活状态
      }, 
      isOpen: true
    }
  }
  render(){
    const { headerData, isOpen } = this.state;
    return (
      <FormBinderWrapper
        value={headerData}
        ref={ele => this.getHeaderFormRef = ele}
      >
        <div className="management-header">
          <div className={`${!isOpen ? 'take-in' : 'open'} header-content`}>
            <InputBox />
            <dl>
              <dt>注册日期</dt>
              <dd>
                <FormBinder name="startDate">
                  <DatePicker className="width-style" />
                </FormBinder>
                <FormBinder name="endDate">
                  <DatePicker className="width-style" />
                </FormBinder>
              </dd>
            </dl>
            <dl>
              <dt>借款余额</dt>
              <dd>
                <FormBinder name="startLoanMoney">
                  <Input className="width-style" />
                </FormBinder>
                <FormBinder name="endLoanMoney">
                  <Input className="width-style" />
                </FormBinder>
              </dd>
            </dl>
            <dl>
              <dt>出借余额</dt>
              <dd>
                <FormBinder name="startLendMoney">
                  <Input className="width-style" />
                </FormBinder>
                <FormBinder name="endLendMoney">
                  <Input className="width-style" />
                </FormBinder>
              </dd>
            </dl>
            <dl>
              <dt>授信余额</dt>
              <dd>
                <FormBinder name="startCreditMoney">
                  <Input className="width-style" />
                </FormBinder>
                <FormBinder name="endCreditMoney">
                  <Input className="width-style" />
                </FormBinder>
              </dd>
            </dl>
            <dl>
              <dt>机构/客户经理</dt>
              <dd>
                <FormBinder name="marketing">
                  <Select className="width-style" />
                </FormBinder>
                <LinkageSelect />
              </dd>
            </dl>
            <dl>
              <dt>地址</dt>
              <dd>
                <FormBinder name="address">
                  <Input className="width-style" />
                </FormBinder>
              </dd>
            </dl>
            <dl>
              <dt>信用评级</dt>
              <dd>
                <FormBinder name="grade">
                  <Select className="width-style" />
                </FormBinder>
              </dd>
            </dl>
            <dl>
              <dt>年龄</dt>
              <dd>
                <FormBinder name="startAge">
                  <Input className="width-style" />
                </FormBinder>
                <FormBinder name="endAge">
                  <Input className="width-style" />
                </FormBinder>
              </dd>
            </dl>
            <dl>
              <dt>账户状态</dt>
              <dd>
                <FormBinder name="status">
                  <Select className="width-style" />
                </FormBinder>
              </dd>
            </dl>
            <dl>
              <dt />
              <dd>
                <FormBinder name="people">
                  <RadioGroup dataSource={[{label: '全部', value: ''}]} shape="button" />
                </FormBinder>
              </dd>
            </dl>
            <dl>
              <dt />
              <dd>
                <FormBinder name="activationStatus">
                  <RadioGroup dataSource={[{label: '全部', value: ''}]} shape="button" />
                </FormBinder>
              </dd>
            </dl>
          </div>
          <div className="header-button">
            <Button type="primary" onClick={this.handelSearchClick}>查询</Button>
            <a 
              onClick={() => {
                this.setState({isOpen: !this.state.isOpen})
              }}
              href="javascript:;"
            >
              {
                !isOpen ? 
                <React.Fragment>展开<Icon type="arrow-down" /></React.Fragment> : 
                <React.Fragment>收起<Icon type="arrow-up" /></React.Fragment>
              }
            </a>
          </div>
        </div>
      </FormBinderWrapper>
    )
  }
  // 查询按钮得到数据
  handelSearchClick = () => {
    const { validateFields } = this.getHeaderFormRef;
    validateFields((errors, values) => {
      console.log(errors, values);
    })
  }
}