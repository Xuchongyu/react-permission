import React, { Component } from 'react';
import { Tab, Table, Select } from '@alifd/next';
import Info from '../Info';
import DayBusiness from '../../../../components/DayBusiness';
import ImgEnclosure from '../../../../components/ImgEnclosure';
import LinkageSelect from '../../../../components/LinkageSelect';
import './css.scss';

const tabs = [
  { title: '借款人信息', key: 1 },
  { title: '担保人信息', key: 2 },
]

const img = [
  {
    url: 'https://img.alicdn.com/tfs/TB1vyxuwHrpK1RjSZTEXXcWAVXa-1350-900.jpg_800x800q90.jpg',
    bigImg: 'https://img.alicdn.com/tfs/TB1A8NCLNYaK1RjSZFnXXa80pXa-2580-1032.jpg',
    id: 1,
  }, {
    url: 'https://img.alicdn.com/tfs/TB1vyxuwHrpK1RjSZTEXXcWAVXa-1350-900.jpg_800x800q90.jpg',
    bigImg: 'https://img.alicdn.com/tfs/TB1vyxuwHrpK1RjSZTEXXcWAVXa-1350-900.jpg_800x800q90.jpg', 
    id: 2
  }, {
    url: 'https://img.alicdn.com/tfs/TB1vyxuwHrpK1RjSZTEXXcWAVXa-1350-900.jpg_800x800q90.jpg',
    bigImg: 'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
    id: 3
  }, {
    url: 'https://img.alicdn.com/tfs/TB1vyxuwHrpK1RjSZTEXXcWAVXa-1350-900.jpg_800x800q90.jpg',
    bigImg: 'https://img.alicdn.com/tfs/TB1A8NCLNYaK1RjSZFnXXa80pXa-2580-1032.jpg',
    id:4
  }, {
    url: 'https://img.alicdn.com/tfs/TB1vyxuwHrpK1RjSZTEXXcWAVXa-1350-900.jpg_800x800q90.jpg',
    bigImg: 'https://img.alicdn.com/tfs/TB1A8NCLNYaK1RjSZFnXXa80pXa-2580-1032.jpg',
    id: 5
  }
]

const dataSource = () => {
  const result = [];
  for (let i = 0; i < 3; i++) {
    result.push({
      title: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible`,
      id: 100306660940 + i,
      time: 2000 + i,
    });
  }
  return result;
};
const propsConf = {
  className: 'next-myclass',
};


const setCellProps = (rowIndex, colIndex, dataIndex, record) => {
  if (rowIndex === 0) {
    return propsConf;
  }
};
export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
   
    return (
      <div className="renewal-details">
        <DayBusiness />
        <ImgEnclosure imgList={img} />
        <div className="header-info">
          <dl><dt>借款人：</dt><dd>张三11</dd></dl>
          <dl><dt>授信编号：</dt><dd>1234567</dd></dl>
          <dl><dt>授信金额：</dt><dd>1000.00</dd></dl>
          <dl><dt>授信期限：</dt><dd>2018-01-01~2019-09-08</dd></dl>
          <dl><dt>借款余额：</dt><dd>5万</dd></dl>
          <dl><dt>担保人：</dt><dd>李四</dd></dl>
        </div>
        <div className="tab-box">
          <Tab>
            {
              tabs.map((item) => <Tab.Item key={item.key} title={item.title}><Info /></Tab.Item>)
            }
          </Tab>
        </div>
        <LinkageSelect />
        <Table hasBorder={false} dataSource={dataSource()} cellProps={setCellProps}>
          <Table.Column title="Id" dataIndex="id" />
          <Table.Column title="Title" dataIndex="title" />
          <Table.Column title="Time" dataIndex="time" />
        </Table>
      </div>
    )
  }
}