/** 
 * @author:LouHuiru
 * @description: 年检审批页面
*/
import React from 'react';
import { Tab } from '@alifd/next';
import Details from './components/Details';
import Record from './components/Record';
import './index.scss'

const tabs = [
  { title: '授信年检详情', key: 1, content: <Details /> },
  { title: '审批记录', key: 2, content: <Record /> }
]

const Renewal = () => (
  <div className='renewal-container'>
    <Tab>
      {
        tabs.map((v) => {
          return <Tab.Item key={v.key} title={v.title}>
            {v.content}
          </Tab.Item>
        })
      }
    </Tab>
  </div>

)

export default Renewal;