<template>
  <div class="table-public">
    <el-row style="width: 100%; height: 40px" v-if="tableName == '公安数据-亲属关系'">
      <el-col :span="2">
        <el-select v-model="form.id1" placeholder="请选择" size="mini">
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
        <el-select v-model="form.id2" placeholder="请选择" size="mini">
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
    <el-table
      :data="tableList"
      width="100%"
      :height="tableName == '公安数据-亲属关系' ? 'calc(100% - 40px)' : '100%'"
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
      <el-table-column
        v-for="(item, index) in headerList"
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
      <el-table-column label="操作" width="120" fixed="right">
        <template slot-scope="scope">
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
            v-if="setIndex != scope.$index"
          >
            修改
          </el-button>
          <el-popconfirm
            title="这是一段内容确定删除吗？"
            @onConfirm="deleteRow(scope.row, scope.$index)"
          >
            <el-button slot="reference" type="text"> 删除 </el-button>
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
            <el-button
              type="text"
              @click="companySaveRow(scope.row, scope.$index)"
              v-if="scope.$index === companyDialog.setIndex"
            >
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
  </div>
</template>

<script>
import {
  // 1
  getBankList,
  updateBank,
  deleteBank,
  // 2
  getMhlgjlList,
  updateMhlgjl,
  deleteMhlgjl,
  // 3
  getRydzdaList,
  updateRydzda,
  deleteRydzda,
  // 4
  getMhdpjlList,
  updateMhdpjl,
  deleteMhdpjl,
  // 5
  getQgjsrList,
  updateQgjsr,
  deleteQgjsr,
  // 6
  getTlspxxList,
  updateTlspxx,
  deleteTlspxx,
  // 7
  getQgjdcList,
  updateQgjdc,
  deleteQgjdc,
  // 8
  getLkzsxxList,
  updateLkzsxx,
  deleteLkzsxx,
  // 9
  getCrjzjList,
  updateCrjzj,
  deleteCrjzj,
  // 10
  getQbgjList,
  updateQbgj,
  deleteQbgj,
  // 11
  getJgfrxxList,
  updateJgfrxx,
  deleteJgfrxx,
  // 12
  getCrjjlList,
  updateCrjjl,
  deleteCrjjl,
  // 13
  getJdcwzList,
  updateJdcwz,
  deleteJdcwz,
  // 14
  getYhhcxxList,
  updateYhhcxx,
  deleteYhhcxx,
  // 15
  getRyDzdaFilters,
  getDataTypeRelation,
  getQsgxList,
  addQsgx,
  updateQsgx,
  deleteQsgx,

  // 16
  getZrzybList,
  updateZrzyb,
  deleteZrzyb,

  // 17
  getJylsList,
  updateJyls,
  deleteJyls,

  // 18
  getJrlcList,
  updateJrlc,
  deleteJrlc,

  // 19
  getRmyhzhList,
  updateRmyhzh,
  deleteRmyhzh,
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
  },
  data() {
    return {
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
    };
  },
  mounted() {
    let fullpath = this.$route.fullPath;
    let id = this.getQueryString("id", fullpath);
    this.id = id;
    this.init(id);
  },
  methods: {
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
      if (this.tableName == "银行数据") {
        getBankList({
          pageIndex: 1,
          pageSize: 10000,
          projectId: id,
        }).then((res) => {
          this.tableList = res.data.records;
        });
      } else if (this.tableName == "公安数据-民航离岗记录") {
        getMhlgjlList({
          pageIndex: 1,
          pageSize: 10000,
          projectId: id,
        }).then((res) => {
          this.tableList = res.data.records;
        });
      } else if (this.tableName == "公安数据-人员电子档案") {
        getRydzdaList({
          pageIndex: 1,
          pageSize: 10000,
          projectId: id,
        }).then((res) => {
          this.tableList = res.data.records;
        });
      } else if (this.tableName == "公安数据-民航订票记录") {
        getMhdpjlList({
          pageIndex: 1,
          pageSize: 10000,
          projectId: id,
        }).then((res) => {
          this.tableList = res.data.records;
        });
      } else if (this.tableName == "公安数据-全国驾驶人") {
        getQgjsrList({
          pageIndex: 1,
          pageSize: 10000,
          projectId: id,
        }).then((res) => {
          this.tableList = res.data.records;
        });
      } else if (this.tableName == "公安数据-铁路售票信息") {
        getTlspxxList({
          pageIndex: 1,
          pageSize: 10000,
          projectId: id,
        }).then((res) => {
          this.tableList = res.data.records;
        });
      } else if (this.tableName == "公安数据-全国机动车") {
        getQgjdcList({
          pageIndex: 1,
          pageSize: 10000,
          projectId: id,
        }).then((res) => {
          this.tableList = res.data.records;
        });
      } else if (this.tableName == "公安数据-旅客住宿记录") {
        getLkzsxxList({
          pageIndex: 1,
          pageSize: 10000,
          projectId: id,
        }).then((res) => {
          this.tableList = res.data.records;
        });
      } else if (this.tableName == "公安数据-出入境证件") {
        getCrjzjList({
          pageIndex: 1,
          pageSize: 10000,
          projectId: id,
        }).then((res) => {
          this.tableList = res.data.records;
        });
      } else if (this.tableName == "公安数据-全部轨迹") {
        getQbgjList({
          pageIndex: 1,
          pageSize: 10000,
          projectId: id,
        }).then((res) => {
          this.tableList = res.data.records;
        });
      } else if (this.tableName == "公安数据-机构法人信息") {
        getJgfrxxList({
          pageIndex: 1,
          pageSize: 10000,
          projectId: id,
        }).then((res) => {
          this.tableList = res.data.records;
        });
      } else if (this.tableName == "公安数据-出入境记录") {
        getCrjjlList({
          pageIndex: 1,
          pageSize: 10000,
          projectId: id,
        }).then((res) => {
          this.tableList = res.data.records;
        });
      } else if (this.tableName == "公安数据-机动车违章") {
        getJdcwzList({
          pageIndex: 1,
          pageSize: 10000,
          projectId: id,
        }).then((res) => {
          this.tableList = res.data.records;
        });
      } else if (this.tableName == "公安数据-银行核查信息") {
        getYhhcxxList({
          pageIndex: 1,
          pageSize: 10000,
          projectId: id,
        }).then((res) => {
          this.tableList = res.data.records;
        });
      } else if (this.tableName == "公安数据-亲属关系") {
        getRyDzdaFilters().then((res) => {
          // this.nameList = res.data.records;
          this.nameList = res.data;
        });
        getDataTypeRelation().then((res) => {
          this.relationList = res.data;
        });
        getQsgxList({
          pageIndex: 1,
          pageSize: 10000,
          projectId: id,
        }).then((res) => {
          this.tableList = res.data.records;
        });
      } else if (this.tableName == "资产-自然资源部") {
        getZrzybList({
          pageIndex: 1,
          pageSize: 10000,
          projectId: id,
        }).then((res) => {
          this.tableList = res.data.records;
        });
      } else if (this.tableName == "金融机构-交易流水") {
        getJylsList({
          pageIndex: 1,
          pageSize: 10000,
          projectId: id,
        }).then((res) => {
          this.tableList = res.data.records;
        });
      } else if (this.tableName == "金融机构-金融理财") {
        getJrlcList({
          pageIndex: 1,
          pageSize: 10000,
          projectId: id,
        }).then((res) => {
          this.tableList = res.data.records;
        });
      } else if (this.tableName == "中国人民银行-银行账户") {
        getRmyhzhList({
          pageIndex: 1,
          pageSize: 10000,
          projectId: id,
        }).then((res) => {
          this.tableList = res.data.records;
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
      addQsgx(form).then((res) => {
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
      if (this.tableName == "银行数据") {
        updateBank(this.setRowList).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-民航离岗记录") {
        updateMhlgjl(this.setRowList).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-人员电子档案") {
        updateRydzda(this.setRowList).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-民航订票记录") {
        updateMhdpjl(this.setRowList).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-全国驾驶人") {
        updateQgjsr(this.setRowList).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-铁路售票信息") {
        updateTlspxx(this.setRowList).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-全国机动车") {
        updateQgjdc(this.setRowList).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-旅客住宿记录") {
        updateLkzsxx(this.setRowList).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-出入境证件") {
        updateCrjzj(this.setRowList).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-全部轨迹") {
        updateQbgj(this.setRowList).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-机构法人信息") {
        updateJgfrxx(this.setRowList).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-出入境记录") {
        updateCrjjl(this.setRowList).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-机动车违章") {
        updateJdcwz(this.setRowList).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-银行核查信息") {
        updateYhhcxx(this.setRowList).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-亲属关系") {
        updateQsgx(this.setRowList).then((res) => {
          this.init();
        });
      } else if (this.tableName == "资产-自然资源部") {
        updateZrzyb(this.setRowList).then((res) => {
          this.init();
        });
      } else if (this.tableName == "金融机构-交易流水") {
        updateJyls(this.setRowList).then((res) => {
          this.init();
        });
      } else if (this.tableName == "金融机构-金融理财") {
        updateJrlc(this.setRowList).then((res) => {
          this.init();
        });
      } else if (this.tableName == "中国人民银行-银行账户") {
        updateRmyhzh(this.setRowList).then((res) => {
          this.init();
        });
      }
      this.setIndex = -1;
      this.setRowList = {};
    },
    deleteRow(row, index) {
      // this.tableList.splice(index, 1);
      if (this.tableName == "银行数据") {
        deleteBank(row.id).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-民航离岗记录") {
        deleteMhlgjl(row.id).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-人员电子档案") {
        deleteRydzda(row.id).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-民航订票记录") {
        deleteMhdpjl(row.id).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-全国驾驶人") {
        deleteQgjsr(row.id).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-铁路售票信息") {
        deleteTlspxx(row.id).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-全国机动车") {
        deleteQgjdc(row.id).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-旅客住宿记录") {
        deleteLkzsxx(row.id).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-出入境证件") {
        deleteCrjzj(row.id).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-全部轨迹") {
        deleteQbgj(row.id).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-机构法人信息") {
        deleteJgfrxx(row.id).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-出入境记录") {
        deleteCrjjl(row.id).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-机动车违章") {
        deleteJdcwz(row.id).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-银行核查信息") {
        deleteYhhcxx(row.id).then((res) => {
          this.init();
        });
      } else if (this.tableName == "公安数据-亲属关系") {
        deleteQsgx(row.id).then((res) => {
          this.init();
        });
      } else if (this.tableName == "资产-自然资源部") {
        deleteZrzyb(row.id).then((res) => {
          this.init();
        });
      } else if (this.tableName == "金融机构-交易流水") {
        deleteJyls(row.id).then((res) => {
          this.init();
        });
      } else if (this.tableName == "金融机构-金融理财") {
        deleteJrlc(row.id).then((res) => {
          this.init();
        });
      } else if (this.tableName == "中国人民银行-银行账户") {
        deleteRmyhzh(row.id).then((res) => {
          this.init();
        });
      }
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
</style>
