<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('car.shape.from') }}</div>
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
          <el-form-item :label="$t('car.brand.title')" prop="brand_id">
            <el-select v-model="dataForm.brand_id"  :placeholder="$t('common.please_select')+$t('car.brand.title')" @change="loadUnitList">
              <el-option v-for="(v,k) in brandList" :label="v.title" :key="k" :value="v.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('car.shape.title')" prop="title">
            <el-input :placeholder="$t('car.shape.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('common.sort')" prop="sort">
            <el-input-number :placeholder="$t('common.please_input')+$t('common.sort')" v-model="dataForm.sort"></el-input-number>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:car:shape:handle')" type="primary" @click="dataFormSubmit()">
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
        model: 'car/shape',
        brandList: [],
        dataForm:
        {
          id: 0,
          brand_id: '',
          title: '',
          sort: 0,
        },
        dataRule:
        {
          brand_id: [
            { required: true, message: this.$t('car.shape.rules.brand_id.require'), trigger: 'blur' },
          ],
          title: [
            { required: true, message: this.$t('car.shape.rules.title.require'), trigger: 'blur' },
          ]
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
              url: this.$http.adornUrl(`/car/shape/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.brand_id = data.data.brand_id
                this.dataForm.title    = data.data.title
                this.dataForm.sort     = data.data.sort
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
              url: this.$http.adornUrl(`/car/shape/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'brand_id': this.dataForm.brand_id,
                'title': this.dataForm.title,
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
      },
      loadBrandList () {
        this.$http({
          url: this.$http.adornUrl('/car/brand/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.brandList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
    },
    created(request)
    {
      this.init();

      this.loadBrandList();
    }
  };
</script>
