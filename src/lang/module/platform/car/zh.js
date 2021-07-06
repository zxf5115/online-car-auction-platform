export const car = {
  list: '汽车列表',
  from: '汽车审核',
  view: '汽车详情',
  user_info: '用户信息',
  car_info: '车源信息',
  browse_info: '浏览信息',

  title: '汽车标题',
  car_shape_info: '车型信息',
  car_video: '车辆视频',
  car_image: '车辆图片',
  car_money: '售车费用',

  car_brand: '车辆品牌',
  car_type: '车辆类型',
  car_shape: '具体型号',
  car_color: '车辆颜色',

  sell_money: '出售价格(万元)',
  other_money: '其他费用(万元)',
  browse_total: '用户浏览',
  inventory_total: '库存数量',
  collection_total: '收藏数量',
  sell_status: '出售进度',
  audit_status: '审核状态',
  audit_content: '审核内容',
  create_time: '发布时间',


  recommend: '推荐',
  ordinary: '普通',

  // 来源
  source: {
    list: '来源列表',
    from: '来源操作',
    view: '来源详情',

    title: '来源标题',

    rules: {
      title: {
        require: '来源标题不能为空',
      },
    },
  },

  // 品牌
  brand: {
    list: '品牌列表',
    from: '品牌操作',
    view: '品牌详情',

    title: '品牌标题',
    picture: '品牌图片',
    is_hot: '热门品牌',

    yes: '热门',
    no: '普通',

    rules: {
      title: {
        require: '品牌标题不能为空',
      },
      picture: {
        require: '品牌图片不能为空',
      },
    },
  },

  // 车型
  shape: {
    list: '车型列表',
    from: '车型操作',
    view: '车型详情',


    title: '车型标题',

    rules: {
      brand_id: {
        require: '汽车品牌不能为空',
      },
      title: {
        require: '车型标题不能为空',
      },
    },

    config: {
      from: '车型配置',

      title: '配置名称',
      type: '配置类型',
      params: '配置参数',
      pl_params: '配置参数，多个配置参数请使用英文逗号分隔',
      is_must: '是否必填',

      add: '添加',
      delete: '删除',

      rules: {
        type: {
          require: '配置类型不能为空',
        },
        title: {
          require: '配置名称不能为空',
        },
        params: {
          require: '配置参数不能为空',
        },
      },
    }
  },

  store: {
    list: '门店列表',
    from: '门店操作',
    view: '门店详情',

    title: '门店标题',
    mobile: '门店电话',
    address: '门店地址',
    longitude: '门店经度',
    latitude: '门店纬度',

    rules: {
      title: {
        require: '门店标题不能为空',
      },
      mobile: {
        require: '门店电话不能为空',
      },
      address: {
        require: '门店地址不能为空',
      },
    },
  }
}
