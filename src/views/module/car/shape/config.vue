<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('car.shape.config.from') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button icon="el-icon-back" @click="$router.go(-1)">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main">
        <el-form label-width="100px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <div v-for="(item, index) in dataForm.data" :key="index">
            <el-form-item :label="$t('car.shape.config.title')" prop="title">
              <el-input :placeholder="$t('car.shape.config.title')" v-model="item.title"></el-input>
            </el-form-item>

            <el-form-item :label="$t('car.shape.config.type')" prop="type">
              <el-select v-model="item.type"  :placeholder="$t('common.please_select')+$t('car.shape.config.type')">
                <el-option v-for="(v,k) in typeList" :label="v.title" :key="k" :value="v.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('car.shape.config.params')" prop="params">
              <el-input type="textarea" :placeholder="$t('car.shape.config.pl_params')" v-model="item.params"></el-input>
            </el-form-item>

            <el-form-item :label="$t('car.shape.config.is_must')" prop="is_must">
              <el-radio-group v-model="item.is_must">
                <el-radio :label="1">{{ $t('common.yes') }}</el-radio>
                <el-radio :label="0">{{ $t('common.no') }}</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-input type="hidden" v-model="item.id"></el-input>

            <el-form-item>
              <el-button type="danger" @click="removeOption(index)">
                {{ $t('car.shape.config.delete') }}
              </el-button>
            </el-form-item>

            <el-divider content-position="left">end</el-divider>
          </div>

          <el-form-item>
            <el-button v-if="isAuth('module:car:shape:handle')" type="primary" @click="dataFormSubmit()">
              {{ $t('common.confirm') }}
            </el-button>

            <el-button type="success" @click="addOption()">
              {{ $t('car.shape.config.add') }}
            </el-button>

            <el-button @click="resetForm()">
              {{ $t('common.reset') }}
            </el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  export default
  {
    extends: common,
    data()
    {
      return {
        model: 'car/shape',
        typeList: [
          {'id': 1, 'title': '单选'},
          {'id': 2, 'title': '多选'},
          {'id': 3, 'title': '时间'},
          {'id': 4, 'title': '金钱'},
          {'id': 5, 'title': '文本框'},
        ],
        dataForm:
        {
          shape_id: 0,
          data: [
            {
              id: 0,
              type: '',
              title: '',
              is_must: 0,
              params: '',
            },
          ]
        },
        dataRule: {
          type: [
            { required: true, message: this.$t('car.shape.config.rules.type.require'), trigger: 'blur' },
          ],
          title: [
            { required: true, message: this.$t('car.shape.config.rules.title.require'), trigger: 'blur' },
          ],
          params: [
            { required: true, message: this.$t('car.shape.config.rules.params.require'), trigger: 'blur' },
          ]
        }
      };
    },
    methods:
    {
      init ()
      {
        let shape_id = this.$route.query.shape_id

        this.dataForm.shape_id = shape_id || 0
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.shape_id) {
            this.$http({
              url: this.$http.adornUrl(`/car/shape/config/data`),
              method: 'get',
              params: this.$http.adornParams({
                shape_id: this.dataForm.shape_id
              })
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.data = data.data
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/car/shape/config/handle`),
              method: 'post',
              data: this.$http.adornData({
                'shape_id': this.dataForm.shape_id,
                'data': this.dataForm.data,
              })
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.$message.success(this.$t('common.handle_success'));
                this.$router.go(-1);
              } else {
                this.$message.error(this.$t(data.message))
              }
            })
          }
        })
      },
      resetForm:function()
      {
        this.$refs['dataForm'].resetFields();
      },
      //新增购房人基本信息
      addOption() {
        const that = this;
        that.dataForm.data.push({});
      },
      //删除购房人基本信息
      removeOption(index) {console.log(index);
        if (index >= 0) {
          this.dataForm.data.splice(index, 1);
        }
      },
    },
    created(request)
    {
      this.init();
    }
  };
</script>
