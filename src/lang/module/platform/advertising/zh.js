export const advertising = {
  list: '广告列表',
  from: '广告操作',

  create: '添加广告',
  view: '查看广告',

  title: '广告标题',
  content: '广告内容',
  picture: '广告图片',
  enable: '上架',
  disable: '下架',

  rules: {
    position_id: {
      require: '广告位标题不能为空',
    },
    title: {
      require: '广告标题不能为空',
    },
    picture: {
      require: '广告图片不能为空',
    },
  },

  // 广告位
  position: {
    list: '广告位列表',
    from: '广告位操作',
    title: '广告位标题',
    width: '广告位宽度',
    height: '广告位高度',
    is_open: '是否开启',

    rules: {
      title: {
        require: '广告位标题不能为空',
      },
      width: {
        require: '广告位宽度不能为空',
      },
      height: {
        require: '广告位高度不能为空',
      },
    },
  },
}
