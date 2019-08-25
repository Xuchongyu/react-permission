import React, { Component } from 'react';
import { Dialog } from '@alifd/next';

export default class ImgEnclosure extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      imgBigSrc: ''
    }
  }
  render(){
    const { imgList } = this.props;
    const { imgBigSrc } = this.state;
    const imgDom = (v) => {
      return <img src={v.url} style={{ 
        width: '60px', height: '60px', margin: '0 6px', border: '1px dotted red', padding: '6px' }} onClick={() =>this.handelImgClick(v)} />
    }
    return (
      <div style={{
        display: 'flex'
      }}>
        <div style={{
          width: '146px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}>
          {
            imgList && imgList.map((v) => {
              return imgDom(v);
            })
          }
        </div>
        <div style={{
          width: '60px',
          height: '60px',
          border: '1px dotted red', padding: '6px',
          margin: '0 6px'
        }}
          onClick={this.ImgEnclosureDialog}
        >...</div>
        <Dialog
          title="附件"
          visible={this.state.visible}
          onOk={this.onClose.bind(this, 'okClick')}
          onCancel={this.onClose.bind(this, 'cancelClick')}
          onClose={this.onClose}>
          <p>
            {
              imgList && imgList.map((v) => {
                return imgDom(v);
              })
            }
          </p>
          <img style={{width: '850px', height: '400px'}} src={imgBigSrc} alt=""/>
        </Dialog>
      </div>
    )
  }
  // 附件弹框
  ImgEnclosureDialog = () => {
    this.setState({visible: true})
  }
  onClose = () => {
    this.setState({visible: false})
  }
  handelImgClick = (v) => {
    console.log(v, '9999a9q9q9')
    this.setState({imgBigSrc: v.bigImg})
  }
}