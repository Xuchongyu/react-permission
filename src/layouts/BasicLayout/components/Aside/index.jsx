/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import { Link, withRouter } from 'react-router-dom';
import FoundationSymbol from '@icedesign/foundation-symbol';
import Layout from '@icedesign/layout';
import { Nav } from '@alifd/next';
import React, { Component } from 'react';
import Logo from '../Logo';
import './index.scss';

@withRouter
export default class Aside extends Component {
  constructor(props) {
    super(props);
    const openKeys = this.getDefaultOpenKeys();
    this.state = {
      openKeys,
    };
    this.openKeysCache = openKeys;
  }

  /**
   * 当前展开的菜单项
   */
  onOpenChange = (openKeys) => {
    const { collapse, toogleIsCollapse } = this.props;
    this.setState({
      openKeys,
    }, () => collapse && toogleIsCollapse && toogleIsCollapse());
    this.openKeysCache = openKeys;
  };

  /**
   * 获取当前展开的菜单项
   */
  getDefaultOpenKeys = () => {
    const { location = {}, asideData } = this.props;
    const { pathname } = location;

    let openKeys = [];
    if (Array.isArray(asideData)) {
      asideData.forEach((item, index) => {
        if (pathname.startsWith(item.path)) {
          openKeys = [`${index}`];
        }
      });
    }
    return openKeys;
  };

  // 打开tab页面
  onMenuClick = (selectedKeys) => {
    console.log(99999, selectedKeys)
    const { itemCollapse } = this.props;
    itemCollapse && itemCollapse(selectedKeys[0]);
  }

  render() {
    const { location, collapse, activeKey, asideData } = this.props;
    const { pathname } = location;
    const path = pathname.split('/').length - 1 > 2 ? pathname.slice(0, pathname.lastIndexOf('/')) : pathname
    return (
      <Layout.Aside width="240" theme="light" className="custom-aside">
        <div className="aside-logo">
          <Logo />
        </div>
        <Nav
          iconOnly={collapse}
          hasArrow={!collapse}
          mode="inline"
          defaultSelectedKeys={activeKey ? [path] : []}
          selectedKeys={activeKey ? [path] : []}
          openKeys={collapse ? [] : this.state.openKeys}
          onOpen={this.onOpenChange}
          onSelect={this.onMenuClick}
          className="custom-menu"
          type="line"
        >
          {Array.isArray(asideData) &&
            asideData.length > 0 &&
            asideData.map((nav, index) => {
              if (nav.children && nav.children.length > 0) {
                return (
                  <Nav.SubNav
                    key={index}
                    label={
                      <span>
                        {nav.icon ? (
                          <FoundationSymbol
                            style={{ marginRight: '8px' }}
                            size="small"
                            type={nav.icon}
                          />
                        ) : null}
                        <span className="ice-menu-collapse-hide">
                          {nav.name}
                        </span>
                      </span>
                    }
                  >
                    {nav.children.map((item) => {
                      const linkProps = {};
                      if (item.newWindow) {
                        linkProps.href = item.path;
                        linkProps.target = '_blank';
                      } else if (item.external) {
                        linkProps.href = item.path;
                      } else {
                        linkProps.to = item.path;
                      }
                      return (
                        <Nav.Item key={item.path}>
                          <Link {...linkProps} style={{ paddingLeft: '6px' }}>{item.name}</Link>
                        </Nav.Item>
                      );
                    })}
                  </Nav.SubNav>
                );
              }
              const linkProps = {};
              if (nav.newWindow) {
                linkProps.href = nav.path;
                linkProps.target = '_blank';
              } else if (nav.external) {
                linkProps.href = nav.path;
              } else {
                linkProps.to = nav.path;
              }
              return (
                <Nav.Item key={nav.path}>
                  <Link {...linkProps}>
                    <span>
                      {nav.icon ? (
                        <FoundationSymbol
                          style={{ marginRight: '8px' }}
                          size="small"
                          type={nav.icon}
                        />
                      ) : null}
                      <span className="ice-menu-collapse-hide">{nav.name}</span>
                    </span>
                  </Link>
                </Nav.Item>
              );
            })}
        </Nav>
        {/* 侧边菜单项 end */}
      </Layout.Aside>
    );
  }
}
