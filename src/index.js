/*
 * @Author: 徐崇玉
 * @Date: 2019-08-20 11:48:56
 * @LastEditors: 徐崇玉
 * @LastEditTime: 2019-08-20 12:51:36
 */
import React from 'react'
import ReactDOM from 'react-dom'
// 载入默认全局样式 normalize
import '@alifd/next/reset.scss'
import ReactRouter from './router.jsx'
import './index.scss'
const ICE_CONTAINER = document.getElementById('ice-container')

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.')
}

ReactDOM.render(<ReactRouter />, ICE_CONTAINER)
