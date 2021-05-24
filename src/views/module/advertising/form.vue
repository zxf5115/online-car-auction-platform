<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('advertising.from') }}</div>
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

          <el-form-item :label="$t('advertising.position.title')" prop="position_id">
            <el-select v-model="dataForm.position_id" :placeholder="$t('common.please_select')+$t('advertising.position.title')">
              <el-option v-for="(v,k) in position" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('advertising.title')" prop="title">
            <el-input :placeholder="$t('common.please_input')+$t('advertising.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item class="mavon" prop="content" :label="$t('advertising.content')">
            <editor ref="editor" :value="dataForm.content"></editor>
          </el-form-item>

          <el-form-item class="mavon" :label="$t('advertising.picture')" prop="picture">
            <el-upload :action="this.$http.adornUrl('/file/picture')" list-type="picture-card" :headers="upload_headers" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"  :on-success="handlePictureSuccess" :before-upload="beforePictureUpload" :file-list="pictureList" :limit="5">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>

          <el-form-item :label="$t('common.sort')" prop="sort">
            <el-input-number :placeholder="$t('common.please_input')+$t('common.sort')" v-model="dataForm.sort"></el-input-number>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:advertising:handle')" type="primary" @click="dataFormSubmit()">
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
  import Editor from "@/components/form/editor"
  export default {
    extends: common,
    components: {
      Editor
    },
    data() {
      return {
        model: 'advertising',
        position: [],
        dialogImageUrl: '',
        dialogVisible: false,
        pictureList: [],
        upload_headers:{},
        dataForm:
        {
          id: 0,
          position_id: '',
          title: '',
          content: '',
          picture: [],
          sort: 0,
        },
        dataRule:
        {
          position_id: [
            { required: true, message: this.$t('advertising.rules.position_id.require'), trigger: 'blur' },
          ],
          title: [
            { required: true, message: this.$t('advertising.rules.title.require'), trigger: 'blur' },
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
              url: this.$http.adornUrl(`/advertising/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.position_id = data.data.position_id
                this.dataForm.title       = data.data.title
                this.dataForm.content     = data.data.content
                this.dataForm.sort        = data.data.sort
                this.dataForm.picture     = data.data.pictureData
                this.pictureList          = data.data.pictureList
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
              url: this.$http.adornUrl(`/advertising/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'position_id': this.dataForm.position_id,
                'title': this.dataForm.title,
                'content': this.$refs.editor.content,
                'picture': this.dataForm.picture,
                'sort': this.dataForm.sort,
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
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handlePictureSuccess(res, file) {
        this.dataForm.picture.push(res.data);
      },
      handleRemove(file, fileList) {

        let url = []

        fileList.forEach(res => {
          url.push(res.url);
        });

        this.dataForm.picture = url
      },
      loadPositionList () {
        this.$http({
          url: this.$http.adornUrl('/advertising/position/select'),
          method: 'get',
          params: this.$http.adornParams({
            'is_open': 1
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.position = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
    },
    created() {
      this.init();

      this.loadPositionList();

      this.dataForm.position_id = this.$route.query.position_id;

      // 要保证取到
      this.upload_headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    }
  };
</script>

<style lang="scss" scoped>
  .mavon {
    width: 95% !important;
  }
</style>
