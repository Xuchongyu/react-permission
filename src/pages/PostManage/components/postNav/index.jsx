// /*
//  * @Author: 徐崇玉
//  * @Date: 2019-08-25 23:00:44
//  * @LastEditors: 徐崇玉
//  * @LastEditTime: 2019-08-26 14:59:57
//  */
// import React, {
//   Component
// } from 'react';
// import {
//   Input,
//   Icon,
//   Dialog,
//   Switch
// } from '@alifd/next';
// import {
//   Form,
//   Field
// } from '@ice/form';

// import './index.scss'

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
// export default class PostNav extends Component {
//   constructor() {
//     super()
//     this.state = {
//       value: '',
//       postList: [{
//           key: 'post1',
//           post: '总经理',
//           count: 1,
//           type: 'show'
//         },
//         {
//           key: 'post2',
//           post: '副总经理',
//           count: 10,
//           type: 'show'
//         },
//         {
//           key: 'post3',
//           post: '行政专员',
//           count: 20,
//           type: 'show'
//         },
//         {
//           key: 'post4',
//           post: '人事专员',
//           count: 2,
//           type: 'show'
//         },
//       ],
//       visible: false,
//       choose: 0
//     }
//   }
//   onClick = () => {
//     console.log(this.state.value);
//   };
//   onChange = (value) => {
//     this.setState({
//       value
//     })
//   }
//   deletePost = (indexOf) => {
//     const {
//       postList
//     } = this.state
//     this.setState({
//       postList: postList.filter((item, index) => index !== indexOf)
//     })
//   }
//   editItem = (index) => {
//     const {
//       postList
//     } = this.state
//     postList[index].type = 'edit'
//     this.setState({
//       postList
//     })
//   }
//   changePost = (value, e, index) => {
//     const {
//       postList
//     } = this.state
//     postList[index].post = value
//     this.setState({
//       postList
//     })
//   }
//   savePost = (index) => {
//     const {
//       postList
//     } = this.state
//     postList[index].type = 'show'
//     this.setState({
//       postList
//     })
//   }
//   lookAuth = (key, index) => {
//     const {
//       lookPermissions
//     } = this.props
//     lookPermissions && lookPermissions(key)
//     this.setState({
//       choose: index
//     })
//   }
//   addPost = () => {
//     this.setState({
//       visible: true
//     });
//   }
//   onClose = reason => {
//     console.log(reason);

//     this.setState({
//       visible: false
//     });
//   };
//   async onSubmit(values) {
//     await sleep(300)
//     window.alert(JSON.stringify(values, 0, 2))
//   }
//   onOk = (e) => {
//     this.handleSubmit(e);
//   };
//   render() {
//     const {
//       value,
//       postList,
//       choose
//     } = this.state
//     return ( <
//       div className = 'post-nav-wrapper' >
//       <
//       Input innerBefore = {
//         <
//         Icon type = "search"
//         style = {
//           {
//             margin: 4
//           }
//         }
//         onClick = {
//           this.onClick
//         }
//         />}
//         placeholder = "请输入关键词"
//         value = {
//           value
//         }
//         aria - label = "input with config of innerBefore"
//         onChange = {
//           this.onChange
//         }
//         style = {
//           {
//             width: '100%'
//           }
//         }
//         /> <
//         div className = 'post-nav-list' > {
//           postList.map((item, index) => {
//             if (item.type === 'edit') {
//               return ( <
//                 div className = 'post-item'
//                 key = {
//                   `post_${item.key}`
//                 } >
//                 <
//                 div className = 'post-edit' >
//                 <
//                 Input placeholder = "请输入"
//                 value = {
//                   item.post
//                 }
//                 maxLength = {
//                   10
//                 }
//                 onChange = {
//                   (value, e) => this.changePost(value, e, index)
//                 }
//                 style = {
//                   {
//                     width: '100%'
//                   }
//                 }
//                 /> < /
//                 div > <
//                 div className = 'post-operation-edit' >
//                 <
//                 Icon type = "email"
//                 size = 'xs'
//                 onClick = {
//                   () => this.savePost(index)
//                 }
//                 /> < /
//                 div > <
//                 /div>
//               )
//             }
//             return ( <
//               div className = {
//                 `post-item ${choose === index ? 'active' : ''}`
//               }
//               key = {
//                 `post_${item.key}`
//               } >
//               <
//               div className = 'post'
//               onClick = {
//                 () => this.lookAuth(item.key, index)
//               } > {
//                 `${item.post}${item.count === 1 ? '' : `（${item.count}）`}`
//               } < /div> <
//               div className = 'post-operation' >
//               <
//               Icon type = "close"
//               size = 'xs'
//               onClick = {
//                 () => this.deletePost(index)
//               }
//               />&nbsp;&nbsp; <
//               Icon type = "edit"
//               size = 'xs'
//               onClick = {
//                 () => this.editItem(index)
//               }
//               /> < /
//               div > <
//               /div>
//             )
//           })
//         } <
//         /div> <
//         div className = 'add-post'
//         onClick = {
//           this.addPost
//         } >
//         新增岗位 <
//         /div> <
//         Dialog
//         title = "新增岗位"
//         visible = {
//           this.state.visible
//         }
//         cancelProps = {
//           {
//             'aria-label': 'cancel'
//           }
//         }
//         okProps = {
//           {
//             'aria-label': 'ok'
//           }
//         }
//         onOk = {
//           this.onOk.bind(this)
//         }
//         onCancel = {
//           this.onClose.bind(this, 'cancelClick')
//         }
//         onClose = {
//           this.onClose
//         }
//         style = {
//           {
//             width: 600,
//           }
//         } >
//         <
//         Form
//         onSubmit = {
//           this.onSubmit
//         }
//         layout = {
//           {
//             labelCol: 4,
//             wrapperCol: 8
//           }
//         } > {
//           formCore => {
//             this.handleSubmit = formCore.submit.bind(formCore);
//             return ( <
//               div >
//               <
//               Field name = "name"
//               label = "名称："
//               labelalign = 'top'
//               component = {
//                 Input
//               }
//               placeholder = "请输入名字" / >
//               <
//               Field name = "age"
//               label = "年龄："
//               component = {
//                 Input
//               }
//               placeholder = "请输入年龄" / >
//               <
//               Field name = "desc"
//               label = "简介："
//               component = {
//                 Input.TextArea
//               }
//               placeholder = "请简单介绍一下自己的工作经历" / >
//               <
//               Field name = "open"
//               label = "是否打开："
//               component = {
//                 Switch
//               }
//               valueName = "checked"
//               value = {
//                 true
//               }
//               /> <
//               Field name = "openDesc"
//               label = "打开时的描述："
//               component = {
//                 Input
//               }
//               placeholder = "description when opening" / >
//               <
//               Field name = "closeDesc"
//               label = "关闭时的描述："
//               component = {
//                 Input
//               }
//               placeholder = "description when closing" / >
//               <
//               /div>
//             )
//           }
//         } <
//         /Form> < /
//         Dialog > <
//         /div>
//       )
//     }
//   }
