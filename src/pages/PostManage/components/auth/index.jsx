import React, { Component } from 'react';
import { Button } from '@alifd/next';
import AuthTree from '../../../../components/AuthTree'
import './index.scss'

export default class Auth extends Component {
  constructor() {
    super()
    this.state = {
      loading: false
    }
  }
  saveData = () => {
    //   Dialog.confirm({
    //     title: '确认',
    //     content: '确认保存？',
    //     onOk: () => console.log('ok'),
    //     onCancel: () => console.log('cancel')
    // });
    if (this.state.loading) {
      return
    }
    console.log(1111, this.refs['auth'])
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ loading: false })
    }, 3000)
  }
  render() {
    const { loading } = this.state
    return (
      <div className='auth-wrapper'>
        <div className='auth-container'>
          <AuthTree ref='auth' defaultExpandAll />
        </div>
        <div className='auth-footer'>
          <Button type="primary" loading={loading} onClick={this.saveData}>保存</Button>
        </div>
      </div>
    )
  }
}