export const merchant = {
  list: '车商列表',
  from: '车商操作',
  info: '车商信息',
  view: '车商详情',

  member_no: '车商ID',
  avatar: '车商头像',
  username: '登录账户',
  mobile: '手机',
  email: '邮箱',
  nickname: '车商昵称',


  people: '个人认证',
  bank_card: '银行卡认证',
  company: '车商认证',

  certification_type: '认证类型',
  audit_status: '审核状态',
  audit_pass: '审核通过',
  audit_unpass: '审核不通过',

  status: '账号状态',
  last_login_time: '最后登录时间',
  create_time: '注册时间',

  enable: '解禁',
  disable: '禁用',


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

  certification: {
    people_realname: '姓名',
    card_realname: '银行卡户名',
    company_realname: '法人姓名',
    mobile: '手机号',
    card_mobile: '银行预留手机号',
    certificate_type: '证件类型',
    people_certificate_no: '身份证号',
    card_certificate_no: '持卡人身份证号',
    company_certificate_no: '证件号码',
    bank_card_no: '银行卡号',
    picture: '证件照片',

    audit_status: '审核状态',
    audit_content: '审核意见',
  }
}
