import React from 'react';
import { FormBinderWrapper, FormBinder } from '@icedesign/form-binder';
import { DatePicker, Input, Select, Button } from '@alifd/next';
import '../../css.scss';


export default class SearchParams extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      headerData: {
        name: '', // 名字
        gonghao: '', // 工号
        gangwei: '', // 岗位
        shangji: '', // 上级主管
        startTime: '', // 入职开始时间
        endTime: '', // 入职结束时间
        startBirthday: '', // 生日开始时间
        endBirthday: '', // 生日结束时间
      }, 
    }
  }
  render(){
    const { headerData } = this.state;
    return (
      <FormBinderWrapper
        value={headerData}
        ref={ele => this.getHeaderFormRef = ele}
      >
        <div className="staff-management-header">
          <div className="header-content">
            <dl>
              <dt>姓名</dt>
              <dd>
                <FormBinder name="name">
                  <Input className="width-style"/>
                </FormBinder>
              </dd>
            </dl>
            <dl>
              <dt>工号</dt>
              <dd>
                <FormBinder name="gonghao">
                  <Input className="width-style" />
                </FormBinder>
              </dd>
            </dl>
            <dl>
              <dt>岗位</dt>
              <dd>
                <FormBinder name="gangwei">
                  <Select className="width-style" />
                </FormBinder>
              </dd>
            </dl>
            <dl>
              <dt>上级主管</dt>
              <dd>
                <FormBinder name="shangji">
                  <Select className="width-style" />
                </FormBinder>
              </dd>
            </dl>
            <dl>
              <dt>入职时间</dt>
              <dd>
                <FormBinder name="startTime">
                  <DatePicker className="width-style" />
                </FormBinder>
                <FormBinder name="endTime">
                  <DatePicker className="width-style" />
                </FormBinder>
              </dd>
            </dl>
            <dl>
              <dt>生日</dt>
              <dd>
              <FormBinder name="startBirthday">
                  <DatePicker className="width-style" />
                </FormBinder>
                <FormBinder name="endBirthday">
                  <DatePicker className="width-style" />
                </FormBinder>
              </dd>
            </dl>
            <dl>
              <dt />
              <dd>
                <Button type="primary" onClick={this.handelSearchClick}>查询</Button>
              </dd>
            </dl>
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