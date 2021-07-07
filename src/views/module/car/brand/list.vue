<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <router-link :to="{name: 'module_car_brand_form'}">
              <el-button v-if="isAuth('module:car:brand:form')" type="success" icon="el-icon-plus">
                {{ $t('common.create') }}
              </el-button>
            </router-link>
          </div>
        </div>
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:car:brand:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.title" :placeholder="$t('common.please_input') + $t('car.brand.title')" clearable>
            </el-input>
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

          <el-table-column prop="id" label="#" width="70px">
          </el-table-column>

          <el-table-column prop="title" :label="$t('car.brand.title')">
          </el-table-column>

          <el-table-column prop="picture" :label="$t('car.brand.picture')">
            <template slot-scope="scope">
              <el-image style="width: 40px;" :src="scope.row.picture">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </el-table-column>

          <el-table-column :label="$t('car.brand.is_hot')">
            <template slot-scope="scope">
              {{ scope.row.is_hot.text }}
            </template>
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('common.create_time')">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="460">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:car:brand:view')" type="info" icon="el-icon-view" @click="$router.push({name: 'module_car_brand_view', query: {id: scope.row.id}})">
                {{ $t('common.view') }}
              </el-button>

              <el-button v-if="isAuth('module:car:brand:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_car_brand_form', query: {id : scope.row.id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:car:brand:hot')" :type="scope.row.is_hot.value == 2 ? 'danger' : 'success'" :icon="scope.row.is_hot.value == 1 ? 'el-icon-check' : 'el-icon-close'" @click="hotHandle(scope.row.id, scope.row.is_hot.value)">
                <span v-if="scope.row.is_hot.value == 1">
                  {{ $t('car.brand.yes') }}
                </span>
                <span v-else>
                  {{ $t('car.brand.no') }}
                </span>
              </el-button>

              <el-button v-if="isAuth('module:car:brand:enable')" :type="scope.row.status.value == 2 ? 'danger' : 'success'" :icon="scope.row.status.value == 1 ? 'el-icon-check' : 'el-icon-close'" @click="enableHandle(scope.row.id, scope.row.status.value)">
                <span v-if="scope.row.status.value == 1">
                  {{ $t('member.enable') }}
                </span>
                <span v-else>
                  {{ $t('member.disable') }}
                </span>
              </el-button>

              <el-button v-if="isAuth('module:car:brand:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'car/brand',
        dataForm: [
          'title'
        ]
      };
    },
    methods: {
      // 热门（普通）汽车品牌
      hotHandle (id, status) {
        let message = '您确定要设置当前汽车品牌为热门？'

        if(1 == status)
        {
          message = '您确定要设置当前汽车品牌为普通？'
        }

        this.$confirm(message, this.$t('common.prompt'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/'+this.model+'/hot'),
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
      // 禁用（解禁）汽车品牌
      enableHandle (id, status) {
        let message = '您确定要解禁当前汽车品牌？'

        if(1 == status)
        {
          message = '您确定要禁用当前汽车品牌？'
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
      }
    },
    created() {
      this.getDataList()
    }
  };
</script>
