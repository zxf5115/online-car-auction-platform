export const problem = {
  list: '购车指南列表',
  from: '购车指南操作',
  create: '添加购车指南',
  view: '查看购车指南',

  title: '购车指南标题',
  content: '购车指南答案',

  rules: {
    title: {
      require: '购车指南标题不能为空',
    },
    content: {
      require: '购车指南答案不能为空',
    }
  },



  // 购车指南分类
  category: {
    list: '购车指南分类列表',
    from: '购车指南分类操作',
    title: '购车指南分类标题',

    rules: {
      title: {
        require: '购车指南分类标题不能为空',
      }
    },
  },
}
