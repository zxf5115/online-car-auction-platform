export const member = {
  list: '消费者列表',
  from: '消费者操作',
  info: '消费者信息',
  view: '消费者详情',
  delete: '删除消费者',
  export: '导出消费者',
  archive_info: '消费者档案',
  view_order: '查看订单',
  course_production: '课程作品',
  upload_finish: '已上传',
  upload_wait: '未上传',
  inviter: '邀请人',

  user_info: '基本信息',
  bank_info: '银行卡信息',
  personal_info: '个人信息',

  member_no: '消费者ID',
  avatar: '消费者头像',
  username: '登录账户',
  mobile: '手机',
  email: '邮箱',
  nickname: '消费者昵称',

  address_info: '收货地址',
  wallet: '钱包',

  attention: '关注',
  fans: '粉丝',
  praise: '获赞',

  status: '账号状态',
  last_login_time: '最后登录时间',
  create_time: '注册时间',

  enable: '解禁',
  disable: '禁用',

  role: {
    list: '身份列表',
    from: '身份操作',
    title: '身份名称',
    content: '身份描述',
    distribution: '分配身份',

    menu: '菜单权限',
    interface: '接口权限',

    rules: {
      title: {
        require: '身份名称不能为空',
        length: '长度在 1 到 50 个字符',
      },
    },
  },

  password: {
    from: '密码修改',

    old_password: '当前密码',
    password: '新密码',
    password_confirmation: '确认密码',
    please_old_password: '请输入当前登录密码',
    rules: {
      old_password: {
        require: '当前登录密码不能为空',
        length: '长度在 1 到 32 个字符',
      },
      password: {
        require: '新密码不能为空',
        length: '长度在 1 到 32 个字符',
      },
      password_confirmation: {
        require: '确认密码不能为空',
        length: '长度在 1 到 32 个字符',
      },
    }
  },

  archive: {
    list: '档案列表',
    from: '档案操作',
    view: '档案详情',
    info: '消费者档案',

    sex: '消费者性别',
    age: '消费者年龄',
    weixin: '微信号',
    birthday: '消费者生日',
    city: '所在城市',
    area: '地区',
    address: '详细地址',

    account: '银行卡户名',
    bank_card_no: '银行卡号',
    id_card_no: '持卡人身份证号',
    mobile: '银行预留手机号',
    realname: '姓名',
    certificate_no: '证件号',
    phone: '手机号',

    rules: {
      member_id: {
        require: '消费者昵称不能为空',
      },
      realname: {
        require: '真实姓名不能为空',
      },
      id_card_no: {
        require: '身份证号不能为空',
      },
    },
  },


  address: {
    list: '收货地址列表',
    from: '收货地址操作',
    view: '收货地址详情',

    name: '收货人姓名',
    mobile: '联系电话',
    postcode: '邮政编号',
    province: '省',
    city: '市',
    county: '县',
    address: '收货地址',
  },

  asset: {
    cash_money: '现金金额',
    credit_money: '信用余额',
  }
}
