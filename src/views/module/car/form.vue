<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('car.from') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button icon="el-icon-back" @click="$router.go(-1)">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main color">
        <el-form label-width="100px" ref="dataForm" :model="dataForm" :rules="dataRule">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('car.user_info') }}</span>
            </div>
            <div class="text item">
              <div v-if="dataForm.user.certification_type == 1">
                <el-form-item :label="$t('merchant.certification.people_realname')" prop="realname">
                  <span v-if="dataForm.user">
                    {{ dataForm.user.realname }}
                  </span>
                </el-form-item>

                <el-form-item :label="$t('merchant.certification.mobile')" prop="mobile">
                  <span v-if="dataForm.user">
                    {{ dataForm.user.mobile }}
                  </span>
                </el-form-item>

                <el-form-item :label="$t('merchant.certification.people_certificate_no')" prop="certificate_no">
                  <span v-if="dataForm.user">
                    {{ dataForm.user.certificate_no }}
                  </span>
                </el-form-item>

              </div>
              <div v-else-if="dataForm.user.certification_type == 2">
                <el-form-item :label="$t('merchant.certification.card_realname')" prop="realname">
                  <span v-if="dataForm.user">
                    {{ dataForm.user.realname }}
                  </span>
                </el-form-item>

                <el-form-item :label="$t('merchant.certification.card_mobile')" prop="mobile">
                  <span v-if="dataForm.user">
                    {{ dataForm.user.mobile }}
                  </span>
                </el-form-item>

                <el-form-item :label="$t('merchant.certification.bank_card_no')" prop="bank_card_no">
                  <span v-if="dataForm.user">
                    {{ dataForm.user.bank_card_no }}
                  </span>
                </el-form-item>

                <el-form-item :label="$t('merchant.certification.card_certificate_no')" prop="certificate_no">
                  <span v-if="dataForm.user">
                    {{ dataForm.user.certificate_no }}
                  </span>
                </el-form-item>
              </div>
              <div v-else>
                <el-form-item :label="$t('merchant.certification.company_realname')" prop="realname">
                  <span v-if="dataForm.user">
                    {{ dataForm.user.realname }}
                  </span>
                </el-form-item>

                <el-form-item :label="$t('merchant.certification.mobile')" prop="mobile">
                  <span v-if="dataForm.user">
                    {{ dataForm.user.mobile }}
                  </span>
                </el-form-item>

                <el-form-item :label="$t('merchant.certification.company_certificate_no')">
                  <span v-if="dataForm.user">
                    {{ dataForm.user.certificate_no }}
                  </span>
                </el-form-item>

                <el-form-item :label="$t('merchant.certification.picture')">
                  <span v-if="dataForm.user">

                    <el-image style="width: 100px;" :src="dataForm.user.cerificate_front_picture" :preview-src-list="cerificate_front_picture">
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>

                    <el-image style="width: 100px;" :src="dataForm.user.cerificate_behind_picture" :preview-src-list="cerificate_behind_picture">
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                  </span>
                </el-form-item>
              </div>
            </div>
          </el-card>

          <el-card class="box-card mt10" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('car.car_info') }}</span>
            </div>
            <div class="text item">

              <el-divider content-position="left">
                {{ $t('car.car_brand') }}
              </el-divider>

              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('car.car_type')">
                    {{ dataForm.brand_title }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('car.car_shape')">
                    {{ dataForm.shape_title }}
                  </el-form-item>
                </el-col>
              </el-row>

              <el-divider content-position="left">
                {{ $t('car.car_shape_info') }}
              </el-divider>

              <el-row>
                <el-col :span="6" v-for="(item, index) in dataForm.config" :key="index">
                  <el-form-item :label="item.title">
                    {{ item.value }}
                  </el-form-item>
                </el-col>
              </el-row>

              <el-divider content-position="left">
                {{ $t('car.car_money') }}
              </el-divider>

              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('car.sell_money')">
                    <b class="red">
                      {{ dataForm.sell_money }}
                    </b>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('car.other_money')">
                    <b class="red">
                      {{ dataForm.other_money }}
                    </b>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-divider content-position="left">
                {{ $t('car.car_video') }}
              </el-divider>

              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('car.car_type')">
                    {{ dataForm.brand_title }}
                  </el-form-item>
                </el-col>
              </el-row>


              <el-divider content-position="left">
                {{ $t('car.car_image') }}
              </el-divider>

              <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="5" v-for="(item, index) in dataForm.image" :key="index">
                  <el-image style="width: 100px;" :src="item" :preview-src-list="dataForm.image">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </el-col>
              </el-row>
            </div>
          </el-card>

          <el-card class="box-card mt10" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('car.browse_info') }}</span>
            </div>
            <div class="text item">
              <el-form-item :label="$t('car.browse_total')">
                <b>
                  {{ dataForm.browse_total }}
                </b>
              </el-form-item>

              <el-form-item :label="$t('car.collection_total')">
                <b>
                  {{ dataForm.collection_total }}
                </b>
              </el-form-item>

              <el-form-item prop="sell_status" :label="$t('car.sell_status')">
                {{ dataForm.sell_status }}
              </el-form-item>

              <el-form-item :label="$t('car.create_time')">
                {{ dataForm.create_time }}
              </el-form-item>
            </div>
          </el-card>

          <div class="mt10">
            <el-form-item :label="$t('car.audit_status')" prop="audit_status">
              <el-switch v-model="dataForm.audit_status" active-value="1" :active-text="$t('merchant.audit_pass')" inactive-value="2" :inactive-text="$t('merchant.audit_unpass')">
              </el-switch>
            </el-form-item>

            <el-form-item :label="$t('car.audit_content')" prop="audit_content">
              <el-input type="textarea" v-model="dataForm.audit_content" :placeholder="$t('common.please_input')+$t('car.audit_content')"></el-input>
            </el-form-item>
          </div>

          <el-form-item class="mt10">
            <el-button v-if="isAuth('module:car:handle')" type="primary" @click="dataFormSubmit()">
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
        model: 'car',
        cerificate_front_picture: [],
        cerificate_behind_picture: [],
        dataForm:
        {
          brand_title: '',
          shape_title: '',
          sell_money: 0,
          other_money: 0,
          browse_total: 0,
          collection_total: 0,
          sell_status: '',
          audit_status: '',
          audit_content: '',
          create_time: '',
          config: {},
          video: '',
          image: {},
          user: {
            id: 0,
            realname: '',
            mobile: '',
            certificate_type: '',
            certificate_no: '',
            bank_card_no: '',
            cerificate_front_picture: '',
            cerificate_behind_picture: '',
            certification_type: '',
          },
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
              url: this.$http.adornUrl(`/car/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.brand_title      = data.data.brand.title || ''
                this.dataForm.shape_title      = data.data.shape.title || ''
                this.dataForm.sell_money       = data.data.sell_money
                this.dataForm.other_money      = data.data.other_money
                this.dataForm.browse_total     = data.data.browse_total
                this.dataForm.collection_total = data.data.collection_total
                this.dataForm.sell_status      = data.data.sell_status.text
                this.dataForm.audit_status     = data.data.audit_status.value + ''
                this.dataForm.audit_content    = data.data.audit_content
                this.dataForm.create_time      = data.data.create_time

                this.dataForm.video  = data.data.video
                this.dataForm.image  = data.data.image
                this.dataForm.config = data.data.config

                this.dataForm.user.certification_type           = data.data.member.certification.type.value
                this.dataForm.user.realname           = data.data.member.certification.realname
                this.dataForm.user.mobile             = data.data.member.certification.mobile
                this.dataForm.user.certificate_type   = data.data.member.certification.certificate_type.value
                this.dataForm.user.certificate_no     = data.data.member.certification.certificate_no
                this.dataForm.user.bank_card_no       = data.data.member.certification.bank_card_no
                this.dataForm.user.cerificate_behind_picture       = data.data.member.certification.cerificate_behind_picture
                this.dataForm.user.cerificate_front_picture       = data.data.member.certification.cerificate_front_picture
                this.dataForm.user.type = data.data.member.certification.type.value

                this.cerificate_front_picture.push(data.data.member.cerificate_front_picture);
                this.cerificate_behind_picture.push(data.data.member.cerificate_behind_picture);
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
              url: this.$http.adornUrl(`/car/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'audit_status': this.dataForm.audit_status,
                'audit_content': this.dataForm.audit_content,
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
    },
    created() {
      this.init();
    }
  };
</script>
