<template>
  <div class="importfile-class">
    <div v-show="dialog == -1">
      <template v-for="(item, index) in upfileList">
        <div
          :key="index"
          style="
            padding: 10px 0;
            border-bottom: 1px solid #e8e8e8;
            font-size: 20px;
            font-weight: 900;
          "
        >
          {{ item.label }}
        </div>
        <el-row class="row-class" :key="index + 'row'">
          <template v-for="(row, rowindex) in item.list">
            <el-col :span="4" class="col-class" :key="rowindex + 'col1'">{{
              row.title
            }}</el-col>
            <el-col :span="8" class="col-class" :key="rowindex + 'col2'">
              <el-upload
                v-if="row.upfile"
                class="upload-demo"
                :action="row.action + '?bid=' + row.bid + '&projectId=' + projectId"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="uploadEnd"
                :on-error="uploadEnd"
                :before-upload="handleProgress"
                multiple
                :on-exceed="handleExceed"
                :file-list="fileList[row.title]"
                :show-file-list="false"
                ref="ref_upload"
              >
                <el-button
                  type="primary"
                  size="mini"
                  style="margin-right: 10px"
                  icon="el-icon-upload"
                >
                  数据导入
                </el-button>
              </el-upload>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-download"
                v-if="row.outfile"
                @click="downloadFile(row)"
              >
                数据导出
              </el-button>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-download"
                v-if="row.download"
                @click="downlaodTemplate(row)"
              >
                模板下载
              </el-button>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete-solid"
                v-if="row.alldata"
                @click="allDelect(row)"
              >
                数据清空
              </el-button>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-tickets"
                v-if="row.alldata"
                @click="allData(row)"
              >
                全部数据
              </el-button>
            </el-col>
          </template>
        </el-row>
      </template>
    </div>

    <template v-if="dialog == 1">
      <el-button type="primary" size="mini" class="rest-button" @click="dialog = -1">
        返回
      </el-button>
      <tablePublic :tableName="tableName" :headerList="headerList" :rowList="rowList" />
    </template>
  </div>
</template>

<script>
import tablePublic from "./components/tablePublic";
import { removeList } from "@/api/public";
export default {
  components: {
    tablePublic,
  },
  data() {
    return {
      fileList: {},
      upfileList: [],
      dialog: -1,
      tableName: "",
      headerList: [],
      projectId: null,

      rowList: {},

      loading: false,
    };
  },
  mounted() {
    this.upfileList = require("@/assets/list/list.json");
    // this.projectId = this.$route.query.id;
    // let id = this.getUrlParam("id");
    // if (this.projectId != id) {
    //   this.projectId = id;
    // }
    this.projectId = this.getUrlParam("id");
  },
  methods: {
    handleProgress() {
      this.loading = this.$loading({
        lock: true,
        text: "数据正在导入，请稍等...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
    },
    uploadEnd(res) {
      this.fileList = {};
      // this.$refs.ref_upload.clearFiles();
      if (res.msg != "") {
        this.$message.error({ message: res.msg, showClose: true });
        // this.$notify({
        //   title: "错误",
        //   dangerouslyUseHTMLString: true,
        //   message: res.msg,
        //   type: "error",
        //   duration: 0,
        // });
        this.loading.close();
      } else {
        this.$message.success({ message: "导入成功！", showClose: true });
        this.loading.close();
      }
    },
    getUrlParam(name) {
      let url = window.location.href;
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      let r = url.split("?")[1].match(reg);
      console.log(r);
      if (r != null) return r[2];
      return null;
    },
    allData(item) {
      console.log(item)
      this.rowList = item;
      this.tableName = item.title;
      this.headerList = item.headerList;
      this.dialog = 1;
    },
    allDelect(item) {
      console.log(item);
      // 气泡确认，点击确定后执行删除操作
      this.$confirm("此操作将永久清空该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: "数据正在删除，请稍等...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        removeList(item.remove, this.projectId).then((res) => {
          loading.close()
          this.$message.success("清空成功！");
        });
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    downloadFile(row) {
      window.open(row.downloadUrl);
    },
    downlaodTemplate(row) {
      window.open(row.template);
    },
  },
};
</script>

<style lang="scss" scoped>
.importfile-class {
  width: 100%;
  height: 100%;
  padding: 10px;
  position: relative;
  .row-class {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    // height: 50px;
    border-bottom: 1px solid #e8e8e8;
    .col-class {
      display: flex;
      margin: 10px 0;
    }
  }
  .rest-button {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 50;
  }
}
</style>
