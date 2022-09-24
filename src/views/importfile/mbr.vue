<template>
  <div class="mbr-class">
    <div class="top-row">
      <el-button type="primary" size="mini" @click="weihu()"
        >导入数据</el-button
      >
      <el-select
        v-model="allSelect"
        filterable
        placeholder="请选择"
        multiple
        collapse-tags
        size="mini"
        style="margin-left: 10px"
      >
        <el-option
          v-for="item in allPeople"
          :key="item.id"
          :label="item.xm"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-button type="primary" size="mini" @click="savembr()">确认</el-button>
    </div>
    <div class="table-class">
      <el-table :data="tableData" style="width: 100%" height="100%">
        <el-table-column prop="xm" label="目标人"> </el-table-column>
        <el-table-column prop="date" label="年龄">
          <template slot-scope="scope">
            {{ getAge(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column prop="xb" label="性别"> </el-table-column>
        <el-table-column prop="sfzh" label="身份证号"> </el-table-column>
        <el-table-column label="单位">
          <template slot-scope="scope">
            <div
              v-for="item in scope.row.gs"
              :key="item.qyjgmc"
              style="height: 20px"
            >
              {{ item.qyjgmc }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="职务">
          <template slot-scope="scope">
            <div
              v-for="item in scope.row.gs"
              :key="item.zw"
              style="height: 20px"
            >
              {{ item.zw }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="房产">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="opendialog(scope.row, 'fdcq', '房产')"
            >
              {{ scope.row.fdcq ? scope.row.fdcq.length : 0 }}套>>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="银行卡">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="opendialog(scope.row, 'yhk', '银行卡')"
            >
              {{ scope.row.yhk ? scope.row.yhk.length : 0 }}张>>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="抵押贷款">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="opendialog(scope.row, 'dyq', '抵押贷款')"
            >
              {{ getDydk(scope.row) }}>>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="累计缴纳保费">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="opendialog(scope.row, 'bxbd', '累计缴纳保费')"
            >
              {{ getBf(scope.row) }}>>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="累计理财金额">
          <template slot-scope="scope">
            <el-button type="text" size="mini"> 累计理财金额>> </el-button>
          </template>
        </el-table-column>
        <el-table-column label="证券信息">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="opendialog(scope.row, 'cyxx', '证券信息')"
            >
              证券信息
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="亲属关系">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="opendialog(scope.row, 'qsgx', '亲属关系')"
            >
              亲属关系
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="密切人">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="opendialog(scope.row, 'mqr', '密切人')"
            >
              密切人
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="dialog-class" v-if="dialog.show">
      <i class="el-icon-close close-button" @click="dialog.show = false"></i>
      <div class="dialog-title">{{ dialog.title }}</div>
      <div class="dialog-table-class">
        <el-table :data="dialogData" style="width: 100%" height="100%">
          <el-table-column
            v-for="(item, index) in headerData"
            :prop="item.prop"
            :label="item.label"
            :key="index"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getMbrDataList, getMbrDataAllPeople, saveMbrDataMbr } from "@/api/mbr";
export default {
  data() {
    return {
      projectId: -1,
      tableData: [],

      dialog: {
        show: false,
        title: "房产信息",
      },
      dialogData: [],
      headerData: [],
      headerDataList: {
        fdcq: [
          {
            label: "不动产单元号",
            prop: "bdcdyh",
          },
          {
            label: "房地坐落",
            prop: "fdzl",
          },
          {
            label: "建筑面积(平方米)",
            prop: "jzmjpfm",
          },
          {
            label: "共有情况",
            prop: "gyqk",
          },
          {
            label: "房产估值",
            prop: "fcgz",
          },
          {
            label: "均价",
            prop: "jj",
          },
        ],
        yhk: [
          {
            label: "银行",
            prop: "fkdw",
          },
          {
            label: "卡号",
            prop: "kh",
          },
          {
            label: "账号类别",
            prop: "zhlb",
          },
          {
            label: "可用余额",
            prop: "kyye",
          },
        ],
        qsgx: [
          {
            label: "关系",
            prop: "gx",
          },
          {
            label: "姓名",
            prop: "xm2",
          },
          {
            label: "证件号码",
            prop: "sfzh2",
          },
        ],
        mqr: [
          {
            label: "关系",
            prop: "gx",
          },
          {
            label: "姓名",
            prop: "xm2",
          },
          {
            label: "证件号码",
            prop: "sfzh2",
          },
        ],
        dyq: [
          {
            label: "抵押类型",
            prop: "dyfs",
          },
          {
            label: "被担保主债权数额(万元)",
            prop: "bdbzzqse",
          },
          {
            label: "债务履行起始时间",
            prop: "zwlxqssj",
          },
          {
            label: "债务履行结束时间",
            prop: "zwlxjssj",
          },
        ],
        bxbd: [
          {
            label: "保险产品名称",
            prop: "bxcpmc",
          },
          {
            label: "保单号",
            prop: "bdh",
          },
          {
            label: "保险公司",
            prop: "bxgsmc",
          },
          {
            label: "累计缴纳保费",
            prop: "ljjnbf",
          },
        ],
        cyxx: [
          {
            label: "市场类型",
            prop: "sclx",
          },
          {
            label: "证券账户",
            prop: "zqzh",
          },
          {
            label: "证券代码",
            prop: "zqdm",
          },
          {
            label: "证券简称",
            prop: "zqjc",
          },
          {
            label: "持有数量",
            prop: "cysl",
          },
          {
            label: "当日收盘价",
            prop: "drspj",
          },
          // {
          //   label: "总价值",
          //   prop: "zjz",
          // },
        ],
      },

      allPeople: [],
      allSelect: [],
    };
  },
  mounted() {
    this.projectId = this.$route.query.id;
    this.init();
  },
  methods: {
    init() {
      getMbrDataList({ projectId: this.projectId }).then((res) => {
        this.tableData = res.data;
      });
      getMbrDataAllPeople({ projectId: this.projectId }).then((res) => {
        this.allPeople = res.data;
        for (let i of res.data) {
          if (i.sfMbr == "1") {
            this.allSelect.push(i.id);
          }
        }
      });
    },
    weihu() {
      let query = {
        id: this.$route.query.id,
      };
      this.$router.push({ path: "/importfile", query: query });
    },
    opendialog(row, id, title) {
      this.dialogData = row[id];
      this.$set(this.dialog, "title", title + "详细信息");
      this.headerData = this.headerDataList[id];
      this.$set(this.dialog, "show", true);
    },
    savembr() {
      saveMbrDataMbr({
        projectId: this.projectId,
        idLists: this.allSelect,
      }).then((res) => {
        this.$message.success("保存成功");
        this.init();
      });
    },
    getAge(row) {
      let birth = row.csrq;
      return birth
        ? new Date().getFullYear() - new Date(birth).getFullYear()
        : "未知";
    },
    getDydk(row) {
      let zqse = 0;
      for (let i of row.dyq) {
        zqse += parseFloat(i.bdbzzqse);
      }
      return zqse.toFixed(2);
    },
    getBf(row) {
      let bf = 0;
      for (let i of row.bxbd) {
        if (parseFloat(i.ljjnbf)) {
          bf += parseFloat(i.ljjnbf);
        }
      }
      return bf.toFixed(2);
    },
  },
};
</script>

<style lang="scss" scoped>
.mbr-class {
  width: 100%;
  height: 100%;
  padding: 10px;
  .top-row {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .table-class {
    width: 100%;
    height: calc(100% - 50px);
  }

  .dialog-class {
    width: 90%;
    height: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    z-index: 100;
    border-radius: 5px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    .close-button {
      position: absolute;
      top: 16px;
      right: 20px;
      font-size: 20px;
      cursor: pointer;
    }
    .dialog-title {
      width: 100%;
      height: 49px;
      border-radius: 5px 5px 0 0;
      color: #555;
      display: flex;
      align-items: center;
      text-indent: 1em;
      font-size: 20px;
      font-weight: 900;
      border-bottom: 1px solid #ccc;
    }
    .dialog-table-class {
      width: 100%;
      height: calc(100% - 50px);
      padding: 10px;
    }
  }
}
</style>
