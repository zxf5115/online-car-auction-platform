<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:car:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.member_username" :placeholder="$t('common.please_input') + $t('member.username')" clearable>
            </el-input>
          </div>
          <div>
            <el-select v-model="dataForm.source_id" :placeholder="$t('common.please_select') + $t('car.source.title')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option v-for="(v,k) in sourceList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </div>
          <div>
            <el-button icon="el-icon-search" @click="getDataList()">
              {{ $t('common.search') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_table_main">
        <el-table :data="dataList" v-loading="dataListLoading" @selection-change="selectionChangeHandle">
          <el-table-column type="selection" header-align="center" align="center">
          </el-table-column>

          <el-table-column prop="id" label="#"  width="70px">
          </el-table-column>

          <el-table-column :label="$t('member.username')">
            <template slot-scope="scope" v-if="scope.row.member">
              {{ scope.row.member.username }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('merchant.nickname')">
            <template slot-scope="scope" v-if="scope.row.member">
              {{ scope.row.member.nickname }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('car.source.title')">
            <template slot-scope="scope" v-if="scope.row.source">
              {{ scope.row.source.title }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('car.brand.title')">
            <template slot-scope="scope" v-if="scope.row.brand">
              {{ scope.row.brand.title }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('car.shape.title')">
            <template slot-scope="scope" v-if="scope.row.shape">
              {{ scope.row.shape.title }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="380">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:car:view')" type="info" icon="el-icon-view" @click="$router.push({name: 'module_car_view', query: {id: scope.row.id}})">
                {{ $t('common.view') }}
              </el-button>

              <el-button v-if="isAuth('module:car:form') && scope.row.audit_status['value'] != 1" type="primary" icon="el-icon-finished" @click="$router.push({name: 'module_car_form', query: {id : scope.row.id}})">
                {{ $t('common.audit') }}
              </el-button>

              <el-button v-if="isAuth('module:car:enable')" :type="scope.row.status.value == 2 ? 'danger' : 'success'" :icon="scope.row.status.value == 1 ? 'el-icon-check' : 'el-icon-close'" @click="enableHandle(scope.row.id, scope.row.status.value)">
                <span v-if="scope.row.status.value == 1">
                  {{ $t('member.enable') }}
                </span>
                <span v-else>
                  {{ $t('member.disable') }}
                </span>
              </el-button>

              <el-button v-if="isAuth('module:car:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
                {{ $t('common.delete') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>

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
        model: 'car',
        sourceList: [],
        dataForm: [
          'source_id',
          'member_username'
        ]
      };
    },
    methods: {
      // 禁用（解禁）汽车来源
      enableHandle (id, status) {
        let message = '您确定要解禁当前汽车信息？'

        if(1 == status)
        {
          message = '您确定要禁用当前汽车信息？'
        }

        this.$confirm(message, this.$t('common.prompt'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/'+this.model+'/enable'),
            method: 'post',
            data: {id: id}
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
    },
    created() {
      this.getDataList()

      this.loadSourceList()
    }
  };
</script>
