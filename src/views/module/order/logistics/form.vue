<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('order.logistics.from') }}</div>
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
          <el-form-item :label="$t('order.logistics.type')" prop="type">
            <el-select v-model="dataForm.type"  :placeholder="$t('common.please_select')+$t('order.logistics.type')">
              <el-option v-for="(v,k) in typeList" :label="v.title" :key="k" :value="v.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('order.logistics.logistics_status')" prop="logistics_status">
            <el-select v-model="dataForm.logistics_status"  :placeholder="$t('common.please_select')+$t('order.logistics.logistics_status')">
              <el-option v-for="(v,k) in statusList" :label="v.title" :key="k" :value="v.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('order.logistics.logistics_name')" prop="logistics_name">
            <el-input :placeholder="$t('order.logistics.logistics_name')" v-model="dataForm.logistics_name"></el-input>
          </el-form-item>

          <el-form-item :label="$t('order.logistics.logistics_no')" prop="logistics_no">
            <el-input :placeholder="$t('order.logistics.logistics_no')" v-model="dataForm.logistics_no"></el-input>
          </el-form-item>

          <el-form-item :label="$t('order.logistics.logistics_time')" prop="logistics_time">
            <el-date-picker v-model="dataForm.logistics_time" type="datetime" :placeholder="$t('order.logistics.logistics_time')"></el-date-picker>
          </el-form-item>

          <el-form-item :label="$t('order.logistics.address')" prop="address">
            <el-input :placeholder="$t('order.logistics.address')" v-model="dataForm.address"></el-input>
          </el-form-item>

          <el-form-item :label="$t('order.logistics.content')" prop="content">
            <el-input type="textarea" :placeholder="$t('order.logistics.content')" v-model="dataForm.content"></el-input>
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
        model: 'order/logistics',
        typeList: [],
        statusList: [
          {'id': 1, 'title': '已发出'},
          {'id': 2, 'title': '待收货'},
          {'id': 3, 'title': '已签收'},
        ],
        dataForm:
        {
          order_id: 0,
          type: '',
          logistics_status: '',
          logistics_name: '',
          logistics_no: '',
          logistics_time: '',
          address: '',
          content: '',
        },
        dataRule:
        {
          type: [
            { required: true, message: this.$t('order.logistics.rules.type.require'), trigger: 'blur' },
          ],
          logistics_status: [
            { required: true, message: this.$t('order.logistics.rules.logistics_status.require'), trigger: 'blur' },
          ],
          logistics_name: [
            { required: true, message: this.$t('order.logistics.rules.logistics_name.require'), trigger: 'blur' },
          ],
          logistics_no: [
            { required: true, message: this.$t('order.logistics.rules.logistics_no.require'), trigger: 'blur' },
          ]
        }
      };
    },
    methods:
    {
      init ()
      {
        let id = this.$route.query.order_id

        this.dataForm.order_id = id || 0
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.order_id) {
            this.$http({
              url: this.$http.adornUrl(`/order/logistics/view/${this.dataForm.order_id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.order_id         = data.data.order_id
                this.dataForm.type             = data.data.type
                this.dataForm.logistics_status = data.data.logistics_status
                this.dataForm.logistics_name   = data.data.logistics_name
                this.dataForm.logistics_no     = data.data.logistics_no
                this.dataForm.logistics_time   = data.data.logistics_time
                this.dataForm.address          = data.data.address
                this.dataForm.content          = data.data.content
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
              url: this.$http.adornUrl(`/order/logistics/handle`),
              method: 'post',
              data: this.$http.adornData({
                'order_id': this.dataForm.order_id,
                'type': this.dataForm.type,
                'logistics_status': this.dataForm.logistics_status,
                'logistics_name': this.dataForm.logistics_name,
                'logistics_no': this.dataForm.logistics_no,
                'logistics_time': this.dataForm.logistics_time,
                'address': this.dataForm.address,
                'content': this.dataForm.content,
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
      loadTypeList () {
        this.$http({
          url: this.$http.adornUrl('/common/logistics/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.typeList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
    },
    created(request)
    {
      this.init();

      this.loadTypeList();
    }
  };
</script>
