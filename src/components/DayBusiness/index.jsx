import React, { Component } from 'react';

let data = [
  {
    jiekuan: '借款',
    fangkuan: '放款',
    huankuan: '还款',
    chujie: '出借',
    huikuan: '回款',
    xianshang: '线上充值',
    xianxia: '线下充值',
    tixian: '提现',
    chongzhierror: '充值失败',
    tixiansuccess: '充值成功',
    shimingkaihu: '实名开户',
    jiebang: '解绑卡',
    zhuce: '注册',
    jiekuanlioubiao: '借款流标',
    chujieliubiao: '出借流标'
  }
]

export default class DayBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <div style={{display: 'flex', flexWrap: 'wrap', width: '770px'}}>
        {
          data.map((v, i) => {
            return (
              <React.Fragment key={i}>
                <div style={styles.divStyle}>
                  <div style={styles.box}>
                    <span>借款申请：</span>
                    <span href="javascript:;">{v.jiekuan}</span>
                  </div>
                </div>
                <div style={styles.divStyle}>
                  <div style={styles.box}>
                    <span>放款：</span>
                    <span href="javascript:;">{v.fangkuan}</span>
                  </div>
                </div>
                <div style={styles.divStyle}>
                  <div style={styles.box}>
                    <span>还款：</span>
                    <span href="javascript:;">{v.huankuan}</span>
                  </div>
                </div>
                <div style={styles.divStyle}>
                  <div style={styles.box}>
                    <span>出借：</span>
                    <span href="javascript:;">{v.chujie}</span>
                  </div>
                </div>
                <div style={styles.divStyle}>
                  <div style={styles.box}>
                    <span>回款：</span>
                    <span href="javascript:;">{v.huikuan}</span>
                  </div>
                </div>
                <div style={styles.divStyle}>
                  <div style={styles.box}>
                    <span>线上充值：</span>
                    <span href="javascript:;">{v.xianshang}</span>
                  </div>
                </div>
                <div style={styles.divStyle}>
                  <div style={styles.box}>
                    <span>线下充值：</span>
                    <span href="javascript:;">{v.xianxia}</span>
                  </div>
                </div>
                <div style={styles.divStyle}>
                  <div style={styles.box}>
                    <span>提现：</span>
                    <span href="javascript:;">{v.tixian}</span>
                  </div>
                </div>
                <div style={styles.divStyle}>
                  <div style={styles.box}>
                    <span>充值失败：</span>
                    <span href="javascript:;">{v.chongzhierror}</span>
                  </div>
                </div>
                <div style={styles.divStyle}>
                  <div style={styles.box}>
                    <span>提现成功：</span>
                    <span href="javascript:;">{v.tixiansuccess}</span>
                  </div>
                </div>
                <div style={styles.divStyle}>
                  <div style={styles.box}>
                    <span>实名开户：</span>
                    <span href="javascript:;">{v.shimingkaihu}</span>
                  </div>
                </div>
                <div style={styles.divStyle}>
                  <div style={styles.box}>
                    <span>解绑卡：</span>
                    <span href="javascript:;">{v.jiebang}</span>
                  </div>
                </div>
                <div style={styles.divStyle}>
                  <div style={styles.box}>
                    <span>注册：</span>
                    <span href="javascript:;">{v.zhuce}</span>
                  </div>
                </div>
                <div style={styles.divStyle}>
                  <div style={styles.box}>
                    <span>借款流标：</span>
                    <span href="javascript:;">{v.jiekuanlioubiao}</span>
                  </div>
                </div>
                <div style={styles.divStyle}>
                  <div style={styles.box}>
                    <span>出借流标：</span>
                    <span href="javascript:;">{v.chujieliubiao}</span>
                  </div>
                </div>
              </React.Fragment>
            )
          })
        }
      </div>
    )
  }
}

const styles = {
  divStyle: {
    width: '144px',
    minHeight: '32px',
    // backgroundColor: 'rgba(242, 242, 242,.8)',
    background: '#ccc',
    margin: '10px 5px'
  },
  box: {
    // display: 'flex',
    // alignItems: 'center',
    width: '134px',
    height: '100%',
    wordWrap: 'break-word',
    paddingLeft: '6px',
    paddingTop: '8px'
  }
}