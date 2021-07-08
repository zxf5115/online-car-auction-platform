<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('complain.view') }}</div>
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
        <el-form label-width="120px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <el-form-item :label="$t('member.nickname')">
            <span v-if="dataForm.member">
              {{ dataForm.member.nickname }}
            </span>
          </el-form-item>

          <el-form-item :label="$t('complain.category.title')">
            <span v-if="dataForm.category">
              {{ dataForm.category.title }}
            </span>
          </el-form-item>

          <el-form-item :label="$t('complain.content')">
            <div v-html="dataForm.content"></div>
          </el-form-item>

          <el-form-item :label="$t('complain.picture')">
            <span style="width:800px; display: block;" v-if="dataForm.resource">
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-col :span="6" v-for="(item, index) in dataForm.resource" :key="index">
                  <el-image style="width: 100px;height: auto;" :src="item.picture" :preview-src-list="[item.picture]">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </el-col>
              </el-row>
            </span>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:complain:read') && 0 == dataForm.read_status.value" type="primary" @click="readHandle(dataForm.id)">
              {{ $t('complain.read') }}
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
        model: 'complain',
        position: [],
        upload_headers:{},
        dataForm:
        {
          id: 0,
          read_status: 0,
        },
        dataRule: {}
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
              url: this.$http.adornUrl(`/complain/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm = data.data
              }
            })
          }
        })
      },
      readHandle (id) {

        let message = '您已经阅读当前投诉信息？'

        this.$confirm(message, this.$t('common.prompt'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/'+this.model+'/read'),
            method: 'post',
            data: {id: id}
          }).then(({data}) => {
            if (data && data.status === 200) {
              this.$router.go(-1)
            } else {
              this.$message.error(this.$t(data.message))
            }
          })
        }).catch(() => {})
      }
    },
    created() {
      this.init();
    }
  };
</script>
