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

    <el-table :data="tableList" width="100%" height="calc(100% - 70px)" v-loading="loading">
      <el-table-column label="项目名称" prop="name">
        <template slot-scope="scope">
          <el-button type="text" @click="mbrxx(scope.row)">{{ scope.row.name }}</el-button>
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
          <!-- <el-button type="text" size="mini" @click="weihu(scope.row)">
            数据维护
          </el-button> -->
          <el-button type="text" size="mini" @click="mbrxx(scope.row)">
            目标人信息
          </el-button>
          <!-- 可视分析 -->
          <el-button type="text" size="mini" @click="fenxi(scope.row)">
            可视分析
          </el-button>
          <el-button type="text" size="mini" @click="fenxi2(scope.row)">
            可视分析(精简)
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="page-class">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="pageList.pageSizes"
        :page-size="pageList.pageSize"
        layout="sizes, prev, pager, next, jumper"
        :total="pageList.total"
      >
      </el-pagination>
    </div>

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
      pageList: {
        pageSizes: [10, 50, 100, 500, 10000],
        pageSize: 10,
        pageIndex: 1,
        total: 0,
      },
      project: {
        id: undefined,
        name: "",
        persons: "",
      },
      loading: false
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
    handleSizeChange(val) {
      this.pageList.pageSize = val;
      this.initProject();
    },
    handleCurrentChange(val) {
      this.pageList.pageIndex = val;
      this.initProject();
    },
    formatDate(date) {
      if (date) {
        return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
      }
      return "--";
    },
    async initProject() {
      this.loading = true
      this.params.pageIndex = this.pageList.pageIndex;
      this.params.pageSize = this.pageList.pageSize;
      let obj = await GetProjectList(this.params);
      this.pageList.total = obj.data.total;
      this.tableList = obj.data.data;
      this.loading = false
    },
    async handleSave() {
      await AddProject(this.project);
      this.dialog.visible = false;
      this.initProject();
    },
    search() {
      // console.log(this.form);
      this.pageList.pageIndex = 1;
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
    fenxi2(row) {
      let query = {};
      for (let q in this.$route.query) {
        query[q] = this.$route.query[q];
      }
      query.id = row.id;
      this.$router.push({ path: "/simpleShip", query: query });
    },
    mbrxx(row) {
      console.log(row);
      let query = {};
      for (let q in this.$route.query) {
        query[q] = this.$route.query[q];
      }
      query.id = row.id;
      this.$router.push({ path: "/mbrxx", query: query });
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
.page-class {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
