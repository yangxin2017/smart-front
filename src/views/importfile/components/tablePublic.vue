<template>
  <div class="table-public">
    <el-row style="width: 100%; height: 40px" v-if="tableName == '公安数据-亲属关系'">
      <el-col :span="2">
        <el-select v-model="form.id1" placeholder="请选择" size="mini" filterable>
          <el-option
            v-for="item in nameList"
            :key="'id1_' + item.id"
            :label="item.xm"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-select v-model="form.gx" placeholder="请选择" size="mini">
          <el-option v-for="item in relationList" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-select v-model="form.id2" placeholder="请选择" size="mini" filterable>
          <el-option
            v-for="item in nameList"
            :key="'id2_' + item.id"
            :label="item.xm"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="1">
        <el-button type="primary" size="mini" @click="addQsgxClick">新增</el-button>
      </el-col>
    </el-row>
    <div class="search-class" v-if="formJson.option.length > 0">
      <div v-for="(item, index) in formJson.option" class="col-class">
        {{ item.label }}：
        <el-input
          v-if="item.type == 'input'"
          v-model="formJson.form[item.prop]"
          placeholder="请输入"
          size="mini"
          style="width: 140px"
        />
        <el-select
          v-if="item.type == 'select'"
          v-model="formJson.form[item.prop]"
          placeholder="请选择"
          size="mini"
          style="width: 140px"
        >
          <el-option
            v-for="option in item.options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          >
          </el-option>
        </el-select>
      </div>
      <el-button type="primary" size="mini" @click="init()">查询</el-button>
    </div>
    <el-table
      :data="tableList"
      width="100%"
      :height="
        tableName == '公安数据-亲属关系'
          ? 'calc(100% - 72px)'
          : tableName == '银行数据' || tableName == '公安数据-人员电子档案'
          ? 'calc(100% - 82px)'
          : 'calc(100% - 32px)'
      "
    >
      <el-table-column
        label="头像照片"
        width="120"
        v-if="tableName == '公安数据-人员电子档案'"
      >
        <template slot-scope="scope">
          <div class="pic-avatar">
            <el-image
              v-if="scope.row.txzp"
              style="width: 60px; height: 60px"
              :preview-src-list="['/ai/webfile/' + scope.row.txzp]"
              :src="'/ai/webfile/' + scope.row.txzp"
            ></el-image>
            <el-upload
              :before-upload="handleExceed"
              :action="`/ai/file/upload/?userId=${scope.row.id}`"
              :on-success="
                (res) => {
                  return handleSuccess(res, scope.row);
                }
              "
              :limit="1"
              :show-file-list="false"
            >
              <el-button size="mini" type="primary">点击上传</el-button>
            </el-upload>
          </div>
        </template>
      </el-table-column>
      <template v-if="rowList.detailed">
        <template v-for="(item, index) in headerList">
          <el-table-column
            v-if="item.row"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            min-width="200"
          >
            <template slot-scope="scope">
              <span v-if="setIndex != scope.$index || !item.modifiable">
                {{ scope.row[item.prop] }}
              </span>
              <el-input v-else v-model="setRowList[item.prop]" size="mini"></el-input>
            </template>
          </el-table-column>
        </template>
      </template>
      <template v-if="!rowList.detailed">
        <template v-for="(item, index) in headerList">
          <el-table-column :label="item.label" :prop="item.prop" min-width="200">
            <template slot-scope="scope">
              <span v-if="setIndex != scope.$index || !item.modifiable">
                {{ scope.row[item.prop] }}
              </span>
              <el-input v-else v-model="setRowList[item.prop]" size="mini"></el-input>
            </template>
          </el-table-column>
        </template>
      </template>
      <el-table-column label="操作" width="140" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="openRow(scope.row, scope.$index)"
            v-if="tableName != '公安数据-亲属关系'"
          >
            查看
          </el-button>

          <el-button
            type="text"
            @click="saveRow(scope.row, scope.$index)"
            v-if="setIndex === scope.$index"
          >
            保存
          </el-button>

          <el-button
            type="text"
            @click="setRow(scope.row, scope.$index)"
            v-if="setIndex != scope.$index && tableName != '公安数据-亲属关系'"
          >
            修改
          </el-button>
          <el-popconfirm
            title="这是一段内容确定删除吗？"
            @onConfirm="deleteRow(scope.row, scope.$index)"
          >
            <el-button style="margin-left: 10px" slot="reference" type="text">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column
        label="目标人物"
        width="150"
        v-if="tableName == '公安数据-人员电子档案'"
      >
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.sfMbr" @change="handleChangeMBR(scope.row)"
            >设为目标人</el-checkbox
          >
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

    <el-dialog
      title="维护公司参股信息"
      :visible.sync="companyDialog.dialog"
      width="40%"
      :before-close="handleClose"
    >
      <div class="add-class">
        <el-button type="primary" size="mini" @click="addClick">增加</el-button>
      </div>
      <el-table :data="companyDialog.tableList" width="100%" height="300">
        <el-table-column label="公司名称" prop="name">
          <template slot-scope="scope">
            <span v-if="scope.$index != companyDialog.setIndex">
              {{ scope.row.name }}
            </span>
            <el-input
              v-else
              size="mini"
              v-model="companyDialog.setRow.name"
              placeholder="请输入公司名称"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="股份占比" prop="shares">
          <template slot-scope="scope">
            <span v-if="scope.$index != companyDialog.setIndex">
              {{ scope.row.shares }}
            </span>
            <el-input
              v-else
              size="mini"
              v-model="companyDialog.setRow.shares"
              placeholder="请输入股份占比"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="职位" prop="position">
          <template slot-scope="scope">
            <span v-if="scope.$index != companyDialog.setIndex">
              {{ scope.row.position }}
            </span>
            <el-input
              v-else
              size="mini"
              v-model="companyDialog.setRow.position"
              placeholder="请输入职位"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="companySaveRow(scope.row, scope.$index)">
              保存
            </el-button>
            <el-button
              type="text"
              @click="companySetRow(scope.row, scope.$index)"
              v-if="scope.$index != companyDialog.setIndex"
            >
              修改
            </el-button>
            <el-button type="text" @click="companyDeleteRow(scope.row, scope.$index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="companyDialog.dialog = false">取 消</el-button>
        <el-button type="primary" @click="companyDialog.dialog = false">
          确 定
        </el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="详细信息"
      :visible.sync="setRowDialog"
      width="50%"
      :before-close="handleClose"
    >
      <el-row class="dialog-row">
        <template v-for="(item, index) in headerList">
          <el-col :span="4" style="margin: 5px 0" align="right"
            >{{ item.label }}：</el-col
          >
          <el-col :span="8" style="margin: 5px 0">
            <el-input
              v-if="item.modifiable"
              v-model="dialogList[item.prop]"
              size="mini"
              style="width: 100%"
            ></el-input>
            <span v-else>{{ dialogList[item.prop] }}</span>
          </el-col>
        </template>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRowDialog = false">关 闭</el-button>
        <el-button type="primary" @click="saveRowDialog"> 保 存 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  // all
  getList,
  setList,
  deleteList,
  // 亲属关系
  getRyDzdaFilters,
  getDataTypeRelation,
  addQsgx,
} from "@/api/public";
import { UpdateMBR } from "@/api/project";
export default {
  props: {
    tableName: {
      type: String,
      default: "",
    },
    headerList: {
      type: Array,
      default: [],
    },
    rowList: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      setRowDialog: false,
      pageList: {
        pageSizes: [10, 50, 100, 500, 10000],
        pageSize: 10,
        pageIndex: 1,
        total: 0,
      },
      tableHeader: [
        {
          label: "姓名",
          prop: "name",
        },
        {
          label: "性别",
          prop: "sex",
        },
        {
          label: "证件类型",
          prop: "cardType",
        },
        {
          label: "证件号码",
          prop: "cardNumber",
        },
      ],
      tableList: [],
      setRowList: {},
      setIndex: -1,
      companyDialog: {
        dialog: false,
        index: -1,
        tableList: [],
        setRow: {},
        setIndex: -1,
      },
      form: {},
      nameList: [],
      // 关系列表
      relationList: [],

      id: -1,

      dialogList: {},
      formJson: {
        form: {},
        option: {},
      },
    };
  },
  mounted() {
    if (this.rowList.form) {
      this.formJson.option = this.rowList.form;
    }
    let fullpath = this.$route.fullPath;
    let id = this.getQueryString("id", fullpath);
    this.id = id;
    this.init(id);

    // 监听回车事件
    document.onkeydown = (e) => {
      if (e.keyCode == 13) {
        this.init();
      }
    };
  },
  methods: {
    saveRowDialog() {
      setList(this.rowList.setUrl, this.dialogList).then((res) => {
        this.init();
        this.dialogList = {};
        this.setRowDialog = false;
        this.$message.success("修改成功！");
      });
    },
    openRow(item, index) {
      this.dialogList = JSON.parse(JSON.stringify(item));
      this.setRowDialog = true;
    },
    handleSizeChange(val) {
      this.pageList.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.pageList.pageIndex = val;
      this.init();
    },
    getQueryString(name, fullpath) {
      let arr = fullpath.split("?");
      let params = arr[1].split("&");
      let res = "";
      for (let p of params) {
        let aps = p.split("=");
        if (aps[0] == name) {
          res = aps[1];
        }
      }
      return res;
    },
    handleExceed(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png";

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 或者 PNG 格式!");
      }
      return isJPG;
    },
    handleSuccess(res, row) {
      console.log(res, row);
      this.$message.success("上传成功");
      row.txzp = res.data;
    },
    async handleChangeMBR(row) {
      await UpdateMBR(row.id, row.sfMbr);
    },
    init(id) {
      if (!id) {
        id = this.id;
      }
      let form = this.formJson.form;
      form.pageIndex = this.pageList.pageIndex;
      form.pageSize = this.pageList.pageSize;
      form.projectId = id;
      getList(this.rowList.getUrl, form).then((res) => {
        this.tableList = res.data.records;
        this.pageList.total = res.data.total;
      });
      if (this.tableName == "公安数据-亲属关系") {
        getRyDzdaFilters().then((res) => {
          // this.nameList = res.data.records;
          this.nameList = res.data;
        });
        getDataTypeRelation().then((res) => {
          this.relationList = res.data;
        });
      }
    },
    addQsgxClick() {
      let form = this.form;
      let nameList1 = this.nameList.filter((item) => {
        return item.id == form.id1;
      });
      form.sfzh1 = nameList1[0].sfzh;
      form.xm1 = nameList1[0].xm;
      let nameList2 = this.nameList.filter((item) => {
        return item.id == form.id2;
      });
      form.sfzh2 = nameList2[0].sfzh;
      form.xm2 = nameList2[0].xm;

      form.projectId = this.id;
      form.groupId = 0;
      form.userId = 0;
      addQsgx(form, this.id).then((res) => {
        this.init();
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.companyDialog.tableList = [];
          this.companyDialog.setRow = {};
          this.companyDialog.setIndex = -1;

          this.setRowDialog = false;
        })
        .catch((_) => {});
    },
    maintain(row, index) {
      this.companyDialog.index = index;
      this.companyDialog.tableList = JSON.parse(JSON.stringify(row.company));
      this.companyDialog.dialog = true;
    },
    companySetRow(row, index) {
      this.companyDialog.setRow = {};
      // 解除双向绑定
      this.companyDialog.setRow = {
        ...row,
      };
      this.companyDialog.setIndex = index;
    },
    companySaveRow(row, index) {
      this.companyDialog.tableList[index] = {
        ...this.companyDialog.setRow,
      };
      this.tableList[this.companyDialog.index].company = this.companyDialog.tableList;
      this.companyDialog.setIndex = -1;
      this.companyDialog.setRow = {};
    },
    companyDeleteRow(row, index) {
      this.companyDialog.tableList.splice(index, 1);
    },
    addClick() {
      this.companyDialog.setRow = {};
      this.companyDialog.tableList.push({
        name: "",
        shares: "",
        position: "",
      });
      this.companyDialog.setIndex = this.companyDialog.tableList.length - 1;
    },
    setRow(row, index) {
      this.setRowList = {};
      this.setRowList = {
        ...row,
      };
      this.setIndex = index;
    },
    saveRow(row, index) {
      this.tableList[index] = {
        ...this.setRowList,
      };
      setList(this.rowList.setUrl, this.setRowList).then((res) => {
        this.init();
      });
      this.setIndex = -1;
      this.setRowList = {};
    },
    deleteRow(row, index) {
      deleteList(this.rowList.deleteUrl, row.id).then((res) => {
        this.init();
      });
    },

    // 上传照片
    photoUp(row, index) {
      console.log(row, index);
    },
    // 预览
    seeTo(row, index) {
      console.log(row, index);
    },
  },
};
</script>

<style lang="scss" scoped>
.table-public {
  width: 100%;
  height: 100%;
  .search-class {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 50px;
    .col-class {
      margin-right: 10px;
    }
  }
  .add-class {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
.pic-avatar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.page-class {
  display: flex;
  align-items: center;
  justify-content: center;
}
.dialog-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}
</style>
