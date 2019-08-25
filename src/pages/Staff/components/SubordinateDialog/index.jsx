/**
 * @description:选择下属弹框
 */
import React from 'react';
import { Dialog, Select } from '@alifd/next';

const dataSource = [
  {value: '10001', label: 'Lucy King'},
  {value: 10002, label: 'Lily King'},
  {value: 10003, label: 'Tom Cat', disabled: true},
  {label: 'Special Group', children: [
      {value: -1, label: 'FALSE'},
      {value: 0, label: 'ZERO'}
  ]}
];

export default class SubordinateDialog extends React.Component{
  render(){
    const { xsVisible } = this.props;
    return (
      <Dialog
        title="选择下属"
        visible={xsVisible}
        style={{ width: '50%' }}
        onOk={this.onClose}
        onClose={this.onClose}
        onCancel={this.onClose}
      >
        <Select 
          aria-label="tag mode"
          mode="tag" 
          defaultValue={['10001']} 
          dataSource={dataSource} 
          style={{ width: '100%' }}
        />
      </Dialog>
    )
  }
  onClose = () => {
    this.props.xsOnClose();
  }
}