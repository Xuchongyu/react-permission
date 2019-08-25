import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Layout from '@icedesign/layout';
import Header from './components/Header';
import Aside from './components/Aside';
import Footer from './components/Footer';
import { Tab, Dropdown, Menu, Message } from '@alifd/next';
import { asideMenuConfig, newAsideMenuConfig } from '../../menuConfig';
import routerConfig from '../../routerConfig'
import real from '../../componentReal';
import NoPage from '../../pages/NoPage'

import FoundationSymbol from '@icedesign/foundation-symbol';
import './index.scss';

@withRouter
export default class BasicLayout extends Component {
  constructor() {
    super();
    this.state = {
      collapse: false,
      visible: false,
      activeKey: null,
      panes: [],
      asideData: [],
    };
  }
  componentDidMount() {
    this.getPageUrl(this.props.location.pathname);
  }
  toogleIsCollapse = () => {
    this.setState({ collapse: !this.state.collapse });
  }
  getPageUrl = (pathname) => {
    const { panes } = this.state;
    let path = pathname
    if (pathname === '/') {
      path = '/daily/console'
      this.props.history.replace('/daily/console');
    }
    // 判断是否显示另外的窗口
    const aside = path === '/other/company' ? newAsideMenuConfig : asideMenuConfig;
    console.log(aside, 'aside')
    let navId = ['001', '002']
    let arr = [];
    aside.forEach((v) => {
      arr.push(v.showId);
    })
    console.log(navId.includes(arr), 'arr')
    // 如果有打开的tab页，定位到相应的tab页面
    let aa = panes.filter(pane => pane.path === pathname);
    if (aa && aa.length) {
      this.setState({ activeKey: aa[0].key, asideData: aside })
      return
    }
    let bb = routerConfig.filter(item => item.path === pathname)
    console.log(bb, 'bbbb', routerConfig)
    if (bb && bb.length) {
      aside.forEach((item) => {
        this.screen(item.children, path, bb, aside)
      });
    } else {
      Message.show({
        type: 'notice',
        content: '404， 还没找到这个页面呢！',
        afterClose: () => console.log('Closed the toast')
      });
    }
  }
  screen = (data, path, bb, aside) => {
    const { panes } = this.state;
    console.log(bb,panes, 'bbbbb')
    let arr = ['日常管理'];
    let r = [];
    aside.forEach((v) => {
      r.push(v.name);
    })
    arr.includes(r);
    console.log(arr, 'arr', r);
    data.forEach(item => {
      if (item.path === path) {
        panes.push({ tab: item.name, key: item.key, path: bb[0].path, icon: item.icon || '', component: bb[0].component });
        this.setState({ panes, activeKey: item.key, asideData: aside }, () => {
        });
      } else if (item.page && item.page.length) {
        this.screen(item.page, path, bb, aside)
      }
    })
  }
  itemCollapse = (value) => {
    this.getPageUrl(value);
  }
  onChange = (activeKey) => {
    let result = this.state.panes.filter(item => item.key === activeKey)
    if (result && result.length) {
      this.getPageUrl(result[0].path);
      this.props.history.replace(result[0].path);
    }
  }
  onClose = (targetKey) => {
    this.remove(targetKey);
  }

  remove(targetKey) {
    let activeKey = this.state.activeKey;
    let panes = this.state.panes.filter(item => targetKey.split('_').length - 1 > 1 ? item.key !== targetKey : !(item.key.match(targetKey) || item.key === targetKey));
    if (targetKey === activeKey) {
      if (panes && panes.length) {
        activeKey = panes[panes.length - 1].key;
        this.props.history.push(panes[panes.length - 1].path);
      } else {
        activeKey = '';
      }
      activeKey = panes && panes.length ? panes[panes.length - 1].key : '';
    }
    this.setState({ panes, activeKey });
  }
  changeItem = (type) => {
    if (type === 'other') {
      const panes = this.state.panes.filter(item => item.key === this.state.activeKey);
      this.setState({ panes });
    } else {
      this.setState({ panes: [], activeKey: '' });
    }
  }
  onVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };
  render() {
    const { collapse, activeKey, panes, visible, asideData } = this.state;
    console.log(asideData, 'asideDataasideDataasideData')
    const menu = (
      <Menu>
        <Menu.Item disabled={panes && panes.length === 1} onClick={() => this.changeItem('other')}>关闭其他标签</Menu.Item>
        <Menu.Item onClick={() => this.changeItem('all')}>关闭全部标签</Menu.Item>
      </Menu>
    );
    const extraContent = (
      <Dropdown trigger={<FoundationSymbol size="large" type={visible ? 'angle-up' : 'angle-down'} />} triggerType="click" onVisibleChange={this.onVisibleChange}>
        {menu}
      </Dropdown>
    );
    return (
      <Layout
        fixable
        style={{ minHeight: '100vh' }}
        className="ice-design-layout"
      >
        <Layout.Section>
          <Layout.Aside width={240}>
            {
              asideData && asideData.length ? <Aside asideData={asideData} activeKey={activeKey} collapse={collapse} toogleIsCollapse={this.toogleIsCollapse} itemCollapse={this.itemCollapse} /> : null
            }
          </Layout.Aside>

          <Layout>
            <Layout.Header>
              <Header toogleIsCollapse={this.toogleIsCollapse} />
            </Layout.Header>
            <Layout.Main>
              {panes && panes.length ?
                <Tab
                  shape="wrapped"
                  activeKey={activeKey}
                  onChange={this.onChange}
                  onClose={this.onClose}
                  className="custom-tab"
                  extra={extraContent}
                >
                  {panes.map((item) => {
                    return (
                      <Tab.Item title={item.tab} key={item.key} closeable>
                        <div className="main-container">
                          {/* <div style={{width: '100%', height: '100%', overflowY: 'auto'}}> */}
                          {/* 为了tab页面和导航栏对应，给出itemCollapse及时更新状态，参数包括需要打开的页面路由 */}
                          {item.component ? <item.component itemCollapse={this.itemCollapse} /> : <NoPage />}
                          {/* </div> */}
                        </div>
                      </Tab.Item>
                    );
                  })}
                </Tab>
                : null
              }
            </Layout.Main>
            {/* <Footer /> */}
          </Layout>
        </Layout.Section>
      </Layout>
    );
  }
}
