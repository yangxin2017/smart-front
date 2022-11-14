<template>
  <div class="mbr-class">
    <div v-if="dialog_mqr == -1" style="height: 100%;">
      <div class="top-row">
        <el-button type="primary" size="mini" @click="weihu()">导入数据</el-button>
        <el-select
          v-model="allSelect"
          filterable
          placeholder="请选择目标人"
          
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

        <el-button style="margin: 0 10px;" type="primary" size="mini" @click="savembr()">确认</el-button>

        <el-button type="primary" size="mini" @click="handleAddPerson()">添加人信息</el-button>

        <div style="flex: 1">
        <el-button type="primary" size="mini" @click="handleGoback()" style="float:right;">返回</el-button>
        </div>
      </div>
      <div class="table-class">
        <el-table :data="tableData" style="width: 100%" height="100%">
          <el-table-column prop="xm" label="目标人">
            <template slot-scope="scope">
              <el-button type="text" @click="showDetail(scope.row)">{{ scope.row.xm }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="年龄">
            <template slot-scope="scope">
              {{ getAge(scope.row) }}
            </template>
          </el-table-column>
          <el-table-column prop="xb" label="性别"> </el-table-column>
          <el-table-column prop="sfzh" label="身份证号"> </el-table-column>
          <el-table-column label="单位（职务）">
            <template slot-scope="scope">
              <div class="hovershow" :title="scope.row.gsstr" style="height: 20px;overflow: hidden;">
                <div v-for="item in scope.row.gs" :key="item.qyjgmc" style="height: 20px">
                  {{ item.qyjgmc }}（{{ item.zw }}）
                </div>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column label="职务">
            <template slot-scope="scope">
              <div v-for="item in scope.row.gs" :key="item.zw" style="height: 20px">
                {{ item.zw }}
              </div>
            </template>
          </el-table-column> -->
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
          <el-table-column label="抵押贷款（万元）">
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
          <el-table-column label="累计缴纳保费（万元）">
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
          <el-table-column
            label="操作"
            width="230">
            <template slot-scope="scope">
              <el-button @click="handleEditMqr(scope.row)" size="small">密切人管理</el-button>
              <el-button @click="handleEditRY(scope.row)" size="small">人员管理</el-button>
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
      <add-person-dialog ref="refAddPerson" @eventAdded="init"></add-person-dialog>
      <detal-dialog ref="refDetailDialog"></detal-dialog>

      <el-divider></el-divider>

      <div class="top-row">
        <el-select
          v-model="allSelectFXDX"
          filterable
          placeholder="请选择分析对象（可多选）"
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

        <el-button style="margin: 0 10px;" type="primary" size="mini" @click="saveFxdx()">确认</el-button>

      </div>

      
      <div class="table-class">
        <el-table :data="tableDataFxdx" style="width: 100%" height="100%">
          <el-table-column prop="xm" label="分析对象">
            <template slot-scope="scope">
              <el-button type="text" @click="showDetail(scope.row)">{{ scope.row.xm }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="年龄">
            <template slot-scope="scope">
              {{ getAge(scope.row) }}
            </template>
          </el-table-column>
          <el-table-column prop="xb" label="性别"> </el-table-column>
          <el-table-column prop="sfzh" label="身份证号"> </el-table-column>
          <el-table-column label="单位（职务）">
            <template slot-scope="scope">
              <div class="hovershow" :title="scope.row.gsstr" style="height: 20px;overflow: hidden;">
                <div v-for="item in scope.row.gs" :key="item.qyjgmc" style="height: 20px">
                  {{ item.qyjgmc }}（{{ item.zw }}）
                </div>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column label="职务">
            <template slot-scope="scope">
              <div v-for="item in scope.row.gs" :key="item.zw" style="height: 20px">
                {{ item.zw }}
              </div>
            </template>
          </el-table-column> -->
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
          <el-table-column label="抵押贷款（万元）">
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
          <el-table-column label="累计缴纳保费（万元）">
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
    </div>
    <template v-if="dialog_mqr == 1">
      <el-button type="primary" size="mini" class="rest-button" @click="handleCloseMQR" style="float:right;z-index:999;position:absolute;right:10px;">
        关闭
      </el-button>
      <tablePublic :tableName="tableName_mqr" :headerList="headerList_mqr" :rowList="rowList_mqr" />
    </template>

  </div>
</template>

<script>
import { getMbrDataList, getMbrDataAllPeople, saveMbrDataMbr, saveFxdxData, getFxdxDataList } from "@/api/mbr";
import AddPersonDialog from './components/addPersonDialog.vue'
import DetalDialog from './components/detailDialog.vue'
import tablePublic from "./components/tablePublic";
export default {
  components: {
    AddPersonDialog,
    DetalDialog,
    tablePublic
  },
  data() {
    return {
      projectId: -1,
      tableData: [],
      tableDataFxdx: [],

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
            label: "姓名",
            prop: "xm1",
          },
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
      allSelect: '',

      allSelectFXDX: [],

      dialog_mqr: -1,
      tableName_mqr: "",
      headerList_mqr: [],
      rowList_mqr: {},
    };
  },
  mounted() {
    // this.projectId = this.$route.query.id;
    // let id = this.getUrlParam("id");
    // if (this.projectId != id) {
    //   this.projectId = id;
    // }
    this.projectId = this.getUrlParam("id");
    this.init();
  },
  methods: {
    handleEditMqr(rw) {
      let item = {
        "title": "公安数据-亲属关系",
        "upfile": true,
        "outfile": true,
        "download": true,
        "alldata": true,
        "removedata": true,
        "getUrl": "/qsgx/list",
        "setUrl": "/qsgx/update",
        "deleteUrl": "/qsgx/delete/",
        "downloadUrl": "/ai/qsgx/export",
        "action": "/ai/qsgx/upload",
        "remove": "/qsgx/remove",
        "bid": 10,
        "template": "/downFile/亲属关系.xlsx",
        "headerList": [
          {
              "label": "姓名",
              "prop": "xm1"
          },
          {
              "label": "关系",
              "prop": "gx"
          },
          {
              "label": "证件号码",
              "prop": "sfzh1"
          },
          {
              "label": "姓名",
              "prop": "xm2"
          },
          {
              "label": "证件号码",
              "prop": "sfzh2"
          }
        ]
      }
      this.rowList_mqr = item;
      this.tableName_mqr = item.title;
      this.headerList_mqr = item.headerList;
      this.dialog_mqr = 1
    },
    handleEditRY() {
      let item = {
        "title": "公安数据-人员电子档案",
        "upfile": true,
        "outfile": true,
        "download": true,
        "alldata": true,
        "removedata": true,
        "getUrl": "/rydzda/list",
        "setUrl": "/rydzda/update",
        "deleteUrl": "/rydzda/delete/",
        "downloadUrl": "/ai/rydzda/export",
        "action": "/ai/rydzda/upload",
        "remove": "/rydzda/remove",
        "bid": 4,
        "template": "/downFile/公安情报信息模块-人员电子档案.xlsx",
        "detailed": true,
        "form": [
            {
                "type": "input",
                "label": "姓名",
                "prop": "xm"
            },
            {
                "type": "input",
                "label": "身份证号码",
                "prop": "sfzhm"
            }
        ],
        "headerList": [
            {
                "label": "公民身份证号",
                "modifiable": true,
                "row": true,
                "prop": "sfzh"
            },
            {
                "label": "姓名",
                "modifiable": true,
                "row": true,
                "prop": "xm"
            },
            {
                "label": "性别",
                "modifiable": true,
                "row": true,
                "prop": "xb"
            },
            {
                "label": "民族",
                "modifiable": true,
                "row": true,
                "prop": "mz"
            },
            {
                "label": "户籍地",
                "modifiable": true,
                "prop": "hjd"
            },
            {
                "label": "户籍地区划",
                "modifiable": true,
                "prop": "hjdqh"
            },
            {
                "label": "户籍地派出所",
                "modifiable": true,
                "prop": "hjdpcs"
            },
            {
                "label": "出生日期",
                "modifiable": true,
                "row": true,
                "prop": "csrq"
            },
            {
                "label": "曾用名",
                "modifiable": true,
                "prop": "cym"
            },
            {
                "label": "出生地",
                "modifiable": true,
                "prop": "csd"
            },
            {
                "label": "籍贯",
                "modifiable": true,
                "prop": "jg"
            },
            {
                "label": "身高",
                "modifiable": true,
                "prop": "sg"
            },
            {
                "label": "职业",
                "modifiable": true,
                "prop": "zy"
            },
            {
                "label": "出生地国家",
                "modifiable": true,
                "prop": "csdgj"
            },
            {
                "label": "出生地区划",
                "modifiable": true,
                "prop": "csdqh"
            },
            {
                "label": "籍贯国家",
                "modifiable": true,
                "prop": "jggj"
            },
            {
                "label": "服务处所",
                "modifiable": true,
                "prop": "fwcs"
            },
            {
                "label": "兵役状况",
                "modifiable": true,
                "prop": "byzk"
            },
            {
                "label": "文化程度",
                "modifiable": true,
                "prop": "whcd"
            },
            {
                "label": "婚姻状况",
                "modifiable": true,
                "prop": "hyzk"
            },
            {
                "label": "死亡日期",
                "modifiable": true,
                "prop": "swrq"
            }
        ]
      }
      this.rowList_mqr = item;
      this.tableName_mqr = item.title;
      this.headerList_mqr = item.headerList;
      this.dialog_mqr = 1
    },
    handleCloseMQR() {
      this.dialog_mqr = -1
      this.init()
    },
    handleGoback() {
      this.$router.push({ path: '/itemquery' })
    },
    showDetail(rw) {
      this.$refs.refDetailDialog.dy_show(rw)
    },
    handleAddPerson() {
      this.$refs.refAddPerson.dy_show(this.projectId)
    },
    init() {
      getMbrDataList({ projectId: this.projectId }).then((res) => {
        for (let g of res.data) {
          g.gsstr = ''
          for (let gs of g.gs) {
            g.gsstr += `${gs.qyjgmc}（${ gs.zw }）\n`
          }
        }
        this.tableData = res.data;
      });
      getFxdxDataList({ projectId: this.projectId }).then((res) => {
        for (let g of res.data) {
          g.gsstr = ''
          for (let gs of g.gs) {
            g.gsstr += `${gs.qyjgmc}（${ gs.zw }）\n`
          }
        }
        this.tableDataFxdx = res.data;
      })
      getMbrDataAllPeople({ projectId: this.projectId }).then((res) => {
        this.allPeople = res.data;
        this.allSelect = ''
        this.allSelectFXDX = []
        for (let i of res.data) {
          if (i.sfMbr == "1") {
            this.allSelect = i.id
          }
          if (i.sfFxdx) {
            this.allSelectFXDX.push(i.id)
          }
        }
      });
    },
    getUrlParam(name) {
      console.log(window.location.href);
      let url = window.location.href;
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      let r = url.split("?")[1].match(reg);
      console.log(r);
      if (r != null) return r[2];
      return null;
    },
    weihu() {
      let query = {
        id: this.projectId,
      };
      this.$router.push({ path: "/importfile", query: query });
    },
    opendialog(row, id, title) {
      this.dialogData = row[id];
      this.$set(this.dialog, "title", title + "详细信息");
      this.headerData = this.headerDataList[id];
      this.$set(this.dialog, "show", true);
    },
    async saveFxdx() {
      let obj = await saveFxdxData({
        projectId: this.projectId,
        ids: this.allSelectFXDX
      })
      if (obj.data) {
        this.$message.error(obj.data);
      } else {
        this.$message.success("保存成功");
      }
      this.init()
    },
    savembr() {
      saveMbrDataMbr({
        projectId: this.projectId,
        idLists: [this.allSelect],
      }).then((res) => {
        this.$message.success("保存成功");
        this.init();
      });
    },
    getAge(row) {
      let birth = row.csrq;
      return birth ? new Date().getFullYear() - new Date(birth).getFullYear() : "未知";
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
      bf = bf / 10000
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
    height: calc(50% - 50px);
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
