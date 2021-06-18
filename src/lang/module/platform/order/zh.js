export const order = {
  list: '订单列表',
  view: '查看订单',

  basic_info: '订单信息',
  address_info: '收货信息',
  logistics_info: '物流信息',
  logistics_create: '物流',
  other_info: '其他信息',

  pay_finish: '确认支付',
  take_finish: '确认提货',
  cancel: '撤销',


  order_no: '订单号',
  nickname: '购买用户',
  username: '购买账号',
  delivery_date: '提货日期',
  delivery_quantity: '交付数量',
  pay_money: '价格(万元)',
  order_status: '订单状态',
  create_time: '下单时间',

  logistics: {
    from: '物流操作',
    info: '物流信息',

    type: '物流类型',
    logistics_status: '物流状态',
    logistics_name: '物流名称',
    logistics_no: '物流单号',
    logistics_time: '变更时间',
    address: '到达地点',
    content: '详情',

    rules: {
      type: {
        require: '物流类型不能为空',
      },
      logistics_status: {
        require: '物流状态不能为空',
      },
      logistics_name: {
        require: '物流名称不能为空',
      },
      logistics_no: {
        require: '物流编号不能为空',
      },
    },
  }
}
