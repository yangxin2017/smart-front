<template>
  <div class="importfile-class">
    <div v-show="dialog == -1">
      <!-- <el-row class="row-class">
        <el-col :offset="23" :span="1">
          <el-button
            type="primary"
            size="mini"
            @click="$router.push('/itemquery')"
          >
            返回
          </el-button>
        </el-col>
      </el-row> -->
      <!-- <el-row v-for="(item, index) in upfileList" class="row-class" :key="index">
        <template v-if="item.label">{{ item.label }}</template>
        <template v-for="(row, rowindex) in item" v-else>
          <el-col :span="4" align="center" :key="'row0' + index + '_' + rowindex">
            {{ row.title }}
          </el-col>
          <el-col :span="8" :key="'row1' + index + '_' + rowindex" style="display: flex">
            <el-upload
              v-if="row.upfile"
              class="upload-demo"
              :action="row.action + '?bid=' + row.bid + '&projectId=' + projectId"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-success="uploadEnd"
              :on-error="uploadEnd"
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
            <el-popconfirm title="是否确认永久清空该数据？" @confirm="allDelect(row)">
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete-solid"
                v-if="row.alldata"
                slot="reference"
                style="margin: 0 10px"
              >
                数据清空
              </el-button>
            </el-popconfirm>
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
      </el-row> -->

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
              <el-popconfirm title="是否确认永久清空该数据？" @confirm="allDelect(row)">
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete-solid"
                  v-if="row.alldata"
                  slot="reference"
                  style="margin: 0 10px"
                >
                  数据清空
                </el-button>
              </el-popconfirm>
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
    };
  },
  mounted() {
    this.upfileList = require("@/assets/list/list.json");
    this.projectId = this.$route.query.id;
  },
  methods: {
    uploadEnd(res) {
      this.fileList = {};
      // this.$refs.ref_upload.clearFiles();
      if (res.msg != "") {
        this.$message.error(res.msg);
        // this.$notify({
        //   title: "错误",
        //   dangerouslyUseHTMLString: true,
        //   message: res.msg,
        //   type: "error",
        //   duration: 0,
        // });
      } else {
        this.$message.success("导入成功！");
      }
    },
    allData(item) {
      this.rowList = item;
      this.tableName = item.title;
      this.headerList = item.headerList;
      this.dialog = 1;
    },
    allDelect(item) {
      console.log(item);
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
