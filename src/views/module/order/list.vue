<template>
  <div class="qingwu color">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:order:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.order_no" :placeholder="$t('common.please_input') + $t('order.order_no')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.member_nickname" :placeholder="$t('common.please_input') + $t('member.nickname')" clearable>
            </el-input>
          </div>
          <div>
            <el-select v-model="dataForm.source_id" :placeholder="$t('common.please_select') + $t('car.source.title')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option v-for="(v,k) in sourceList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </div>
          <div>
            <el-select v-model="dataForm.order_status" :placeholder="$t('common.please_select') + $t('order.order_status')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option v-for="(v,k) in orderStatus" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </div>
          <div>
            <el-select v-model="dataForm.pay_money" :placeholder="$t('common.please_select') + $t('order.pay_money')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option v-for="(v,k) in payMoney" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </div>
          <div>
            <el-button icon="el-icon-search" @click="getDataList(true)">
              {{ $t('common.search') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_table_main">
        <el-table :data="dataList" v-loading="dataListLoading" @selection-change="selectionChangeHandle">
          <el-table-column type="selection" header-align="center" align="center">
          </el-table-column>

          <el-table-column prop="order_no" :label="$t('order.order_no')" width="180">
          </el-table-column>

          <el-table-column :label="$t('order.nickname')">
            <template slot-scope="scope">
              <span v-if="scope.row.member">
                {{ scope.row.member.nickname }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('car.source.title')">
            <template slot-scope="scope">
              <span v-if="scope.row.source">
                {{ scope.row.source.title }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('car.brand.title')">
            <template slot-scope="scope">
              <span v-if="scope.row.brand">
                {{ scope.row.brand.title }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('car.shape.title')">
            <template slot-scope="scope">
              <span v-if="scope.row.shape">
                {{ scope.row.shape.title }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('order.logistics_info')">
            <template slot-scope="scope">
              <el-button type="text" @click="loadLogisticsList(scope.row.id)">
                {{ $t('order.logistics_info') }}
              </el-button>
            </template>
          </el-table-column>

          <el-table-column :label="$t('order.pay_money')">
            <template slot-scope="scope">
              <span class="red">
                {{ scope.row.pay_money }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="order_status" :label="$t('order.order_status')">
            <template slot-scope="scope">
              {{ scope.row.order_status.text }}
            </template>
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('order.create_time')" width="140">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="500">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:order:view')" type="info" icon="el-icon-view" @click="$router.push({name: 'module_order_view', query: {id: scope.row.id}})">
                {{ $t('common.view') }}
              </el-button>

              <el-button v-if="isAuth('module:order:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_order_form', query: {id: scope.row.id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:order:logistics:form')" type="primary" icon="el-icon-plus" @click="$router.push({name: 'module_order_logistics_form', query: {order_id: scope.row.id}})">
                {{ $t('order.logistics_create') }}
              </el-button>

              <el-button v-if="isAuth('module:order:status') && scope.row.order_status['value'] == 0" type="warning" icon="el-icon-finished" @click="statusHandle(scope.row.id, 1)">
                {{ $t('order.pay_finish') }}
              </el-button>

              <el-button v-if="isAuth('module:order:status') && scope.row.order_status['value'] == 1" type="warning" icon="el-icon-truck" @click="statusHandle(scope.row.id, 2)">
                {{ $t('order.take_finish') }}
              </el-button>

              <el-button v-if="isAuth('module:advertising:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
                {{ $t('common.delete') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog :title="$t('order.logistics_info')" :visible.sync="dialogTableVisible">
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in logisticsList"
              :key="index"
              :timestamp="item.logistics_time">
              [{{item.logistics_status.text}}] {{item.content}}
            </el-timeline-item>
          </el-timeline>
        </el-dialog>

        <div class="admin_table_main_pagination">
          <el-pagination
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :page-size="pageSize"
            :total="totalPage"
            :current-page="pageIndex"
            background layout="prev, pager, next,jumper,total">
          </el-pagination>
        </div>
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
        model: 'order',
        dialogTableVisible: false,
        sourceList: [],
        logisticsList: [],
        orderStatus: [
          {'id': 0, 'title': '待付款'},
          {'id': 1, 'title': '待提货'},
          {'id': 2, 'title': '已完成'},
        ],
        payMoney: [
          {'id': 1, 'title': '5万以下'},
          {'id': 2, 'title': '5-10万'},
          {'id': 3, 'title': '10-15万'},
          {'id': 4, 'title': '15-30万'},
          {'id': 5, 'title': '30-60万'},
          {'id': 6, 'title': '60万以上'},
        ],
        dataForm: [
          'order_no',
          'member_nickname',
          'source_id',
          'pay_money',
          'order_status'
        ]
      };
    },
    methods: {
      loadSourceList() {
        this.$http({
          url: this.$http.adornUrl('/car/source/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.sourceList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      loadLogisticsList(id) {
        this.$http({
          url: this.$http.adornUrl('/order/logistics/select'),
          method: 'get',
          params: this.$http.adornParams({
            order_id: id
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.dialogTableVisible = true

            this.logisticsList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      statusHandle (id, status) {
        this.$http({
          url: this.$http.adornUrl('/order/status'),
          method: 'post',
          data: this.$http.adornData({
            'id': id,
            'status': status,
          })
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
      },
    },
    created() {
      this.getDataList()
      this.loadSourceList();
    },
  };
</script>
