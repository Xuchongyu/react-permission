import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import PostNav from './components/postNav'
import Auth from './components/auth'

export default class PostManage extends Component {
  lookPermissions = (key) => {
    this.refs['authPanel'].refs['auth'].getAuth(key)
  }
  render() {
    return (
      <Layout style={{ height: 'calc(100vh - 130px)' }}>
        <Layout.Section style={{ height: '100%' }}>
          <Layout.Aside style={{
            width: 200,
          }} >
            <PostNav lookPermissions={this.lookPermissions} />
          </Layout.Aside>
          <Layout.Main style={{ height: 'calc(100vh - 130px)', background: '#fff', paddingLeft: '10px' }}>
            <Auth ref='authPanel'/>
          </Layout.Main>
        </Layout.Section>
      </Layout>
    )
  }
}