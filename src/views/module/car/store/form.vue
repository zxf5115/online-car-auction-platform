<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('car.store.from') }}</div>
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
          <el-form-item :label="$t('car.store.title')" prop="title">
            <el-input :placeholder="$t('car.store.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('car.store.mobile')" prop="mobile">
            <el-input :placeholder="$t('car.store.mobile')" v-model="dataForm.mobile"></el-input>
          </el-form-item>

          <el-form-item :label="$t('car.store.address')" prop="address">
            <el-input type="textarea" :placeholder="$t('car.store.address')" v-model="dataForm.address"></el-input>
          </el-form-item>

          <el-form-item :label="$t('common.sort')" prop="sort">
            <el-input-number :placeholder="$t('common.please_input')+$t('common.sort')" v-model="dataForm.sort"></el-input-number>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:car:store:handle')" type="primary" @click="dataFormSubmit()">
              {{ $t('common.confirm') }}
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
        model: 'car/store',
        dataForm:
        {
          id: 0,
          title: '',
          mobile: '',
          address: '',
          sort: 0,
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('car.store.rules.title.require'), trigger: 'blur' },
          ],
          mobile: [
            { required: true, message: this.$t('car.store.rules.mobile.require'), trigger: 'blur' },
          ],
          address: [
            { required: true, message: this.$t('car.store.rules.address.require'), trigger: 'blur' },
          ],
        }
      };
    },
    methods:
    {
      init ()
      {
        let query = this.$route.query
        let id = query.id

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/car/store/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.title   = data.data.title
                this.dataForm.mobile  = data.data.mobile
                this.dataForm.address = data.data.address
                this.dataForm.sort    = data.data.sort
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {console.log(1);
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/car/store/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'title': this.dataForm.title,
                'mobile': this.dataForm.mobile,
                'address': this.dataForm.address,
                'sort': this.dataForm.sort,
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
      }
    },
    created(request)
    {
      this.init();
    }
  };
</script>
