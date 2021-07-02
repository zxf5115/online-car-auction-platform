<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <router-link :to="{name: 'module_advertising_form'}">
              <el-button v-if="isAuth('module:advertising:form')" type="success" icon="el-icon-plus">
                {{ $t('common.create') }}
              </el-button>
            </router-link>
          </div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:advertising:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
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

          <el-table-column prop="position_id" :label="$t('advertising.position.title')">
            <template slot-scope="scope" v-if="scope.row.position">
              {{ scope.row.position.title }}
            </template>
          </el-table-column>

          <el-table-column prop="title" :label="$t('advertising.title')">
          </el-table-column>

          <!-- <el-table-column prop="picture" :label="$t('advertising.picture')">
            <template slot-scope="scope">
              <el-image style="width: 40px;" :src="scope.row.picture">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </el-table-column> -->

          <el-table-column prop="sort" :label="$t('common.sort')">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="280">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:advertising:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_advertising_form', query: {id: scope.row.id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:advertising:enable')" :type="scope.row.status.value == 2 ? 'danger' : 'success'" :icon="scope.row.status.value == 1 ? 'el-icon-check' : 'el-icon-close'" @click="enableHandle(scope.row.id, scope.row.status.value)">
                <span v-if="scope.row.status.value == 1">
                  {{ $t('advertising.enable') }}
                </span>
                <span v-else>
                  {{ $t('advertising.disable') }}
                </span>
              </el-button>

              <el-button v-if="isAuth('module:advertising:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'advertising',
        position_id: 0,
        dataForm: []
      };
    },
    methods: {
      // 禁用（解禁）车商账户
      enableHandle (id, status) {
        let message = '您确定要解禁当前广告信息？'

        if(1 == status)
        {
          message = '您确定要禁用当前广告信息？'
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
      this.dataForm.position_id = this.$route.query.position_id;
      this.getDataList()
    }
  };
</script>
