import React, { Copponent, Component } from 'react';

export default class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="info">
        <div className="info-box">
          <div className="info-header">
            <span>资产</span>
            <span>资产合计：10000元</span>
          </div>
          <div className="info-main">
            <dl>
              <dt>
                <span>现金及银行存款</span>
                <span>简要情况</span>
              </dt>
              <dd>
                <p>总金额</p>
                
              </dd>
            </dl>
          </div>
        </div>
      </div>
    )
  }
}