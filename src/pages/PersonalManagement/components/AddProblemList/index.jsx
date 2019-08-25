import React, { Component } from 'react';
import { Input, Select, Dialog  } from '@alifd/next';
import { Form, Field } from '@ice/form';

import './index.scss'

export default class AddProblemList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      visible: false,
      choose: 0
    }
  }
  onClick = () => {
    console.log(this.state.value);
  };
  onChange = (value) => {
    this.setState({ value })
  }

  add = () => {
    this.setState({
      visible: true
    });
  }
  onClose = reason => {
    console.log(reason);

    this.setState({
      visible: false
    });
  };
  async onSubmit(values) {
    window.alert(JSON.stringify(values, 0, 2))
  }
  onOk = (e) => {
    this.handleSubmit(e);
  };
  render() {
    return (
      <div className=''>
        <a className='link' onClick={() => this.add()}>
          加入问题客户
        </a>
        <Dialog
          title="加入问题客户"
          visible={this.state.visible}
          cancelProps={{ 'aria-label': 'cancel' }}
          okProps={{ 'aria-label': 'ok' }}
          onOk={this.onOk.bind(this)}
          onCancel={this.onClose.bind(this, 'cancelClick')}
          onClose={this.onClose}
          style={{
            width: 600,
          }}>
          <Form
            onSubmit={this.onSubmit}
            layout={{
              labelCol: 2,
              wrapperCol: 4,
              labelTextAlign: 'center',
              labelAlign: 'top'
            }}
          >
            {formCore => {
              this.handleSubmit = formCore.submit.bind(formCore);
              return (
                <div>
                  <Field name="type" label="问题客户类型：" component={Select} labelAlign='top' placeholder="请输入名字" />
                  <Field name="reason" label="加入原因：" component={Input.TextArea} placeholder="请输入年龄" />
                </div>
              )
            }}
          </Form>
        </Dialog>
      </div>
    )
  }
}