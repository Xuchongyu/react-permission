/**
 * @Description: 文件上传组件
 * @author zhangsiyi@hzlianyin.com
 * @date 2019-04-24 10:21
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Button, Icon } from '@alifd/next'
import { upload, getUrl, download, getFile } from '../../utils/ossUtils'

class FileUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: [],
      canUpload: true,
      visible: false,
      valueUidArray: {}
    }
  }

  static defaultProps = {
    defaultValue: [],
    multiple: false,
    disabled: false
  }

  static propTypes = {
    defaultValue: PropTypes.array,
    multiple: PropTypes.bool,
    getValue: PropTypes.func
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if (defaultValue && defaultValue.length > 0) {
      this.handleInData(defaultValue)
    }
  }

  getValue = () => {
    const { value } = this.state
    const { getValue } = this.props
    const targetValue = value
      .map(item => {
        return item.targetUrl
      })
      .filter(item => item)
    getValue && getValue(targetValue)
  }

  handleInData = async defaultValue => {
    let value = []
    for (let item of defaultValue) {
      let targetUrl = typeof item === 'object' ? item.url : item
      const url = await getUrl(targetUrl)
      const file = await getFile(targetUrl)
      value.push({
        url,
        size: file ? file.res.size : null,
        imgURL: url,
        downloadURL: url,
        targetUrl: targetUrl,
        state: 'done',
        name: targetUrl,
        uid:
          Math.random()
            .toString(36)
            .substr(2) + new Date().getTime()
      })
    }
    this.setState(
      {
        value
      },
      () => {
        this.getValue()
      }
    )
  }

  onChange = currentValue => {
    const { value, canUpload, valueUidArray } = this.state
    const { submitTip } = this.props
    if (!canUpload) return
    if (!currentValue || currentValue.length === 0) {
      this.setState(
        {
          value: []
        },
        () => {
          this.getValue()
        }
      )
      return
    }
    if (currentValue.length < value.length) {
      this.setState(
        {
          value: currentValue
        },
        () => {
          this.getValue()
        }
      )
      return
    }
    submitTip && submitTip(false)
    const file = currentValue[currentValue.length - 1].originFileObj
    const uid = currentValue[currentValue.length - 1].uid
    upload({
      name: file.name,
      file: file,
      callback: async file => {
        for (let item of currentValue) {
          if (item.uid === uid) {
            const url = await getUrl(file.name)
            item.url = url
            item.imgURL = url
            item.downloadURL = url
            item.targetUrl = file.name
            item.state = 'done'
          }
          let current = currentValue.filter(item => !valueUidArray[item.uid])
          this.setState(
            {
              value: current
            },
            () => {
              this.getValue()
            }
          )
        }
        submitTip && submitTip(true)
      },
      progress: percent => {
        for (let item of currentValue) {
          if (item.uid === uid) {
            item.state = 'uploading'
            item.percent = percent * 100
          }
          let current = currentValue.filter(item => !valueUidArray[item.uid])
          this.setState({
            value: current
          })
        }
      }
    })
  }

  extraRender = file => {
    const name = file.targetUrl
    return (
      <Button
        onClick={e => {
          e.preventDefault()
          download(name)
        }}
        style={{ margin: '0 10px', lineHeight: '24px' }}
        type="primary"
        size="small"
        iconSize="xs"
      >
        <Icon
          style={{
            position: 'static',
            top: '0px',
            right: '0px',
            lineHeight: '24px',
            color: '#fff'
          }}
          type="download"
        />
        下载
      </Button>
    )
  }

  onCancel = info => {
    const { submitTip } = this.props
    const { valueUidArray } = this.state
    valueUidArray[info.uid] = info.uid
    submitTip && submitTip(true)
    this.setState({ valueUidArray })
  }

  render() {
    const { disabled, multiple } = this.props
    const { value } = this.state
    return (
      <div className="upload-wrap file-upload">
        <Upload
          listType="text"
          autoUpload={false}
          value={value}
          limit={!multiple ? 1 : Infinity}
          onChange={this.onChange}
          disabled={disabled}
          extraRender={this.extraRender}
          onCancel={this.onCancel}
        >
          <Button type="primary" style={{ margin: '0 0 10px' }}>
            <Icon type="upload" />
            文件上传
          </Button>
        </Upload>
      </div>
    )
  }
}

export default FileUpload
