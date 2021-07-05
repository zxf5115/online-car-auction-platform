<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('order.view') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div class="mr10">
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_order_list'})">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main color">
        <el-form label-width="120px" ref="dataForm" :model="dataForm">
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
                    <span v-if="dataForm.car">
                      {{ dataForm.car.brand_title }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('car.car_shape')">
                    <span v-if="dataForm.car">
                      {{ dataForm.car.shape_title }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-divider content-position="left">
                {{ $t('car.car_shape_info') }}
              </el-divider>

              <el-row>
                <el-col :span="6" v-if="dataForm.car" v-for="(item, index) in dataForm.car.config" :key="index">
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
                    <el-input-number :precision="2" :step="1" :placeholder="$t('car.sell_money')" v-model="dataForm.car.sell_money"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('car.other_money')">
                    <el-input-number :precision="2" :step="1" :placeholder="$t('car.other_money')" v-model="dataForm.car.other_money"></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-divider content-position="left">
                {{ $t('car.car_video') }}
              </el-divider>

              <el-row>
                <el-col :span="6">
                  <video-player  class="video-player vjs-custom-skin"
                   ref="videoPlayer"
                   :playsinline="true"
                   :options="playerOptions"></video-player>
                </el-col>
              </el-row>


              <el-divider content-position="left">
                {{ $t('car.car_image') }}
              </el-divider>

              <el-row type="flex" class="row-bg">
                <el-col :span="3" v-if="dataForm.car" v-for="(item, index) in dataForm.car.image" :key="index">
                  <el-image style="width: auto;height: 100px;" :src="item" :preview-src-list="dataForm.car.image">
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
                  <span v-if="dataForm.car">
                    {{ dataForm.car.browse_total }}
                  </span>
                </b>
              </el-form-item>

              <el-form-item :label="$t('car.collection_total')">
                <b>
                  <span v-if="dataForm.car">
                    {{ dataForm.car.collection_total }}
                  </span>
                </b>
              </el-form-item>

              <el-form-item prop="sell_status" :label="$t('car.sell_status')">
                <span v-if="dataForm.car">
                  {{ dataForm.car.sell_status }}
                </span>
              </el-form-item>

              <el-form-item :label="$t('car.create_time')">
                <span v-if="dataForm.car">
                  {{ dataForm.car.create_time }}
                </span>
              </el-form-item>
            </div>
          </el-card>

          <el-card class="box-card mt10" shadow="never">
            <div slot="header" class="clearfix color">
              <span>{{ $t('order.other_info') }}</span>
            </div>
            <div class="text item">
              <el-form-item :label="$t('order.delivery_quantity')" prop="delivery_quantity">
                <el-input-number :min="1" :placeholder="$t('order.delivery_quantity')" v-model="dataForm.delivery_quantity"></el-input-number>
              </el-form-item>

              <el-form-item :label="$t('order.delivery_date')" prop="delivery_date">
                <el-date-picker v-model="dataForm.delivery_date" type="date" :placeholder="$t('order.delivery_date')"></el-date-picker>
              </el-form-item>

              <el-form-item>
                <el-button v-if="isAuth('module:order:handle')" type="primary" @click="dataFormSubmit()">
                  {{ $t('common.confirm') }}
                </el-button>
                <el-button @click="resetForm()">
                  {{ $t('common.reset') }}
                </el-button>
              </el-form-item>
            </div>
          </el-card>


          <el-card class="box-card mt10" shadow="never">
            <div slot="header" class="clearfix color">
              <el-row>
                <el-col :span="12">
                  <span>{{ $t('order.logistics_info') }}</span>
                </el-col>
                <el-col class="right" :span="12">
                  <el-button v-if="isAuth('module:order:logistics:form')" type="primary" icon="el-icon-plus" @click="$router.push({name: 'module_order_logistics_form', query: {order_id: dataForm.id}})">
                    {{ $t('common.create') }}
                  </el-button>
                </el-col>
              </el-row>
            </div>
            <div class="text item">
              <el-table :data="dataList">
                <el-table-column prop="type" :label="$t('order.logistics.type')">
                  <template slot-scope="scope">
                    <span v-if="scope.row.category">
                      {{ scope.row.category.title }}
                    </span>
                  </template>
                </el-table-column>

                <el-table-column prop="logistics_status" :label="$t('order.logistics.logistics_status')">
                  <template slot-scope="scope">
                    {{ scope.row.logistics_status.text }}
                  </template>
                </el-table-column>

                <el-table-column prop="logistics_name" :label="$t('order.logistics.logistics_name')">
                </el-table-column>

                <el-table-column prop="logistics_no" :label="$t('order.logistics.logistics_no')">
                </el-table-column>

                <el-table-column prop="logistics_time" :label="$t('order.logistics.logistics_time')">
                </el-table-column>

                <el-table-column prop="address" :label="$t('order.logistics.address')">
                </el-table-column>

                <el-table-column prop="content" :label="$t('order.logistics.content')">
                </el-table-column>

                <el-table-column :label="$t('common.handle')" fixed="right" width="100">
                  <template slot-scope="scope">
                    <el-button v-if="isAuth('module:order:logistics:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
                      {{ $t('common.delete') }}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
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
        model: 'order',
        cerificate_front_picture: [],
        cerificate_behind_picture: [],
        dataForm:{
          id: 0,
          delivery_quantity: 1,
          delivery_date: '',
          car: {
            brand_title: '',
            shape_title: '',
            sell_money: 0,
            other_money: 0,
            browse_total: 0,
            collection_total: 0,
            sell_status: '',
            create_time: '',
            config: {},
            vedio_url: '',
            image: {},
          },
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
            audit_status: '',
            audit_content: '',
          },
        },
        // 视频播放
        playerOptions : {
          playbackRates : [ 0.5, 1.0, 1.5, 2.0 ], //可选择的播放速度
          autoplay : false, //如果true,浏览器准备好时开始回放。
          muted : false, // 默认情况下将会消除任何音频。
          loop : false, // 视频一结束就重新开始。
          preload : 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language : 'zh-CN',
          aspectRatio : '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid : true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources : [ {
            type : "",
              src : ""//url地址
            } ],
          poster : "", //你的封面地址
          // width: document.documentElement.clientWidth,
          notSupportedMessage : '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar : {
            timeDivider : true,//当前时间和持续时间的分隔符
            durationDisplay : true,//显示持续时间
            remainingTimeDisplay : false,//是否显示剩余时间功能
            fullscreenToggle : true  //全屏按钮
          }
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
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/order/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.delivery_quantity    = data.data.delivery_quantity || ''
                this.dataForm.delivery_date        = data.data.delivery_date || ''
                this.dataForm.car.brand_title      = data.data.brand.title || ''
                this.dataForm.car.shape_title      = data.data.shape.title || ''
                this.dataForm.car.sell_money       = data.data.car.sell_money
                this.dataForm.car.other_money      = data.data.car.other_money
                this.dataForm.car.browse_total     = data.data.car.browse_total
                this.dataForm.car.collection_total = data.data.car.collection_total
                this.dataForm.car.sell_status      = data.data.car.sell_status.text
                this.dataForm.car.create_time      = data.data.car.create_time

                this.dataForm.car.vedio_url = data.data.car.vedio_url || ''
                this.dataForm.car.image     = data.data.car.image
                this.dataForm.car.config    = data.data.car.config

                this.playerOptions.sources = [
                {
                  type : "",
                  src : this.dataForm.car.vedio_url//url地址
                }]

                if(data.data.member.certification)
                {
                  this.dataForm.user.certification_type           = data.data.member.certification.type.value
                  this.dataForm.user.realname           = data.data.member.certification.realname
                  this.dataForm.user.mobile             = data.data.member.certification.mobile
                  this.dataForm.user.certificate_type   = data.data.member.certification.certificate_type.value
                  this.dataForm.user.certificate_no     = data.data.member.certification.certificate_no
                  this.dataForm.user.bank_card_no       = data.data.member.certification.bank_card_no
                  this.dataForm.user.cerificate_behind_picture       = data.data.member.certification.cerificate_behind_picture
                  this.dataForm.user.cerificate_front_picture       = data.data.member.certification.cerificate_front_picture
                  this.dataForm.user.type = data.data.member.certification.type.value
                  this.dataForm.user.audit_status       = data.data.member.certification.audit_status.text
                  this.dataForm.user.audit_content      = data.data.member.certification.audit_content

                  this.cerificate_front_picture.push(data.data.member.cerificate_front_picture);
                  this.cerificate_behind_picture.push(data.data.member.cerificate_behind_picture);
                }
              }
            })
          }
        })
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/order/logistics/select'),
          method: 'get',
          params: this.$http.adornParams({
            'order_id': this.dataForm.id,
          })
        }).then(({data}) => {
          if (data && data.status === 200)
          {
            this.dataList = data.data
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/order/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'delivery_quantity': this.dataForm.delivery_quantity,
                'delivery_date': this.dataForm.delivery_date,
                'sell_money': this.dataForm.car.sell_money,
                'other_money': this.dataForm.car.other_money,
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
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })

        let message = this.$t('common.to_determine_the')
                      + this.$t('common.current_check')
                      + this.$t('common.for')
                      + `${id ? this.$t('common.delete') : this.$t('common.batch_delete')}`
                      + this.$t('common.handle')
                      + `?`

        if(this.message != undefined && this.message.error != undefined)
        {
          message = this.message.error
        }

        this.$confirm(message, this.$t('common.prompt'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/order/logistics/delete'),
            method: 'post',
            data: {id: this.$http.adornData(ids, false)}
          }).then(({data}) => {
            if (data && data.status === 200) {
              this.$message({
                message: this.$t('common.handle_success'),
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(this.$t(data.message))
            }
          })
        }).catch(() => {})
      },
    },
    created(request)
    {
      this.init();
      this.getDataList();
    }
  };
</script>
