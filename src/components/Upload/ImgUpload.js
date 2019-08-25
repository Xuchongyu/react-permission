/**
 * @Description: 图片上传组件
 * @author zhangsiyi@hzlianyin.com
 * @date 2019-04-23 11:45
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Message } from '@alifd/next';
import { upload, getUrl, download } from '../../utils/ossUtils';
import { RViewer, RViewerTrigger } from 'react-viewerjs';

class ImgUpload extends React.Component {
  constructor(props) {
    super(props);
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
  };

  static propTypes = {
    defaultValue: PropTypes.array,
    multiple: PropTypes.bool,
    getValue: PropTypes.func
  };

  componentDidMount() {
    const { defaultValue, isExhibition } = this.props;
    if (defaultValue && defaultValue.length > 0) {
      this.handleInData(defaultValue);
    }
    if (isExhibition) {
      document.querySelector('.upload-img-item .next-upload-list-item').style.cssText = "display: none;"
    }
    window.addEventListener('click', (e) => {
      if (e.target.className === 'next-icon next-icon-download next-medium next-upload-tool-download-icon') {
        const currentNode = e.target;
        download(currentNode.parentNode.getAttribute('href'));
        e.preventDefault();
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if ((!prevProps.defaultValue || prevProps.defaultValue.length === 0) && this.props.defaultValue && this.props.defaultValue.length > 0) {
      this.handleInData(this.props.defaultValue);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', () => {

    });
  }

  handleInData = async (defaultValue) => {
    let value = [];
    for (let item of defaultValue) {
      const options = { expires: 3600, process: 'image/resize,m_fixed,w_600,h_600' };
      const { url: postUrl, ...rest } = item
      const url = await getUrl(typeof item === 'object' ? postUrl : item, options);
      value.push({
        ...rest,
        url,
        imgURL: url,
        downloadURL: typeof item === 'object' ? postUrl : item,
        targetUrl: typeof item === 'object' ? postUrl : item,
        state: 'done',
        name: typeof item === 'object' ? postUrl : item,
        uid: Math.random().toString(36).substr(2) + new Date().getTime(),
      })
    }
    this.setState({
      value
    }, () => {
      this.getValue();
    })
  };

  getValue = () => {
    const { value } = this.state;
    const { getValue } = this.props;
    const targetValue = value.map((item) => {
      return item
    }).filter((item) => item);
    getValue && getValue(targetValue);
  };

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  onChange = (currentValue) => {
    const { value, canUpload, valueUidArray } = this.state;
    const {submitTip} = this.props
    if (!canUpload) return;
    if (!currentValue || currentValue.length === 0) {
      this.setState({
        value: []
      }, () => {
        this.getValue();
      });
      return;
    }
    if (currentValue.length < value.length) {
      this.setState({
        value: currentValue
      }, () => {
        this.getValue();
      });
      return;
    }
    submitTip && submitTip(false)
    const file = currentValue[currentValue.length - 1].originFileObj;
    const uid = currentValue[currentValue.length - 1].uid;
    upload({
      name: file.name,
      file: file,
      callback: async (file) => {
        for (let item of currentValue) {
          if (item.uid === uid) {
            const options = { expires: 3600, process: 'image/resize,m_fixed,w_600,h_600' };
            const url = await getUrl(file.name, options);
            item.url = url;
            item.imgURL = url;
            item.downloadURL = file.name;
            item.targetUrl = file.name;
            item.state = 'done';
          }
        }
        let current = currentValue.filter(item => !valueUidArray[item.uid])
        submitTip && submitTip(true)
        this.setState({
          value: current
        }, () => {
          this.getValue();
        })
      },
      progress: (percent) => {
        for (let item of currentValue) {
          if (item.uid === uid) {
            item.state = 'uploading';
            item.percent = percent * 100;
          }
        }
        let current = currentValue.filter(item => !valueUidArray[item.uid])
        this.setState({
          value: current
        })
      }
    });
  };

  afterSelect = async () => {
    const { multiple } = this.props;
    const { value } = this.state;
    if (value.length >= 1 && !multiple) {
      Message.show({
        type: 'error',
        content: '请勿上传多个文件',
      });
      await this.setStateAsync({
        canUpload: false
      })
    }
  };

  onPreview = (value) => {
    this.btn.click();
    this.setState({
      visible: !this.state.visible,
      currentView: value.imgURL
    })
  };

  onClose = () => {
    this.setState({
      visible: false
    })
  };

  getSourceUrl = () => {
    const { value, currentView } = this.state;
    let sourceUrl = currentView ? [currentView] : [];
    for (let item of value) {
      sourceUrl.push(item.imgURL);
    }
    return sourceUrl;
  };
  onCancel = (info) => {
    const {submitTip} = this.props
    const { valueUidArray } = this.state
    valueUidArray[info.uid] = info.uid
    submitTip && submitTip(true)
    this.setState({ valueUidArray })
  }
  render() {
    const { multiple, disabled, limitCount } = this.props;
    const { value, visible } = this.state;
    const sourceUrl = visible ? this.getSourceUrl() : [];
    return (
      <div>
        <div className="upload-wrap img-upload">
          <div className='upload-img-item'>
            <Upload.Card
              listType="card"
              accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
              autoUpload={false}
              value={value}
              disabled={disabled}
              limit={limitCount || (!multiple ? 1 : Infinity)}
              onChange={this.onChange}
              afterSelect={this.afterSelect}
              onPreview={this.onPreview}
              onCancel={this.onCancel}
            />
          </div>
        </div>
        <RViewer imageUrls={Array.from(new Set(sourceUrl))} options={{ hide: this.onClose }}>
          <RViewerTrigger style={{ visibility: 'hidden' }}>
            <button ref={(e) => this.btn = e} style={{ visibility: 'hidden' }}>Multiple images preview</button>
          </RViewerTrigger>
        </RViewer>
      </div>
    )
  }
}

export default ImgUpload;
