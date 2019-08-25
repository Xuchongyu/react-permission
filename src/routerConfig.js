// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Home from './pages/Home';
import DepartmentManage from './pages/DepartmentManage';
import TeamManage from './pages/TeamManage';
import CostManage from './pages/CostManage';
import QualityManage from './pages/QualityManage';
import Setting from './pages/Setting';
import Management from './pages/Management';
import Approval from './pages/Approval';
import TowLever from './pages/Approval/components/towLever';
import TodoList from './pages/Management/components/todoList';
import Renewal from './pages/Renewal'; // 年检审批
import PostManage from './pages/PostManage';
import Staff from './pages/Staff'
import PersonalManagement from './pages/PersonalManagement';
import PersonCredit from './pages/PersonCredit';
import Organ from './pages/Organ';

const routerConfig = [
  // {
  //   path: '/user/login',
  //   component: UserLogin,
  // },
  // {
  //   path: '/user/register',
  //   component: UserRegister,
  // },
  // {
  //   path: '/manage/company',
  //   component: Home,
  // },
  // {
  //   path: '/manage/department',
  //   component: DepartmentManage,
  // },
  // {
  //   path: '/manage/team',
  //   component: TeamManage,
  // },
  // {
  //   path: '/special/cost',
  //   component: CostManage,
  // },
  // {
  //   path: '/special/cluster',
  //   component: QualityManage,
  // },
  // {
  //   path: '/account/setting',
  //   component: Setting,
  // },
  {
    exact: true,
    path: '/', // 默认控制台
    component: Management,
  },
  {
    path: '/user/login', // 登录
    component: UserLogin,
  },
  {
    path: '/daily/console', // 控制台
    component: Management,
  },
  {
    path: '/daily/console/insert', // 控制台-更多
    component: TodoList
  },
  {
    path: '/daily/approval', // 审批管理
    component: Approval,
  },
  {
    path: '/customer/person', // 个人客户管理
    component: PersonalManagement,
  },
  {
    path: '/customer/company', // 公司客户管理
  },
  {
    path: '/customer/pool', // 营销客户池
  },
  {
    path: '/customer/problem', // 问题客户管理
  },
  {
    path: '/customer/transfer', // 客户移交管理
  },
  {
    path: '/comprehensive/trade', // 交易记录
  },
  {
    path: '/comprehensive/invest', // 出借业务查询
  },
  {
    path: '/comprehensive/loan', // 借款业务查询
  },
  {
    path: '/staff/manage', // 员工管理
    component: Staff
  },
  {
    path: '/staff/station', // 岗位管理
    component: PostManage
  },
  {
    path: '/staff/organ', // 机构管理
    component: Organ
  },
  {
    path: '/postloan/overdue', // 逾期管理
  },
  {
    path: '/daily/renewal',
    component: Renewal,
  },
  {
    path: '/business/person',
    component: PersonCredit,
  },
  {
    path: '/loan/manage',
    // component: Renewal,
  }
  // {
  //   path: '/daily/approval/towLever',
  //   component: TowLever,
  // },
  // {
  //   path: '/other/company',
  //   component: Management,
  // },
];

export default routerConfig;
