/*
 * @Author: 徐崇玉
 * @Date: 2019-08-20 12:04:44
 * @LastEditors: 徐崇玉
 * @LastEditTime: 2019-08-26 15:08:54
 */
import React from 'react'
import {
  Route
  // Redirect
} from 'react-router-dom'
export default class PermissionComponnt extends React.Component {
  render() {
    const { page, ...pageInfo } = this.props
    // 登录页面不需要做权限验证
    if (pageInfo.permission === null) {
      return <Route component={page} />
    } else {
      // 针对那些需要验证的页面
      if (
        pageInfo.permission &&
        pageInfo.permissionArr.includes(pageInfo.permission)
      ) {
        return <Route component={page} />
      } else {
        // 针对没有权限的页面 如果用户在浏览器路径中输入路径
        console.log(document.referrer)
        return <div> 抱歉， 您无权访问 </div>
      }
    }
    // return <div className="perimission-component">perimission-component</div>
  }
}
