/**
 * 定义应用路由
 */
import { HashRouter, Switch, Route } from 'react-router-dom'
import React from 'react'

import UserLayout from './layouts/UserLayout'
import BasicLayout from './layouts/BasicLayout'
// 引入判断权限的组件
import PermissionComponent from './permission-component/permissioncomponent'
// 按照 Layout 分组路由
// UserLayout 对应的路由：/user/xxx
// BasicLayout 对应的路由：/xxx
export default class ReactRouter extends React.Component {
  constructor() {
    super()
    this.state = {
      rootReactRouter: [
        {
          name: 'userLayout',
          path: '/user',
          pageComponent: UserLayout,
          permission: 'userLayout'
        },
        {
          name: 'basicLayout',
          path: '/',
          pageComponent: BasicLayout,
          permission: 'basicLayout'
        }
      ]
    }
  }
  render() {
    return (
      <HashRouter>
        <Switch>
          {this.state.rootReactRouter.map((item, index) => {
            return (
              <PermissionComponent
                path={item.path}
                page={item.pageComponent}
                permission={item.permission}
                name={item.name}
                key={index}
              />
            )
          })}
        </Switch>
      </HashRouter>
    )
  }
}
