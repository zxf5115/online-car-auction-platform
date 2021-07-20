<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('message.from') }}</div>
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

          <el-form-item :label="$t('message.title')" prop="title">
            <el-input :placeholder="$t('common.please_input')+$t('message.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('member_message.role_id')" prop="role_id">
            <el-radio-group v-model="dataForm.role_id">
              <el-radio-button label="0">全体</el-radio-button>
              <el-radio-button label="1">车商</el-radio-button>
              <el-radio-button label="2">消费者</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item class="mavon" prop="content" :label="$t('message.content')">
            <el-input type="textarea" :placeholder="$t('common.please_input')+$t('message.content')" v-model="dataForm.content"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('message:handle')" type="primary" @click="dataFormSubmit()">
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
  export default {
    extends: common,
    data() {
      return {
        model: 'message',
        dataForm:
        {
          id: 0,
          role_id: 0,
          title: '',
          content: '',
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('message.rules.title.require'), trigger: 'blur' },
            { min: 1, max: 100, message: this.$t('message.rules.title.length'), trigger: 'blur' }
          ],
          content: [
            { required: true, message: this.$t('message.rules.content.require'), trigger: 'blur' },
            { min: 1, max: 1000, message: this.$t('message.rules.content.require'), trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      init ()
      {
        let query = this.$route.query
        let id = query.id

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/message/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.role_id = data.data.role_id
                this.dataForm.title   = data.data.title
                this.dataForm.content = data.data.content
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
              url: this.$http.adornUrl(`/message/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'role_id': this.dataForm.role_id,
                'title': this.dataForm.title,
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
      }
    },
    created() {
      this.init();
    }
  };
</script>
<style>
  .mavon {
    width: 800px;
  }
  .v-note-op {
    padding: 0 !important;
  }
</style>
