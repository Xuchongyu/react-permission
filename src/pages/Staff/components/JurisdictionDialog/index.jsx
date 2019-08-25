/**
 * @description: 权限弹框
 */
import React from 'react';
import { Dialog, Tab } from '@alifd/next';
import AuthTree from '../../../../components/AuthTree';

const tabs = [
  { title: '标准', key: 1 },
  { title: '自定义', key: 2 }
]

export default class JurisdictionDialog extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      visible: false,
    }
  }
  
  render(){
    const { qxVisible } = this.props;
    return (
      <div className='staff-wrapper'>
        <Dialog 
          title="修改权限"
          visible={qxVisible}
          onOk={this.onClose}
          onCancel={this.onClose}
          onClose={this.onClose}
          style={{ width: '80%', overflow: 'hidden' }}
        >
          <Tab>
            {
              tabs.map((v) => {
                return <Tab.Item key={v.key} title={v.title}>
                  <AuthTree defaultExpandAll />
                </Tab.Item>
              })
            }
          </Tab>
        </Dialog>
      </div>
    )
  }
  // 弹窗关闭
  onClose = () => {
    this.props.qxOnClose();
  }
}