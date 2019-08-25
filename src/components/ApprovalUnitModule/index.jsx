import React, { Component } from 'react'
import IcePanel from '@icedesign/panel';
import { Checkbox, Grid, Form, Input } from '@alifd/next';
import { productList } from './field'
import { mul } from '../../utils/calculation'
import './index.scss'

const { Group: CheckboxGroup } = Checkbox;
const { Row, Col } = Grid;
const FormItem = Form.Item;

export default class ApprovalUnitModule extends Component {
  constructor() {
    super()
    this.state = {
      value: ['apple']
    }
  }
  onChange = (selectedItems) => {
    this.setState({ value: selectedItems })
  }
  renderProduct = (data) => {
    let newData = []
    data.rate = mul(data.rate, 100) + '%'
    data.implementRate = mul(data.implementRate, 100) + '%'
    for (let key in productList) {
      newData.push(
        <Col span='8' style={{ marginBottom: '10px' }}>
          {`${productList[key]}: ${data[key] || data[key] === 0 ? data[key] : 无}`}
        </Col>
      )
    }
    return newData
  }
  render() {
    const { title, type = 'show' } = this.props
    const { value } = this.state
    const aa = {
      rate: 0.2,
      cycle: '11天~180天',
      mode: '先息后本',
      implementRate: 0.3,
      LoanCycle: '11天~180天',
      validity: '2019-08-03 ~ 2021-09-05',
    }
    const formItemLayout = {
      labelCol: {fixedSpan: 6}
  };
    return (
      <IcePanel>
        <IcePanel.Header>
          {title}
        </IcePanel.Header>
        <IcePanel.Body>
          <div className='customer-type'>
            信用评级: B类客户
          </div>
          <div className='customer-product'>
            <CheckboxGroup value={value} onChange={this.onChange}>
              <div className='customer-product-item'>
                <Row>
                  <Col span='3'>
                    <Checkbox id="apple" value="apple">Apple</Checkbox>
                  </Col>
                  <Col span='21'>
                    <Row gutter="4">
                      <Col>
                        <FormItem {...formItemLayout} labelAlign='left'
                          label='指导利率：'
                        >
                          <p>{mul(aa.rate, 100) + '%'}</p>
                        </FormItem>
                      </Col>
                      <Col>
                        <FormItem {...formItemLayout} labelAlign='left'
                          label='指导利率：'
                        >
                          <p>{mul(aa.rate, 100) + '%'}</p>
                        </FormItem>
                      </Col>
                      <Col>
                        <FormItem {...formItemLayout} labelAlign='left'
                          label='指导利率：'
                        >
                          <p>{mul(aa.rate, 100) + '%'}</p>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row gutter="4">
                      <Col>
                        <FormItem {...formItemLayout} labelAlign='left'
                          label='执行利率：'
                        >
                          {type === 'edit' ? <Input placeholder='请输入' aria-label='%'/> : <p>{mul(aa.rate, 100) + '%'}</p>}
                        </FormItem>
                      </Col>
                      <Col>
                        <FormItem {...formItemLayout} labelAlign='left'
                          label='借款周期：'
                        >
                          <p>{mul(aa.rate, 100) + '%'}</p>
                        </FormItem>
                      </Col>
                      <Col>
                        <FormItem {...formItemLayout} labelAlign='left'
                          label='使用有效期：'
                        >
                          <p>{mul(aa.rate, 100) + '%'}</p>
                        </FormItem>
                      </Col>
                    </Row>
                    {/* <Row wrap>
                      {this.renderProduct(aa)}
                    </Row> */}
                  </Col>
                </Row>
              </div>
            </CheckboxGroup>
          </div>
        </IcePanel.Body>
      </IcePanel>
    )
  }
}