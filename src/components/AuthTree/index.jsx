import React, { Component } from 'react';
import { Tree, Radio } from '@alifd/next';

import './index.scss'
const aaa = ['2-1-1', '2-1-2', '2-1-3', '2-1-4', '2-1-5', '2-1-6', '2-1-7', '2-1-8', '2-1']

export default class AuthTree extends Component {
  constructor() {
    super()
    this.state = {
      treeList: [{
        label: '管理台',
        key: '1',
        children: [{
          label: 'Form',
          key: '1-1',
          selectable: false,
          children: [{
            label: 'Input',
            key: '1-1-1'
          }, {
            label: 'Select',
            key: '1-1-2',
            disabled: true
          }]
        }, {
          label: 'Display',
          key: '1-2',
          children: [{
            label: 'Table',
            key: '6'
          }]
        }]
      },
      {
        label: '出借业务查询',
        key: '2',
        children: [{
          label: '出借客户',
          key: '2-1',
          children: [{
            label: '查看列表',
            key: '2-1-1'
          }, {
            label: '查看详情',
            key: '2-1-2',
          }, {
            label: '停用',
            key: '2-1-3',
          }, {
            label: '新建',
            key: '2-1-4',
          }, {
            label: '查看详情',
            key: '2-1-5',
          }, {
            label: '编辑',
            key: '2-1-6',
          }, {
            label: '禁止登陆',
            key: '2-1-7',
          }, {
            label: '恢复',
            key: '2-1-8',
          }]
        }, {
          label: '出借查询',
          key: '2-2',
          children: [{
            label: 'Table',
            key: '2-2-1'
          }]
        }, {
          label: '回款计划',
          key: '2-3',
          children: [{
            label: 'Table',
            key: '2-3-1'
          }]
        }, {
          label: '交易记录',
          key: '2-4',
          children: [{
            label: 'Table',
            key: '2-4-1'
          }]
        }]
      },
      {
        label: '管理台',
        key: '3',
        children: [{
          label: 'Form',
          key: '3-1',
          selectable: false,
          children: [{
            label: 'Input',
            key: '3-1-1'
          }, {
            label: 'Select',
            key: '3-1-2',
            disabled: true
          }]
        }, {
          label: 'Display',
          key: '3-2',
          children: [{
            label: 'Table',
            key: '3-2-1'
          }]
        }]
      }],
      funAuth: [],
      dataAuth: ''
    }
  }
  componentDidMount() {
    this.getAuth()
  }
  onSelect(keys, info) {
    console.log('onSelect', keys, info);
  }

  onCheck = (keys, info) => {
    this.setState({ funAuth: keys })
  }

  onEditFinish(key, label, node) {
    console.log('onEditFinish', key, label, node);
  }

  onRightClick(info) {
    console.log('onRightClick', info);
  }
  getAuth = (key = 0) => {
    let data = aaa.filter((item, index) => index === Math.floor(Math.random() * 8))
    this.setState({ funAuth: data })
  }
  changeDataAuth = (value) => {
    this.setState({ dataAuth: value })
  }
  render() {
    const { treeList, funAuth } = this.state
    const { defaultExpandAll = false } = this.props
    return (
      <div className='auth-wrapper'>
        <div className='auth-item'>
          <div className='auth-header'>功能权限</div>
          <div className='auth-content'>
            <Tree checkable editable
              defaultExpandAll={defaultExpandAll}
              // defaultExpandedKeys={[]}
              // defaultCheckedKeys={chooseData || []} // 默认选中的树节点
              checkedKeys={funAuth || []}
              onSelect={this.onSelect}
              onCheck={this.onCheck}
              onEditFinish={this.onEditFinish}
              onRightClick={this.onRightClick}
              dataSource={treeList} />
          </div>
        </div>
        <div className='auth-item'>
          <div className='auth-header'>数据权限</div>
          <div className='auth-content'>
            <Radio.Group
              itemDirection='ver'
              onChange={this.changeDataAuth}
            >
              <Radio value="react">支撑序列</Radio>
              <Radio value="vue">市场序列</Radio>
              <Radio value="angular">最高管理权限</Radio>
            </Radio.Group>
          </div>
        </div>
      </div>
    )
  }
}