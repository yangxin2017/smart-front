<template>
  <div class="item-class">
    <div class="search-class">
      项目名称：
      <el-input
        size="mini"
        v-model="params.name"
        placeholder="请输入项目名称"
        style="width: 160px"
      ></el-input>
      <el-button type="primary" size="mini" @click="search">查询</el-button>
      <el-button type="primary" size="mini" @click="createClick"> 新建 </el-button>
    </div>

    <el-table :data="tableList" width="100%" height="calc(100% - 40px)">
      <el-table-column label="项目名称" prop="name">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="主要目标人" prop="persons"></el-table-column>
      <el-table-column label="创建时间" prop="ctime">
        <template slot-scope="scope">
          {{ formatDate(scope.row.ctime) }}
        </template>
      </el-table-column>
      <el-table-column label="最后修改时间" prop="utime">
        <template slot-scope="scope">
          {{ formatDate(scope.row.utime) }}
        </template>
      </el-table-column>
      <el-table-column label="上次分析时间" prop="fxtime">
        <template slot-scope="scope">
          {{ formatDate(scope.row.fxtime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="jisuan(scope.row)">
            数据计算
          </el-button>
          <el-button type="text" size="mini" @click="weihu(scope.row)">
            数据维护
          </el-button>
          <!-- 可视分析 -->
          <el-button type="text" size="mini" @click="fenxi(scope.row)">
            可视分析
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="30%">
      <el-form label-width="120px">
        <el-form-item label="项目名称">
          <el-input v-model="project.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave"> 保 存 </el-button>
          <el-button @click="dialog.visible = false"> 取 消 </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { GetProjectList, AddProject, CalcProject } from "@/api/project";
import * as dayjs from "dayjs";
export default {
  data() {
    return {
      form: {},
      tableList: [],
      dialog: {
        visible: false,
        title: "新建项目",
      },
      dialogform: {},
      params: {
        name: "",
        pageIndex: 1,
        pageSize: 10,
      },
      project: {
        id: undefined,
        name: "",
        persons: "",
      },
    };
  },
  mounted() {
    this.initProject();
    // for (let i = 0; i < 50; i++) {
    //   this.tableList.push({
    //     title: "项目名称",
    //     target: "张三",
    //     createTime: "2022年07月20日",
    //     lastTime: "3分钟前",
    //     lastSetTime: "3分钟前",
    //   });
    // }
    // console.log(this.tableList);
  },
  methods: {
    formatDate(date) {
      if (date) {
        return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
      }
      return "--";
    },
    async initProject() {
      let obj = await GetProjectList(this.params);
      this.tableList = obj.data.data;
    },
    async handleSave() {
      await AddProject(this.project);
      this.dialog.visible = false;
      this.initProject();
    },
    search() {
      // console.log(this.form);
      this.initProject();
    },
    createClick() {
      this.project = {
        id: undefined,
        name: "",
        persons: "",
      };
      this.dialog.visible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    async jisuan(row) {
      const loading = this.$loading({
        lock: true,
        text: "正在计算。。。",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      await CalcProject(row.id);
      loading.close();
      this.$message.success("计算完成");
    },
    weihu(row) {
      let query = {};
      for (let q in this.$route.query) {
        if (q != "id") {
          query[q] = this.$route.query[q];
        }
      }
      query.id = row.id;
      this.$router.push({ path: "/importfile", query: query });
    },
    fenxi(row) {
      let query = {};
      for (let q in this.$route.query) {
        query[q] = this.$route.query[q];
      }
      query.id = row.id;
      this.$router.push({ path: "/relationship", query: query });
    },
  },
};
</script>

<style lang="scss" scoped>
.item-class {
  width: 100%;
  height: 100%;
  padding: 10px;
  .search-class {
    display: flex;
    align-items: center;
    height: 40px;
  }
}
</style>
