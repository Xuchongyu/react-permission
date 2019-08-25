// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    key: 'index',
    name: '首页',
    path: '/',
    icon: 'home'
  },
  {
    key: 'feedback',
    name: '反馈',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message'
  },
  {
    key: 'help',
    name: '帮助',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu'
  }
]

const newAsideMenuConfig = [
  {
    key: 'other',
    name: 'XXX的报表',
    path: '/other',
    icon: 'person',
    children: [
      { name: '管理台', path: '/other/company', key: 'other_company' },
      { name: '审批管理', path: '/other/approval', key: 'other_approval' }
    ]
  }
]

const asideMenuConfig = [
  {
    key: 'daily',
    name: '日常管理',
    path: '/daily',
    icon: 'person',
    children: [
      {
        name: '控制台',
        path: '/daily/console',
        key: 'daily_console',
        page: [
          {
            name: '待办列表',
            path: '/daily/console/insert',
            key: 'daily_console_insert'
          }
        ]
      },
      { name: '审批管理', path: '/daily/approval', key: 'daily_approval' },
      {
        name: '年检审批',
        path: '/daily/renewal',
        key: 'daily_renewal'
      }
    ]
  },
  {
    key: 'customer',
    name: '客户管理',
    path: '/customer',
    icon: 'person',
    children: [
      {
        name: '个人客户管理',
        path: '/customer/person',
        icon: 'refresh',
        key: 'customer_person'
      },
      {
        name: '公司客户管理',
        path: '/customer/company',
        icon: 'account',
        key: 'customer_company'
      },
      {
        name: '营销客户池',
        path: '/customer/pool',
        icon: 'account',
        key: 'customer_pool'
      },
      {
        name: '问题客户管理',
        path: '/customer/problem',
        icon: 'account',
        key: 'customer_problem'
      },
      {
        name: '客户移交管理',
        path: '/customer/transfer',
        icon: 'account',
        key: 'customer_transfer'
      }
    ]
  },
  {
    key: 'business',
    name: '业务管理',
    path: '/business',
    icon: 'person',
    children: [
      {
        name: '个人授信',
        path: '/business/person',
        icon: 'refresh',
        key: 'business_person'
      },
      {
        name: '借款产品管理',
        path: '/loan/manage',
        icon: 'account',
        key: 'loan_manage'
      }
    ]
  },
  {
    key: 'comprehensive',
    name: '综合查询',
    path: '/comprehensive',
    icon: 'person',
    children: [
      {
        name: '交易记录',
        path: '/comprehensive/trade',
        icon: 'refresh',
        key: 'comprehensive_trade'
      },
      {
        name: '出借业务查询',
        path: '/comprehensive/invest',
        icon: 'account',
        key: 'comprehensive_invest'
      },
      {
        name: '借款业务查询',
        path: '/comprehensive/loan',
        icon: 'account',
        key: 'comprehensive_loan'
      }
    ]
  },
  // {
  //   key: 'staff',
  //   name: '特殊业务管理',
  //   path: '/staff',
  //   icon: 'person',
  //   children: [
  //     { name: '担保信息变更记录', path: '/staff/manage', icon: 'refresh', key: 'staff_manage' },
  //     { name: '岗位管理', path: '/staff/station', icon: 'account', key: 'staff_station' },
  //     { name: '机构管理', path: '/staff/organ', icon: 'account', key: 'staff_organ' },
  //   ],
  // },
  {
    key: 'staff',
    name: '员工管理',
    path: '/staff',
    icon: 'person',
    children: [
      {
        name: '员工管理',
        path: '/staff/manage',
        icon: 'refresh',
        key: 'staff_manage'
      },
      {
        name: '岗位管理',
        path: '/staff/station',
        icon: 'account',
        key: 'staff_station'
      },
      {
        name: '机构管理',
        path: '/staff/organ',
        icon: 'account',
        key: 'staff_organ'
      }
    ]
  },
  {
    key: 'postloan',
    name: '贷后管理',
    path: '/postloan',
    icon: 'person',
    children: [
      {
        name: '逾期管理',
        path: '/postloan/overdue',
        icon: 'refresh',
        key: 'postloan_overdue'
      }
    ]
  }
]

export { headerMenuConfig, asideMenuConfig, newAsideMenuConfig }
