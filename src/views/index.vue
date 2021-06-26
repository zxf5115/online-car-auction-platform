<template>
  <div class="qingwu color">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户统计</span>
        <div class="type">
          <el-select v-model="user_type" clearable @change="user">
            <el-option v-for="(v,k) in typeList" :label="v.title" :key="k" :value="v.id"></el-option>
          </el-select>
        </div>
      </div>
      <div class="text item text-center">
        <el-row :gutter="20">
          <el-col :span="8" class="default_block_col">
            <el-card shadow="never">
              <el-row>
                <el-col :span="12">
                  <i class="icon el-icon-user-solid"></i>
                </el-col>
                <el-col :span="12">
                  <div class="default_day_sale">
                    用户总数
                    <span class="blue">
                      <el-button type="text" @click="$router.push({name: 'module_member_list'})">
                        {{ statistical.member_total }}
                      </el-button>
                    </span>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="8" class="default_block_col">
            <el-card shadow="never">
              <el-row>
                <el-col :span="12">
                  <i class="icon el-icon-user"></i>
                </el-col>
                <el-col :span="12">
                  <div class="default_day_sale">
                    新增用户
                    <span class="blue">
                      <el-button type="text" @click="$router.push({name: 'module_member_list'})">
                        {{ statistical.today_member_total }}
                      </el-button>
                    </span>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="8" class="default_block_col">
            <el-card shadow="never">
              <el-row>
                <el-col :span="12">
                  <i class="icon el-icon-s-custom"></i>
                </el-col>
                <el-col :span="12">
                  <div class="default_day_sale">
                    车商新增
                    <span class="blue">
                      <el-button type="text" @click="$router.push({name: 'module_merchant_list'})">
                        {{ statistical.merchant_total }}
                      </el-button>
                    </span>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-card class="box-card mt10">
      <div slot="header" class="clearfix">
        <span>汽车统计</span>
        <div class="type">
          <el-select v-model="car_type" clearable @change="car">
            <el-option v-for="(v,k) in typeList" :label="v.title" :key="k" :value="v.id"></el-option>
          </el-select>
        </div>
      </div>
      <div class="text item text-center">
        <div>
          <el-row :gutter="20">
            <el-col :span="8" class="default_block_col">
              <el-card shadow="never">
                <el-row>
                  <el-col :span="12">
                    <i class="icon el-icon-ship"></i>
                  </el-col>
                  <el-col :span="12">
                    <div class="default_day_sale">
                      海外车源
                      <span class="blue">
                        <el-button type="text" @click="$router.push({name: 'module_car_list'})">
                          {{ statistical.car_out_total }}
                        </el-button>
                      </span>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            <el-col :span="8" class="default_block_col">
              <el-card shadow="never">
                <el-row>
                  <el-col :span="12">
                    <i class="icon el-icon-truck"></i>
                  </el-col>
                  <el-col :span="12">
                    <div class="default_day_sale">
                      国内车源
                      <span class="blue">
                        <el-button type="text" @click="$router.push({name: 'module_car_list'})">
                          {{ statistical.car_in_total }}
                        </el-button>
                      </span>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            <el-col :span="8" class="default_block_col">
              <el-card shadow="never">
                <el-row>
                  <el-col :span="12">
                    <i class="icon el-icon-bicycle"></i>
                  </el-col>
                  <el-col :span="12">
                    <div class="default_day_sale">
                      二手车源
                      <span class="blue">
                        <el-button type="text" @click="$router.push({name: 'module_car_list'})">
                          {{ statistical.car_old_total }}
                        </el-button>
                      </span>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="default_total">
          <ve-histogram :data="carData"></ve-histogram>
        </div>
      </div>
    </el-card>

    <el-card class="box-card mt10">
      <div slot="header" class="clearfix">
        <span>订单统计</span>
        <div class="type">
          <el-select v-model="order_type" clearable @change="order">
            <el-option v-for="(v,k) in typeList" :label="v.title" :key="k" :value="v.id"></el-option>
          </el-select>
        </div>
      </div>
      <div class="text item text-center">
        <div>
          <el-row :gutter="20">
            <el-col :span="8" class="default_block_col">
              <el-card shadow="never">
                <el-row>
                  <el-col :span="12">
                    <i class="icon el-icon-shopping-cart-full"></i>
                  </el-col>
                  <el-col :span="12">
                    <div class="default_day_sale">
                      新增待支付订单
                      <span class="blue">
                        <el-button type="text" @click="$router.push({name: 'module_order_list'})">
                          {{ statistical.wait_order_total }}
                        </el-button>
                      </span>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            <el-col :span="8" class="default_block_col">
              <el-card shadow="never">
                <el-row>
                  <el-col :span="12">
                    <i class="icon el-icon-shopping-cart-1"></i>
                  </el-col>
                  <el-col :span="12">
                    <div class="default_day_sale">
                      新增完成订单
                      <span class="blue">
                        <el-button type="text" @click="$router.push({name: 'module_order_list'})">
                          {{ statistical.finish_order_total }}
                        </el-button>
                      </span>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            <el-col :span="8" class="default_block_col">
              <el-card shadow="never">
                <el-row>
                  <el-col :span="12">
                    <i class="icon el-icon-shopping-cart-2"></i>
                  </el-col>
                  <el-col :span="12">
                    <div class="default_day_sale">
                      新增待提货订单
                      <span class="blue">
                        <el-button type="text" @click="$router.push({name: 'module_order_list'})">
                          {{ statistical.wait_take_order_total }}
                        </el-button>
                      </span>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="default_total">
          <ve-line :data="orderData"></ve-line>
        </div>
      </div>
    </el-card>

    <el-card class="box-card mt10">
      <div slot="header" class="clearfix">
        <span>成交额统计</span>
        <div class="type">
          <el-select v-model="money_type" clearable @change="money">
            <el-option v-for="(v,k) in typeList" :label="v.title" :key="k" :value="v.id"></el-option>
          </el-select>
        </div>
      </div>
      <div class="text item text-center">
        <div>
          <el-row :gutter="20">
            <el-col :span="8" class="default_block_col">
              <el-card shadow="never">
                <el-row>
                  <el-col :span="12">
                    <i class="icon el-icon-ship"></i>
                  </el-col>
                  <el-col :span="12">
                    <div class="default_day_sale">
                      海外车源
                      <span class="blue">
                        {{ statistical.money_out_total }}
                      </span>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            <el-col :span="8" class="default_block_col">
              <el-card shadow="never">
                <el-row>
                  <el-col :span="12">
                    <i class="icon el-icon-truck"></i>
                  </el-col>
                  <el-col :span="12">
                    <div class="default_day_sale">
                      国内车源
                      <span class="blue">
                        {{ statistical.money_in_total }}
                      </span>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            <el-col :span="8" class="default_block_col">
              <el-card shadow="never">
                <el-row>
                  <el-col :span="12">
                    <i class="icon el-icon-bicycle"></i>
                  </el-col>
                  <el-col :span="12">
                    <div class="default_day_sale">
                      二手车源
                      <span class="blue">
                        {{ statistical.money_old_total }}
                      </span>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="default_total">
          <ve-line :data="moneyData"></ve-line>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import VeHistogram from 'v-charts/lib/histogram.common'
  import VeLine from 'v-charts/lib/line.common'
  export default {
    components: {
      VeHistogram,
      VeLine,
    },
    data() {
      return {
        user_type: 1,
        car_type: 1,
        order_type: 1,
        money_type: 1,
        carData: {
          columns: ['title', '汽车数'],
          rows: []
        },
        orderData: {
          columns: ['title', '新增待支付订单', '新增完成订单', '新增待提货订单'],
          rows: []
        },
        moneyData: {
          columns: ['title', '国外车源', '国内车源', '二手车源'],
          rows: []
        },
        typeList: [
          {'id': 1, 'title': '今日'},
          {'id': 2, 'title': '最近七日'},
          {'id': 3, 'title': '最近一个月'},
          {'id': 4, 'title': '最近三个月'},
          {'id': 5, 'title': '最近半年'},
          {'id': 6, 'title': '最近一年'},
        ],
        statistical: {
          today_member_total: 0,
          member_total: 0,
          merchant_total: 0,

          car_out_total: 0,
          car_in_total: 0,
          car_old_total: 0,

          wait_order_total: 0,
          finish_order_total: 0,
          wait_take_order_total: 0,

          money_out_total: 0.00,
          money_in_total: 0.00,
          money_old_total: 0.00,
        },
      };
    },
    methods: {
      user(type = 1) {
        this.$http({
          url: this.$http.adornUrl(`/index/user`),
          method: 'get',
          params: this.$http.adornParams({
            'type': type
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.statistical.today_member_total = data.data.today_member_total
            this.statistical.member_total       = data.data.member_total
            this.statistical.merchant_total     = data.data.merchant_total
          }
        })
      },
      car(type = 1) {
        this.$http({
          url: this.$http.adornUrl(`/index/car`),
          method: 'get',
          params: this.$http.adornParams({
            'type': type
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.statistical.car_out_total = data.data.car_out_total
            this.statistical.car_in_total  = data.data.car_in_total
            this.statistical.car_old_total = data.data.car_old_total
            this.carData.rows              = data.data.data
          }
        })
      },
      order(type = 1) {
        this.$http({
          url: this.$http.adornUrl(`/index/order`),
          method: 'get',
          params: this.$http.adornParams({
            'type': type
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.statistical.wait_order_total      = data.data.wait_order_total
            this.statistical.finish_order_total    = data.data.finish_order_total
            this.statistical.wait_take_order_total = data.data.wait_take_order_total
            this.orderData.rows                    = data.data.data
          }
        })
      },
      money(type = 1) {
        this.$http({
          url: this.$http.adornUrl(`/index/money`),
          method: 'get',
          params: this.$http.adornParams({
            'type': type
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.statistical.money_out_total = data.data.money_out_total
            this.statistical.money_in_total  = data.data.money_in_total
            this.statistical.money_old_total = data.data.money_old_total
            this.moneyData.rows              = data.data.data
          }
        })
      },
    },
    created(request)
    {
      this.user();
      this.car();
      this.order();
      this.money();
    }
  };
</script>
<style lang="scss" scoped>
  .text-center {
    text-align: center;
  }
  .type {
    float: right;
    padding: 3px 0
  }
  .icon {
    font-size: 36px;
    padding-top: 20px;
  }
  .unline {
    margin: 15px 0;
  }
  .default_block_col {
    margin-bottom: 20px;
  }
  .default_total:after {
    clear: both;
    content: "";
    display: block;
  }
  .default_day_sale {
    margin-top: 30px;
    margin-bottom: 45px;
  }
  .el-button--mini, .el-button--small {
    font-size: 15px;
  }
</style>
