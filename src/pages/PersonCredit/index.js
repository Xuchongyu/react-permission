import React, { Component } from 'react';
import Panel from '../../components/Panel'
import { moneyFormat } from '../../utils/moneyUtil'
import { Form, Input, Switch, Grid, Button, Icon, Balloon, Field, NumberPicker } from '@alifd/next';
import { numberReg } from "../../constants/regexp";
import { oneRow } from './fields'
import './index.scss'

const FormItem = Form.Item;
const { Row, Col } = Grid;
const intlize = val => Intl.NumberFormat('en-US').format(val);
let count = 0

export default class PersonCredit extends Component {
  constructor() {
    super()
    this.state = {
      result: [],
      params: {
        eee: []
      }
    }
    this.field = new Field(this, {
      parseName: true
    })
    this.count = {
      eee: 1
    }
  }
  componentDidMount() {
    this.addRow()
  }
  saveData = () => {
    this.field.validate((errors, values) => {
      if (errors) {
        return
      }
      const { params } = this.state
      let newData = []
      for (let key in values) {
        params[key] && params[key].forEach(item => {
          newData.push(values[key][item.key])
        })
      }
      console.log(33333, newData)
    })
  }
  addRow = (type = '', index = 0) => {
    const { params } = this.state
    if (!type) {
      for (let key in params) {
        params[key].push({ key: 0 })
      }
    } else {
      params[type].splice(index + 1, 0, { key: this.count[type] })
    }
    this.setState({ params }, () => {
      if (type) {
        this.count[type] = this.count[type] + 1;
      }
    })
  }
  delete = (type = '', index = 0) => {
    const { params } = this.state
    params[type].splice(index, 1)
    this.setState(params)
  }
  renderEEE = (key) => {
    const formItemLayout = {
      labelCol: { fixedSpan: 4 }
    };
    const labelAlign = 'top'
    const { init, getValue, getError } = this.field;
    const { params } = this.state
    console.log(params, 'params')
    return params && params[key] && params[key].map((item, index) => {
      return (
        <Row key={`item_${index}`} gutter="4">
          <Col>
            <FormItem {...formItemLayout} labelAlign={labelAlign}
              label={index === 0 ? '应付账款' : ''}
            >
              <Input
                placeholder="简要情况"
                {...init(`${key}.${item.key}.aa`, {
                  initValue: '',
                })}
              />
            </FormItem>
          </Col>
          <Col>
            <FormItem {...formItemLayout} labelAlign={labelAlign}
              label={index === 0 ? '总金额' : ''}
            >
              <NumberPicker
                precision={2}
                style={{ width: '100%' }}
                innerAfter="元"
                min={0}
                format={intlize}
                placeholder="总金额"
                {...init(`${key}.${item.key}.bb`, {
                  initValue: 0,
                  rules: [{ pattern: numberReg, message: '只能填数字' }],
                })}
              />
              <span style={{ color: 'red' }}>{getError(`dd_${index}`)}</span>
            </FormItem>
          </Col>
          <Col>
            <FormItem {...formItemLayout} labelAlign={labelAlign}
              label={index === 0 ? '应付项目' : ''}
            >
              <Input {...init(`${key}.${item.key}.cc`, {
                initValue: '',
              })} placeholder="请输入应付项目" />
            </FormItem>
          </Col>
          <Col>
            <FormItem {...formItemLayout} labelAlign={labelAlign}
              label={index === 0 ? '金额' : ''}
            >
              <NumberPicker
                precision={2}
                style={{ width: '100%' }}
                innerAfter="元"
                min={0}
                format={intlize}
                placeholder="请输入金额"
                {...init(`${key}.${item.key}.dd`, {
                  initValue: 0,
                  rules: [{ pattern: numberReg, message: '只能填数字' }],
                })}
              />
              <span style={{ color: 'red' }}>{getError(`dd_${index}`)}</span>
            </FormItem>
          </Col>
          <Col>
            <div className={`row-operation ${index === 0 ? 'active' : ''}`}>
              <Button type='secondary' className='row-button' onClick={() => this.addRow(key, index)}>+</Button>
              {
                index !== 0 ? <Button type='secondary' className='row-button' style={{ marginLeft: '10px' }} onClick={() => this.delete(key, index)}>-</Button> : null
              }
            </div>
          </Col>
        </Row>
      )
    })
  }
  renderForm = () => {
    const { params } = this.state
    let form = []
    let item = {}
    for (let key in params) {
      switch (key) {
        case 'eee':
          item = this.renderEEE(key)
          break
      }
      form.push(item)
    }
    return form
  }
  render() {
    return (
      <div>
        <Panel title='负债' describe={<span className='link'>{`负债合计: ${moneyFormat(10000000)}元`}</span>} handleClick={this.saveData}>
          <Form>
            {this.renderForm()}
          </Form>
        </Panel>
      </div>
    )
  }
}