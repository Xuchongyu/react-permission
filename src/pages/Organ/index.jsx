/**
 * @description:机构管理
 * @author:louhuiru
 */
import React from 'react';
import { FormBinderWrapper, FormBinder, FormError } from '@icedesign/form-binder';
import { Button, Input, Table, Dialog, Select } from '@alifd/next';
import './css.scss';

export default class Organ extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      title: '',
      dialogData: {}
    }
  }
  render(){
    const { visible, title, dialogData } = this.state;
    return (
      <div className="organ-pages">
        <p>
          机构名称：
          <Input placeholder="输入机构名称" className="organ-input" />
          <Button type="primary">查询</Button>
        </p>
        <Button type="primary" onClick={() => this.handelDialogClick('add')}>新增</Button>
        <Button type="primary" onClick={() => this.handelDialogClick('edit')}>编辑测试按钮</Button>
        <Table>
          <Table.Column title="机构名称" />
          <Table.Column title="机构地址" />
          <Table.Column title="机构负责人" />
          <Table.Column title="负责人手机号" />
          <Table.Column title="负责人电话" />
          <Table.Column title="上级机构" />
          <Table.Column title="操作" cell={this.handelCaoZuoCell}/>
        </Table>
        <FormBinderWrapper
          value={dialogData}
        >
          <Dialog
            visible={visible}
            title={title}
            onCancel={this.onClose}
            onClose={this.onClose}
            onOk={this.onClose}
            className="dialog-style"
          >
            {title === '新增' ? <dl>
              <dt>上层机构：</dt>
              <dd>
                <FormBinder name="shangceng" required message="必填项">
                  <Select className="frame-style" />
                </FormBinder>
                <div>
                  <FormError name="shangceng" />
                </div>
              </dd>
            </dl> : null}
            <dl>
              <dt>机构名称：</dt>
              <dd>
                <FormBinder name="name" required message="必填项">
                  <Input placeholder="请输入机构名称" className="frame-style" />
                </FormBinder>
                <div>
                  <FormError name="name" />
                </div>
              </dd>
            </dl>
            <dl>
              <dt>机构地址：</dt>
              <dd>
                <FormBinder name="adress" required message="必填项">
                  <Input placeholder="请输入机构地址" className="frame-style" />
                </FormBinder>
                <FormError name="adress" />
              </dd>
            </dl>
            <dl>
              <dt>机构负责人：</dt>
              <dd>
                <FormBinder name="fuzeren" required message="必填项">
                  <Select className="frame-style" />
                </FormBinder>
                <FormError name="fuzeren" />
              </dd>
            </dl>
          </Dialog>
        </FormBinderWrapper>
      </div>
    )
  }
  // 弹框关闭
  onClose = () => {
    this.setState({visible: false})
  }
  // 新增or编辑
  handelDialogClick = (type) => {
    this.setState({title: type === 'add' ? '新增' : '编辑', visible: true})
  }
  // 操作
  handelCaoZuoCell = () => {
    return (
      <React.Fragment>
        <a href="javascript:void(0);" onClick={() => this.handelDialogClick('edit')}>修改</a>
        <a href="javascript:void(0);">删除</a>
      </React.Fragment>
    )
  }
}

