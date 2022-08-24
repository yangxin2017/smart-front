<template>
  <div class="app-container">
    <el-table :data="tableData" height="100%" border style="width: 100%">
      <el-table-column prop="name" label="数据名称"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-upload class="upload-demo" style="display: inline-block;margin-right: 20px;"
            :action="action" :data="{bid: scope.row.id}" :on-success="handleUploadSuccess" :before-upload="handleBeforeUpload" :limit="1000" :show-file-list="false">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>

          <el-button type="primary" size="small" @click="handleShowFileList(scope.row.id)">文件列表</el-button>
          <!-- <el-button type="primary" size="small">下载</el-button>
          <el-button type="primary" size="small">查看全部</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <list-dialog ref="refLDialog"></list-dialog>
  </div>
</template>

<script>
import { getAll } from '@/api/datatype'
import ListDialog from './list-dialog.vue'
export default {
  components: {
    ListDialog
  },
  data() {
    return {
      action: '/analysis/file/upload',
      tableData: [],
      loadingmd: null
    }
  },
  mounted() {
    this.initInfo()
  },
  methods: {
    async initInfo() {
      let obj = await getAll()
      this.tableData = obj.data
    },
    handleBeforeUpload() {
      this.loadingmd = this.$loading({
        lock: true,
        text: '正在上传数据，请稍候',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      return true
    },
    handleUploadSuccess(res, file) {
      this.loadingmd.close()
      this.$message.success('上传成功')
    },
    handleShowFileList(bid) {
      this.$refs.refLDialog.dy_show(bid)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container{
  height: 100%;
}
</style>
