<template>
  <el-dialog title="文件列表" :visible.sync="dialogVisible" width="60%">
    <el-table :data="tableData" border style="width: 100%;height: 500px;">
      <el-table-column prop="filename" label="文件名称"> </el-table-column>
      <el-table-column prop="filesize" label="文件大小">
        
      </el-table-column>
      <el-table-column prop="ctime" label="上传时间"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleDownload(scope.row)">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
import { getListByBelongId } from '@/api/datafile'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: []
    }
  },
  methods: {
    async dy_show(bid) {
      this.dialogVisible = true
      this.tableData = []
      let obj = await getListByBelongId(bid)
      for (let d of obj.data) {
        d.filesize = (d.filesize / 1024).toFixed(1) + 'Kb'
        d.ctime = dayjs(d.ctime).format('YYYY年MM月DD日 HH时mm分ss秒')
      }
      this.tableData = obj.data
    },
    handleDownload(obj) {
      window.open('/analysis/file/download?id=' + obj.id)
      console.log(obj)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
