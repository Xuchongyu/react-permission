/**
 * @description: 新增员工弹框
 * @author: louhuiru
 */
import React from 'react';
import { FormBinderWrapper, FormBinder, FormError } from '@icedesign/form-binder';
import { Dialog, Input, DatePicker, Select, Radio } from '@alifd/next';

const RadioGroup = Radio.Group;

export default class NewEmployeesDialog extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      employeesData: {}
    }
  }
  render(){
    const { isVisible, title } = this.props;
    const { employeesData } = this.state;
    return (
      <FormBinderWrapper
        value={employeesData}
      >
        <Dialog
          visible={isVisible}
          title={title}
          className="new-employees-dialog"
          onCancel={this.onClose}
          onOk={this.onSave}
          onClose={this.onClose}
        >
          <dl>
            <dt>上传</dt>
            <dd />
          </dl>
          <dl>
            <dt className="required-sign">姓名:</dt>
            <dd>
              <FormBinder name="name" required message="必填项">
                <Input placeholder="输入姓名" className="frame-style" />
              </FormBinder>
              <FormError name="name" />
            </dd>
          </dl>
          <dl>
            <dt className="required-sign">工号:</dt>
            <dd>
              <FormBinder name="gonghao" required message="必填项">
                <Input placeholder="输入工号" className="frame-style" />
              </FormBinder>
              <FormError name="gonghao" />
            </dd>
          </dl>
          <dl>
            <dt className="required-sign">所属机构:</dt>
            <dd>
              <FormBinder name="jigou" required message="必填项">
                <Select className="frame-style"  />
              </FormBinder>
              <FormError name="jigou" />
            </dd>
          </dl>
          <dl>
            <dt className="required-sign">入职日期:</dt>
            <dd>
              <FormBinder name="ruzhiDate" required message="必填项">
                <DatePicker className="frame-style" />
              </FormBinder>
              <FormError name="ruzhiDate" />
            </dd>
          </dl>
          <dl>
            <dt className="required-sign">转正日期:</dt>
            <dd>
              <FormBinder name="zhuanzhengDate" required message="必填项">
                <DatePicker className="frame-style" />
              </FormBinder>
              <FormError name="zhuanzhengDate" />
            </dd>
          </dl>
          <dl>
            <dt>身份证号:</dt>
            <dd>
              <FormBinder name="IDCard">
                <Input placeholder="输入身份证号" className="frame-style" />
              </FormBinder>
            </dd>
          </dl>
          <dl>
            <dt className="required-sign">手机号:</dt>
            <dd>
              <FormBinder name="tel" required message="必填项">
                <Input placeholder="输入手机号" className="frame-style" />
              </FormBinder>
              <FormError name="tel" />
            </dd>
          </dl>
          <dl>
            <dt>性别:</dt>
            <dd>
              <FormBinder name="xingbie">
                <RadioGroup dataSource={[{label: '男', value: 'male'}, {label: '女', value: 'female'}]}  />
              </FormBinder>
            </dd>
          </dl>
          <dl>
            <dt>是否党员:</dt>
            <dd>
              <FormBinder name="dangyuan">
                <RadioGroup dataSource={[{label: '是', value: '是'}, {label: '否', value: '否'}]} />
              </FormBinder>
            </dd>
          </dl>
          <dl>
            <dt>专业:</dt>
            <dd>
              <FormBinder name="zhuanye">
                <Input placeholder="输入专业" className="frame-style"/>
              </FormBinder>
            </dd>
          </dl>
          <dl>
            <dt>学历:</dt>
            <dd>
              <FormBinder name="xueli">
                <Select className="frame-style" />
              </FormBinder>
            </dd>
          </dl>
          <dl>
            <dt>公司邮箱:</dt>
            <dd>
              <FormBinder name="emil">
                <Input placeholder="输入公司邮箱" className="frame-style" />
              </FormBinder>
            </dd>
          </dl>
          <dl>
            <dt>固话:</dt>
            <dd>
              <FormBinder name="tel">
                <Input placeholder="输入电话号码" className="frame-style" />
              </FormBinder>
            </dd>
          </dl>
          <dl>
            <dt>导师:</dt>
            <dd>
              <FormBinder name="teacher">
                <Select className="frame-style" />
              </FormBinder>
            </dd>
          </dl>
          <dl>
            <dt>推荐人:</dt>
            <dd>
              <FormBinder name="tuijianren">
                <Select className="frame-style" />
              </FormBinder>
            </dd>
          </dl>
          <dl>
            <dt>紧急联系人:</dt>
            <dd>
              <FormBinder name="lianxiren">
                <Input placeholder="输入紧急联系人" className="frame-style" />
              </FormBinder>
            </dd>
          </dl>
          <dl>
            <dt>联系人号码:</dt>
            <dd>
              <FormBinder name="lianxirenhaoma">
                <Input placeholder="输入联系人号码" className="frame-style" />
              </FormBinder>
            </dd>
          </dl>
          <dl>
            <dt>居住地址:</dt>
            <dd>
              <FormBinder name="sheng">
                <Select className="frame-style" />
              </FormBinder>
              <FormBinder name="shi">
                <Select className="frame-style" />
              </FormBinder>
              <FormBinder name="shi">
                <Select className="frame-style" />
              </FormBinder>
              <FormBinder name="zhen">
                <Select className="frame-style" />
              </FormBinder>
              <FormBinder name="sheng">
                <Input className="frame-style" />
              </FormBinder>
            </dd>
          </dl>
          <dl>
            <dt>备注:</dt>
            <dd>
              <FormBinder name="beizhu">
                <Input.TextArea className="text-area" placeholder="输入备注" aria-label="TextArea" />
              </FormBinder>
            </dd>
          </dl>
        </Dialog>
      </FormBinderWrapper>
    )
  }
  // 保存后生成随机6位
  onSave = () => {
    const d = Math.random().toFixed(6).slice(-6);
  }
  // 关闭弹框
  onClose = () => {
    this.props.employeesClose();
  }
}