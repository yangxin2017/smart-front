<template>
  <div class="relationship-class">
    <div class="left-list">
      <template v-for="(item, index) in leftList">
        <div
          :key="index"
          class="left-list-card"
          @click="leftClick(item)"
          :class="leftnow == item.id ? 'left-list-card-click' : ''"
          v-if="item.user"
        >
          <!-- <span class="left-list-name">{{ item.user.xm }}</span> -->
          <!-- 鼠标入显示提示文本-->
          <span class="left-list-name" :title="item.nodeName">
            {{ item.nodeName }}
          </span>
          <!-- <span class="left-list-name">{{ item.nodeName }}</span> -->

          <span
            class="left-list-sex"
            :style="{ color: item.user.xb == '男' ? '#00C1C1' : '#FF7FBF' }"
          >
            {{ item.user.xb }}
          </span>
        </div>
      </template>
    </div>
    <div class="list-right-card" v-if="leftnow != -1">
      <div class="close-button" @click="leftnow = -1">
        <i class="el-icon-close"></i>
      </div>
      <div class="list-right-card-row" style="height: 27%">
        <div class="card-1-1">
          <div class="card-1-1-1">
            <div class="label-class" style="left: 38px; top: 12px">姓名</div>
            <div class="label-class" style="right: 6px; top: 15px; font-size: 30px">
              <!-- {{ cardData.user.xm }} -->
              {{ cardData.nodeName }}
            </div>
          </div>
          <div class="card-1-1-2">
            <div class="label-class" style="left: 14px; top: 6px">性别</div>
            <div class="label-class" style="left: 14px; top: 32px">
              {{ cardData.user.xb }}
            </div>

            <div class="label-class" style="left: 122px; top: 6px">职务</div>
            <div class="label-class" style="left: 122px; top: 32px">
              {{
                cardData.gs.length > 0 ? cardData.gs[cardData.gs.length - 1].zw : "未知"
              }}
            </div>

            <div class="label-class" style="left: 14px; top: 64px">年龄</div>
            <div class="label-class" style="left: 14px; top: 90px">
              {{ getAge(cardData) }}
            </div>

            <div class="label-class" style="left: 122px; top: 64px">身份证</div>
            <div class="label-class" style="left: 122px; top: 90px">
              {{ cardData.user.sfzh }}
            </div>
          </div>
          <div class="card-1-1-3">
            <img
              :src="getPhoto(cardData.user)"
              alt=""
              style="width: 100%; height: 100%"
            />
          </div>
        </div>
        <div class="card-1-2">
          <div class="card-title">房产信息</div>
          <el-table :data="cardData.fdcq" style="width: 100%" height="calc(100% - 20px)">
            <el-table-column
              v-for="(item, index) in headerDataList.fdcq"
              :prop="item.prop"
              :label="item.label"
              :key="index"
            >
            </el-table-column>
          </el-table>
          <!-- <div class="label-card" v-for="(item, index) in cardlist1" :key="index">
            <div class="cardtitlebackground">{{ item.label }}</div>
            <div class="cardvalue">{{ item.value }}</div>
          </div> -->

          <!-- <div class="label-card">
            <div class="cardtitlebackground">当前职务</div>
            <div class="cardvalue">
              {{
                cardData.gs.length > 0 ? cardData.gs[cardData.gs.length - 1].zw : "未知"
              }}
            </div>
          </div>

          <div class="label-card">
            <div class="cardtitlebackground">出生日期</div>
            <div class="cardvalue">{{ cardData.user.csrq }}</div>
          </div>

          <div class="label-card">
            <div class="cardtitlebackground">配偶</div>
            <div class="cardvalue">{{ getPo(cardData) }}</div>
          </div>

          <div class="label-card">
            <div class="cardtitlebackground">学历</div>
            <div class="cardvalue">{{ cardData.user.xl }}</div>
          </div>

          <div class="label-card">
            <div class="cardtitlebackground">民族</div>
            <div class="cardvalue">{{ cardData.user.mz }}</div>
          </div>

          <div class="label-card">
            <div class="cardtitlebackground">驾驶证</div>
            <div class="cardvalue">{{ cardData.user.jsz }}</div>
          </div>

          <div class="label-card">
            <div class="cardtitlebackground">籍贯</div>
            <div class="cardvalue">{{ cardData.user.jg }}</div>
          </div>

          <div class="label-card">
            <div class="cardtitlebackground">上一任职务</div>
            <div class="cardvalue">
              {{ cardData.gs.length > 1 ? cardData.gs[cardData.gs.length - 2].zw : "无" }}
            </div>
          </div>

          <div class="label-card">
            <div class="cardtitlebackground">毕业院校</div>
            <div class="cardvalue">{{ cardData.user.byyx }}</div>
          </div>

          <div class="label-card">
            <div class="cardtitlebackground">户口所在地</div>
            <div class="cardvalue">{{ cardData.user.hjd }}</div>
          </div>

          <div class="label-card">
            <div class="cardtitlebackground">常住地址</div>
            <div class="cardvalue">{{ cardData.user.czdz }}</div>
          </div> -->
        </div>
      </div>
      <div class="list-right-card-row" style="height: 35%">
        <div class="card-class-now">
          <div class="card-title">累计缴纳保费</div>
          <el-table :data="cardData.bxbd" style="width: 100%" height="calc(100% - 20px)">
            <el-table-column
              v-for="(item, index) in headerDataList.bxbd"
              :prop="item.prop"
              :label="item.label"
              :key="index"
            >
            </el-table-column>
          </el-table>
        </div>
        <div class="card-class-now">
          <div class="card-title">银行卡</div>
          <el-table :data="cardData.yhk" style="width: 100%" height="calc(100% - 20px)">
            <el-table-column
              v-for="(item, index) in headerDataList.yhk"
              :prop="item.prop"
              :label="item.label"
              :key="index"
            >
            </el-table-column>
          </el-table>
        </div>
        <div class="card-class-now">
          <div class="card-title">抵押贷款</div>
          <el-table :data="cardData.dyq" style="width: 100%" height="calc(100% - 20px)">
            <el-table-column
              v-for="(item, index) in headerDataList.dyq"
              :prop="item.prop"
              :label="item.label"
              :key="index"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="list-right-card-row" style="height: 35%">
        <div class="card-class-now">
          <div class="card-title">证券信息</div>
          <el-table :data="cardData.cyxx" style="width: 100%" height="calc(100% - 20px)">
            <el-table-column
              v-for="(item, index) in headerDataList.cyxx"
              :prop="item.prop"
              :label="item.label"
              :key="index"
            >
            </el-table-column>
          </el-table>
        </div>
        <div class="card-class-now">
          <div class="card-title">亲属关系</div>
          <el-table :data="cardData.qsgx" style="width: 100%" height="calc(100% - 20px)">
            <el-table-column
              v-for="(item, index) in headerDataList.qsgx"
              :prop="item.prop"
              :label="item.label"
              :key="index"
            >
              <template slot-scope="scope">
                <span v-if="item.label != '姓名'">{{ scope.row[item.prop] }}</span>
                <span v-else>{{ getNoName(scope.row) }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="card-class-now">
          <div class="card-title">密切人</div>
          <el-table :data="cardData.mqr" style="width: 100%" height="calc(100% - 20px)">
            <el-table-column
              v-for="(item, index) in headerDataList.mqr"
              :prop="item.prop"
              :label="item.label"
              :key="index"
            >
              <template slot-scope="scope">
                <span v-if="item.label != '姓名'">{{ scope.row[item.prop] }}</span>
                <span v-else>{{ getNoName(scope.row) }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- <div class="list-right-card-row" style="height: 35%">
        <div class="card-2-1 card-2-border">
          <div class="card-2-in-border">
            <div class="title-class">财产信息</div>
            <div class="card-2-1-1">
              <div class="card-2-row">
                <span>总资产：</span>
                <span>{{ cardData.user.zzc }}</span>
              </div>
              <div class="card-2-row">
                <span>存款：</span>
                <span>{{ cardData.user.ck }}</span>
              </div>
              <div class="card-2-row">
                <span>有价证券：</span>
                <span>{{ getCyxx(cardData.cyxx) }}</span>
              </div>
              <div class="card-2-row">
                <span>房产：</span>
                <span>{{ cardData.fdcq.length }}套</span>
              </div>
              <div class="card-2-row">
                <span>车：</span>
                <span>{{ cardData.user.che }}</span>
              </div>
              <div class="card-2-row">
                <span>贷款余额：</span>
                <span>{{ getDydk(cardData) }}</span>
              </div>
              <div class="card-2-row">
                <span>借款：</span>
                <span>{{ cardData.user.jk }}</span>
              </div>
            </div>
            <div class="card-2-1-2"></div>
          </div>
        </div>

        <div class="card-2-2 card-2-border">
          <div class="card-2-in-border">
            <div class="title-class">活动信息</div>
            <div class="card-2-2-1">
              <div class="card-2-row">
                <span>日常消费点：</span>
                <span>{{ cardData.user.rcxfd }}</span>
              </div>
              <div class="card-2-row">
                <span>航空：</span>
                <span>{{ cardData.user.hk }}</span>
              </div>
              <div class="card-2-row">
                <span>火车：</span>
                <span>{{ cardData.user.hc }}</span>
              </div>
              <div class="card-2-row">
                <span>自驾：</span>
                <span>{{ cardData.user.zj }}</span>
              </div>
              <div class="card-2-row">
                <span>驾驶车辆违章：</span>
                <span>{{ cardData.user.jsclwz }}</span>
              </div>
              <div class="card-2-row">
                <span>住宿：</span>
                <span>{{ cardData.user.zs }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card-2-2 card-2-border">
          <div class="card-2-in-border">
            <div class="title-class">行为记录</div>
            <div class="card-2-2-1">
              <div class="card-2-row">
                <span>转账：</span>
                <span>{{ cardData.user.zz }}</span>
              </div>
              <div class="card-2-row">
                <span>现金：</span>
                <span>{{ cardData.user.xj }}</span>
              </div>
              <div class="card-2-row">
                <span>财产：</span>
                <span>{{ cardData.user.cc }}</span>
              </div>
              <div class="card-2-row">
                <span>信用卡：</span>
                <span>{{ cardData.user.xyk }}</span>
              </div>
              <div class="card-2-row">
                <span>通话：</span>
                <span>{{ cardData.user.th }}</span>
              </div>
              <div class="card-2-row">
                <span>微信：</span>
                <span>{{ cardData.user.wx }}</span>
              </div>
              <div class="card-2-row">
                <span>支付宝：</span>
                <span>{{ cardData.user.zfb }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card-2-2 card-2-border">
          <div class="card-2-in-border">
            <div class="title-class">公司信息</div>
            <div class="card-2-2-1">
              <div class="card-2-row">
                <span>名称：</span>
                <span>{{ cardData.company ? cardData.company.mc : "" }}</span>
              </div>
              <div class="card-2-row">
                <span>注册资金：</span>
                <span>{{ cardData.company ? cardData.company.zczj : "" }}</span>
              </div>
              <div class="card-2-row">
                <span>股东：</span>
                <span>{{ cardData.company ? cardData.company.gd : "" }}</span>
              </div>
              <div class="card-2-row">
                <span>实际控制人：</span>
                <span>{{ cardData.company ? cardData.company.sjkzr : "" }}</span>
              </div>
              <div class="card-2-row">
                <span>管理层：</span>
                <span>{{ cardData.company ? cardData.company.glc : "" }}</span>
              </div>
              <div class="card-2-row">
                <span style="width: 100px">地址：</span>
                <span>{{ cardData.company ? cardData.company.jgdz : "" }}</span>
              </div>
              <div class="card-2-row">
                <span>纳税：</span>
                <span>{{ cardData.company ? cardData.company.ns : "" }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-right-card-row" style="height: 35%">
        <div class="card-3">
          <div class="card-3-1">
            <span
              class="tab-class"
              @click="tabId = 0"
              :style="tabId == 0 ? { color: 'rgb(241, 204, 31)' } : {}"
              style="left: 20px"
            >
              财产信息
            </span>
            <span
              class="tab-class"
              @click="tabId = 1"
              :style="tabId == 1 ? { color: 'rgb(241, 204, 31)' } : {}"
              style="left: 120px"
            >
              活动信息
            </span>
            <span
              class="tab-class"
              @click="tabId = 2"
              :style="tabId == 2 ? { color: 'rgb(241, 204, 31)' } : {}"
              style="left: 220px"
            >
              行为记录
            </span>
            <span
              class="tab-class"
              @click="tabId = 3"
              :style="tabId == 3 ? { color: 'rgb(241, 204, 31)' } : {}"
              style="left: 320px"
            >
              公司信息
            </span>
            <div class="card-3-1-1">
              <p>公司信息</p>
              <p>详细信息</p>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <canvas id="canvas" v-show="false"></canvas>
    <div class="title">案情分析</div>
    <!-- <v-chart
      ref="chart"
      :option="option"
      class="graph-class"
      v-if="chartsbol"
      @click="handleClickChart"
      @mouseup="handleMouseUp"
    ></v-chart> -->

    <div class="tl-class" v-if="button == 1">
      <!-- <el-checkbox v-model="checked[0]" @change="setData1">
        <div class="checkbox-public" :class="checked[0] ? 'checkbox-shut' : ''">
          目标人物1
        </div>
      </el-checkbox>
      <el-checkbox v-model="checked[1]" @change="setData1">
        <div class="checkbox-public" :class="checked[1] ? 'checkbox-shut' : ''">
          目标人物2
        </div>
      </el-checkbox> -->
    </div>
    <div class="right-line" v-if="button == 1">
      <div
        class="circle-class"
        :class="clickcir == 0 ? 'click-circle-class' : ''"
        @click="handleClickCircle(clickcir, 0)"
      >
        <div class="circle-text">全部</div>
      </div>
      <div class="line-class"></div>

      <div
        class="circle-class"
        :class="clickcir == 1 ? 'click-circle-class' : ''"
        @click="handleClickCircle(clickcir, 1)"
      >
        <div class="circle-text">金额大于10万</div>
      </div>
      <div class="line-class"></div>
      <div
        class="circle-class"
        :class="clickcir == 2 ? 'click-circle-class' : ''"
        @click="handleClickCircle(clickcir, 2)"
      >
        <div class="circle-text">金额大于50万</div>
      </div>
      <div class="line-class"></div>
      <div
        class="circle-class"
        :class="clickcir == 3 ? 'click-circle-class' : ''"
        @click="handleClickCircle(clickcir, 3)"
      >
        <div class="circle-text">金额大于100万</div>
      </div>
    </div>

    <div class="right-line" v-if="button == 2">
      <div
        class="circle-class"
        :class="clickcir == 1 ? 'click-circle-class' : ''"
        @click="handleClickCircle(clickcir, 4)"
      >
        <div class="circle-text">1级</div>
      </div>
      <div class="line-class"></div>
      <div
        class="circle-class"
        :class="clickcir == 2 ? 'click-circle-class' : ''"
        @click="clickcir = 2"
      >
        <div class="circle-text">2级</div>
      </div>
      <div class="line-class"></div>
      <div
        class="circle-class"
        :class="clickcir == 3 ? 'click-circle-class' : ''"
        @click="clickcir = 3"
      >
        <div class="circle-text">3级</div>
      </div>
    </div>
    <!-- <el-button
      type="primary"
      size="mini"
      class="setbutton"
      v-if="button == 1"
      @click="setData2"
    >
      全景视图
    </el-button>
    <el-button
      type="primary"
      size="mini"
      class="setbutton"
      v-if="button == 2"
      @click="initInfo"
    >
      目标人视图
    </el-button> -->

    <el-button
      type="primary"
      size="mini"
      class="setbutton"
      @click="startEdit"
      v-if="!editMode"
    >
      视图编辑
    </el-button>
    <el-button
      type="primary"
      size="mini"
      class="setbutton"
      @click="saveGraph"
      v-if="editMode"
    >
      保存视图
    </el-button>

    <graph ref="refGraph" @chooseEvent="handleChooseEvent" :minJE="minJE"></graph>
    <detail-dialog ref="dDialog"></detail-dialog>
  </div>
</template>

<script>
import { GetRelationshiop, UpdateGraph } from "@/api/project";
import { getRydzdaList } from "@/api/public";
import { getLayout } from "@/utils/nodeLayout";
import DetailDialog from "./vdialog.vue";
import Graph from "./graph.vue";
export default {
  components: {
    DetailDialog,
    Graph,
  },
  data() {
    return {
      isset: false,
      setid: -1,
      echartsview: null,
      clickcir: 1,
      checked: [true, true],
      chartsbol: false,
      button: 1000,
      type: [],
      option: {
        tooltip: {
          show: false,
          // 弹框背景透明
          backgroundColor: "transparent",
          // 弹框边框透明
          borderColor: "transparent",
        },
        legend: [
          {
            data: [],
            // 文字颜色
            textStyle: {
              color: "#fff",
            },
            // 位置
            bottom: "100",
            // 左右间距
            right: "50",
            // 方向
            orient: "vertical",
            // 鼠标移入不高亮显示图中节点
            selectedMode: false,
          },
        ],
        animationDuration: 100,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "none",
            draggable: true,
            force: {
              repulsion: 400,
              gravity: 0.01,
              // layoutAnimation: false,
              edgeLength: 400,
            },
            roam: true,
            lineStyle: { color: "source", curveness: 0 },
            emphasis: { focus: "adjacency", lineStyle: { width: 10 } },
            legendHoverLink: false,
            edgeSymbol: ["circle", "arrow"],
            data: [],
            links: [],
            categories: [],
          },
        ],
      },
      saveSeries: {},
      minJE: 0,

      leftList: [],

      cardlist1: [
        {
          label: "当前职务",
          value: "处长",
        },
        {
          label: "出生日期",
          value: "1970年1月1日",
        },
        {
          label: "配偶",
          value: "李四",
        },
        {
          label: "学历",
          value: "硕士",
        },
        {
          label: "民族",
          value: "汉族",
        },
        {
          label: "驾驶证",
          value: "C2，2001年取得",
        },
        {
          label: "籍贯",
          value: "陕西西安",
        },
        {
          label: "上一任职务",
          value: "处长",
        },
        {
          label: "毕业院校",
          value: "人民大学",
        },
        {
          label: "户口所在地",
          value: "北京市东城区",
        },
        {
          label: "常住地址",
          value: "北京市东城区",
        },
      ],
      leftnow: -1,

      editMode: false,

      cardData: {},

      tabId: 0,

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
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    getPhoto(user) {
      if (user.txzp) {
        return `/ai/webfile/` + user.txzp;
      } else {
        if (user.xb == "女") {
          return require("@/assets/gra/nv.png");
        } else if (user.xb == "男") {
          return require("@/assets/gra/nan.png");
        } else {
          return require("@/assets/gra/nan.png");
        }
      }
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
    retStr(label) {
      return label.splice(" ", "");
    },
    getAllList() {
      let { nodes, lines } = this.$refs.refGraph.getAllNode();
      console.log(nodes, lines);
    },
    leftClick(item) {
      console.log(item);
      this.leftnow == item.id ? (this.leftnow = -1) : (this.leftnow = item.id);
      this.cardData = item;
      console.log(this.cardData);
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
    saveGraph() {
      console.log("save");
      this.$refs.refGraph.save();
      this.editMode = false;
    },
    startEdit() {
      this.editMode = true;
    },
    handleChooseEvent(ev) {
      console.log(ev);
      this.$refs.dDialog.show(ev);
    },
    init() {
      // GetGraphOne({ projectId: this.$route.query.id }).then((res) => {
      //   console.log(res);
      //   if (res.data) {
      //     this.isset = true;
      //     this.setid = res.data.id;
      //     this.saveSeries = JSON.parse(res.data.jsonstr);
      //   }
      //   this.initInfo();
      // });
      // let session = sessionStorage.getItem("series");
      // if (session) {
      //   this.saveSeries = JSON.parse(session);
      // }
      // this.initInfo();
      // this.$route.query.id;
      // getRydzdaList({
      //   pageIndex: 1,
      //   pageSize: 10000,
      //   projectId: this.$route.query.id,
      // }).then((res) => {
      //   console.log(res.data.records);
      //   this.leftList = res.data.records;
      // });

      // let id = this.getQueryString("id", this.$route.fullPath);
      let id = this.getQueryString("id", this.$route.fullPath);
      GetRelationshiop(id).then((res) => {
        this.leftList = res.data.nodes;
      });
      // let data = obj.data;
    },
    handleMouseUp(params) {
      // let chart = this.$refs.chart.chart;

      // 获取所有节点及name列表
      let nodes = this.$refs.chart.chart.getModel().getSeriesByIndex(0).getData()
        ._itemLayouts;
      let names = this.$refs.chart.chart.getModel().getSeriesByIndex(0).getData()
        ._nameList;

      for (let i in names) {
        for (let j of this.option.series[0].data) {
          if (names[i] == j.name) {
            this.$set(j, "x", nodes[i][0]);
            this.$set(j, "y", nodes[i][1]);
          }
        }
      }
      this.saveSeries[this.clickcir] = this.option.series[0].data;
      // sessionStorage.setItem("series", JSON.stringify(this.saveSeries));
      if (this.isset) {
        UpdateGraph({
          projectId: this.getQueryString("id", this.$route.fullPath),
          jsonstr: JSON.stringify(this.saveSeries),
          id: this.setid,
        }).then((res) => {
          console.log(res);
        });
      } else {
        SaveGraph({
          projectId: this.getQueryString("id", this.$route.fullPath),
          jsonstr: JSON.stringify(this.saveSeries),
        }).then((res) => {
          console.log(res);
          this.init();
        });
      }
    },
    handleClickChart(params) {
      this.$refs.dDialog.show(params);
    },
    handleClickCircle(clk, num) {
      this.clickcir = num;
      let je = 0;
      if (num == 1) {
        je = 10 * 10000;
      } else if (num == 2) {
        je = 50 * 10000;
      } else if (num == 3) {
        je = 100 * 10000;
      }
      this.minJE = je;
      /////
      this.$refs.refGraph.refresh();
    },
    async initInfo() {
      const loading = this.$loading({
        lock: true,
        text: "正在加载数据，请稍候...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let id = this.getQueryString("id", this.$route.fullPath);
      let obj = await GetRelationshiop(id);
      let data = obj.data;
      // 在data['lines']中遍历，找到当前数据的sid与另一个eid相等，并且当前eid与另一个数据sid相等的数据，并比较这两个对象的name的绝对值，删掉name小的那个
      for (let i of data["lines"]) {
        for (let j of data["lines"]) {
          if (i.setover || j.setover) {
            continue;
          }
          if (i.sid == j.eid && i.eid == j.sid) {
            if (Math.abs(i.name) > Math.abs(j.name)) {
              i.name = i.name - j.name;
              i.setover = true;
              data["lines"].splice(data["lines"].indexOf(j), 1);
            } else {
              j.name = j.name - i.name;
              j.setover = true;
              data["lines"].splice(data["lines"].indexOf(i), 1);
            }
          }
        }
      }
      // this.setData1(obj.data);
      this.setData1(data);
      loading.close();
    },
    _getRealNode(graph) {
      let nodes = graph.nodes;
      let lines = graph.lines;
      let rnodes = [];
      for (let n of nodes) {
        let ish = false;
        for (let l of lines) {
          if (n.id == l.sid || n.id == l.eid) {
            ish = true;
          }
        }
        if (ish && !this._ish(n.nodeName, rnodes)) {
          rnodes.push(n);
        }
      }
      return rnodes;
    },
    _ish(xn, arr) {
      let ish = false;
      for (let a of arr) {
        if (a.nodeName == xn) {
          ish = true;
          break;
        }
      }
      return ish;
    },
    _ishLink(l, lks) {
      let ish = false;
      for (let el of lks) {
        if (l.sid == 347 && l.eid == 347) {
          console.log(el);
        }
        if (l.sid == el.source && l.eid == el.target && el.source != el.target) {
          ish = true;
          break;
        }
      }
      return ish;
    },
    _getNodeById(nodes, id) {
      let res = null;
      for (let n of nodes) {
        if (n.id == id) {
          res = n;
          break;
        }
      }
      return res;
    },
    _isRepeat(mbr, nodes, cnode) {
      let isr = false;
      for (let n of nodes) {
        if (n.name == cnode.nodeName) {
          isr = true;
          break;
        }
      }
      for (let m of mbr) {
        if (m.name == cnode.nodeName) {
          isr = true;
          break;
        }
      }
      return isr;
    },
    getPrepDataObj(nodes, lines) {
      let mbr = [];
      for (let n of nodes) {
        if (n.nodeType == "PERSON" && n.user && n.user.sfMbr) {
          mbr.push({ name: n.nodeName, children: [], data: n });
        }
      }
      let tmplinks = [];
      let tmpNodes = [];
      for (let m of mbr) {
        for (let l of lines) {
          if (Math.abs(Number(l.name)) >= this.minJE) {
            if (!this._ishLink(l, tmplinks)) {
              if (l.sid == m.data.id) {
                let cnode = this._getNodeById(nodes, l.eid);
                if (cnode) {
                  if (!this._isRepeat(mbr, tmpNodes, cnode)) {
                    m.children.push({
                      name: cnode.nodeName,
                      data: cnode,
                      line: l,
                    });
                    tmpNodes.push({ name: cnode.nodeName });
                  }
                  tmplinks.push({ source: l.sid + "", target: l.eid + "" });
                }
              } else if (l.eid == m.data.id) {
                let cnode = this._getNodeById(nodes, l.sid);
                if (cnode) {
                  if (!this._isRepeat(mbr, tmpNodes, cnode)) {
                    m.children.push({
                      name: cnode.nodeName,
                      data: cnode,
                      line: l,
                    });
                    tmpNodes.push({ name: cnode.nodeName });
                  }
                  tmplinks.push({ source: l.sid + "", target: l.eid + "" });
                }
              }
            }
          }
        }
      }
      return mbr;
    },
    _getW(num) {
      let r = (num / 10000).toFixed(1) + "万";
      return r;
    },
    setData1(graph) {
      let nodes = this._getRealNode(graph);
      let lines = graph.lines;

      let mbrarr = this.getPrepDataObj(nodes, lines);

      let realNodes = getLayout(mbrarr);

      this.option.legend[0] = {};
      this.option.series[0].categories = [];
      this.chartsbol = false;
      this.button = 1;

      let links = [];
      for (let l of lines) {
        if (Math.abs(Number(l.name)) >= this.minJE) {
          //if (l.sid != l.eid) {
          if (!this._ishLink(l, links)) {
            let tmp = {
              value:
                l.name > 0
                  ? "金额：" + this._getW(Math.abs(l.name))
                  : "金额：" + this._getW(Math.abs(l.name)),
              source: l.sid + "",
              target: l.eid + "",
              label: {
                show: true,
                color: "#fff",
                formatter: "{c}",
                opacity: 1,
                fontSize: 12,
              },
              lineStyle: {
                color: l.name > 0 ? "#66b1ff" : "#00ffff",
                // curveness: 0.1,
                // 设置线粗细
                width: Math.abs(l.name) / 100000 > 5 ? 5 : Math.abs(l.name) / 100000,
              },
              dat: l,
            };
            links.push(tmp);
          }
          //}
        }
      }

      let arrRes = [];

      for (let nx of realNodes) {
        let x = nx.x;
        let y = nx.y;
        let n = nx.od;
        if (this.saveSeries[this.clickcir] != null) {
          for (let i of this.saveSeries[this.clickcir]) {
            if (i.name == n.id) {
              x = i.x;
              y = i.y;
            }
          }
        }
        let tmp = {
          x: x,
          y: y,
          name: n.id + "",
          value: n.nodeName,
          symbolSize: n.user && n.user.sfMbr ? 60 : 30,
          draggable: true,
          label: {
            position: "bottom",
            show: true,
            formatter: "{c}",
            fontSize: 12,
            fontWeight: "bold",
            color: "#fff",
          },
          dat: n,
          symbol:
            n.user && n.user.txzp
              ? "image:///ai/webfile/" + n.user.txzp
              : "image://" + require("@/assets/gra/pe.png"),
        };
        if (n.nodeType == "COMPANY") {
          tmp.symbol = "image://" + require("@/assets/gra/com.png");
          tmp.symbolSize = 30;
        }
        arrRes.push(tmp);
      }

      // for(let i=0;i<arrRes.length-1;i++) {
      //   for(let j=i+1;j<arrRes.length;j++) {
      //     if (arrRes[i].name == arrRes[j].name) {
      //       console.log(arrRes[i])
      //     }
      //   }
      // }

      this.$set(this.option.series[0], "data", arrRes);
      this.$set(this.option.series[0], "links", links);

      this.$nextTick(() => {
        this.chartsbol = true;
      });
    },
    setData2() {
      this.option.legend[0] = {
        data: ["人物/人际关系", "公司/股东", "地点/活动", "资产/资金"],
        textStyle: {
          color: "#fff",
        },
        // 位置
        bottom: "100",
        // 左右间距
        right: "50",
        // 方向
        orient: "vertical",
      };
      this.option.series[0].categories = [
        { name: "人物/人际关系" },
        { name: "公司/股东" },
        { name: "地点/活动" },
        { name: "资产/资金" },
      ];
      this.chartsbol = false;
      this.button = 2;
      let iconList = [
        {
          id: 0,
          x: 215,
          y: 131,
          name: "公司",
          icon: require("@/assets/gra/icon2-1.fw.png"),
          type: "公司/股东",
        },
        {
          id: 1,
          x: 484,
          y: 338,
          name: "联系人",
          icon: require("@/assets/gra/pe.png"),
          type: "人物/人际关系",
        },
        {
          id: 2,
          x: 709,
          y: 173,
          name: "资产",
          icon: require("@/assets/gra/icon4.png"),
          type: "资产/资金",
        },
        {
          id: 3,
          x: 881,
          y: 291,
          name: "目标人物",
          icon: require("@/assets/gra/icon2-5.fw.png"),
        },
        {
          id: 4,
          x: 1121,
          y: 173,
          name: "活动热点区",
          icon: require("@/assets/gra/icon2-3.fw.png"),
          type: "地点/活动",
        },
        {
          id: 5,
          x: 1573,
          y: 260,
          name: "目标人物",
          icon: require("@/assets/gra/icon2-5.fw.png"),
        },
        {
          id: 6,
          x: 1219,
          y: 395,
          name: "地点",
          icon: require("@/assets/gra/icon2-4.fw.png"),
          type: "地点/活动",
        },
        {
          id: 7,
          x: 898,
          y: 521,
          name: "公司",
          icon: require("@/assets/gra/icon2-1.fw.png"),
          type: "公司/股东",
        },
        {
          id: 8,
          x: 487,
          y: 607,
          name: "联系人",
          icon: require("@/assets/gra/pe.png"),
          type: "人物/人际关系",
        },
        {
          id: 9,
          x: 1229,
          y: 623,
          name: "地点",
          icon: require("@/assets/gra/icon2-4.fw.png"),
          type: "地点/活动",
        },
        {
          id: 10,
          x: 1537,
          y: 665,
          name: "联系人",
          icon: require("@/assets/gra/pe.png"),
          type: "人物/人际关系",
        },
        {
          id: 11,
          x: 897,
          y: 742,
          name: "联系人",
          icon: require("@/assets/gra/pe.png"),
          type: "人物/人际关系",
        },
        {
          id: 12,
          x: 314,
          y: 833,
          name: "公司",
          icon: require("@/assets/gra/icon2-1.fw.png"),
          type: "公司/股东",
        },

        //
        {
          id: "2-1",
          x: 709,
          y: 173,
          name: "",
          symbolOffset: [-50, -30],
          icon: require("@/assets/gra/sicon1.fw.png"),
          type: "资产/资金",
        },
        {
          id: "2-2",
          x: 709,
          y: 173,
          name: "",
          symbolOffset: [-20, -50],
          icon: require("@/assets/gra/sicon2.fw.png"),
          type: "资产/资金",
        },
        {
          id: "2-3",
          x: 709,
          y: 173,
          name: "",
          symbolOffset: [20, -50],
          icon: require("@/assets/gra/sicon3.fw.png"),
          type: "资产/资金",
        },
        {
          id: "2-4",
          x: 709,
          y: 173,
          name: "",
          symbolOffset: [50, -30],
          icon: require("@/assets/gra/sicon4.fw.png"),
          type: "资产/资金",
        },

        {
          id: "3-1",
          x: 881,
          y: 291,
          name: "",
          symbolOffset: [-20, -70],
          icon: require("@/assets/gra/sicon1.fw.png"),
        },
        {
          id: "3-2",
          x: 881,
          y: 291,
          name: "",
          symbolOffset: [20, -70],
          icon: require("@/assets/gra/sicon2.fw.png"),
        },

        {
          id: "4-1",
          x: 1121,
          y: 173,
          name: "",
          symbolOffset: [-50, -30],
          icon: require("@/assets/gra/sicon1.fw.png"),
          type: "地点/活动",
        },
        {
          id: "4-2",
          x: 1121,
          y: 173,
          name: "",
          symbolOffset: [-20, -50],
          icon: require("@/assets/gra/sicon2.fw.png"),
          type: "地点/活动",
        },
        {
          id: "4-3",
          x: 1121,
          y: 173,
          name: "",
          symbolOffset: [20, -50],
          icon: require("@/assets/gra/sicon3.fw.png"),
          type: "地点/活动",
        },
        {
          id: "4-4",
          x: 1121,
          y: 173,
          name: "",
          symbolOffset: [50, -30],
          icon: require("@/assets/gra/sicon4.fw.png"),
          type: "地点/活动",
        },

        //         x: 1573,
        // y: 260,

        {
          id: "5-1",
          x: 1573,
          y: 260,
          name: "",
          symbolOffset: [-20, -70],
          icon: require("@/assets/gra/sicon1.fw.png"),
        },
        {
          id: "5-2",
          x: 1573,
          y: 260,
          name: "",
          symbolOffset: [20, -70],
          icon: require("@/assets/gra/sicon2.fw.png"),
        },
      ];
      let linkList = [
        {
          from: 0,
          to: 1,
          value: "股东",
        },
        {
          from: 1,
          to: 3,
          value: "贷款（银行转入）",
        },
        {
          from: 2,
          to: 3,
          value: "",
        },
        {
          from: 3,
          to: 4,
          value: "",
        },
        {
          from: 3,
          to: 5,
          value: "电话",
        },
        {
          from: 3,
          to: 6,
          value: "高铁出差",
        },
        {
          from: 5,
          to: 6,
          value: "高铁出差",
        },
        {
          from: 3,
          to: 7,
          value: "高管",
        },
        {
          from: 3,
          to: 9,
          value: "就餐",
        },
        {
          from: 3,
          to: 8,
          value: "贷款（现金转入）",
        },
        {
          from: 7,
          to: 12,
          value: "贷款（银行转入）",
        },
        {
          from: 8,
          to: 12,
          value: "股东",
        },
        {
          from: 12,
          to: 11,
          value: "股东",
        },
        {
          from: 11,
          to: 10,
          value: "夫妻",
        },
        {
          from: 9,
          to: 10,
          value: "就餐",
        },
        {
          from: 8,
          to: 9,
          value: "就餐",
        },
        {
          from: 5,
          to: 9,
          value: "就餐",
        },
        {
          from: 5,
          to: 10,
          value: "同学",
        },
      ];
      let data = [];
      let isover = [];
      // isover长度与iconList相同，并给每个赋值false
      for (let i = 0; i < iconList.length; i++) {
        isover.push(false);
      }
      // data为循环iconList生成
      for (let i = 0; i < iconList.length; i++) {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        let img = new Image();
        img.src = iconList[i].icon;
        let background = new Image();
        background.src = require("@/assets/gra/pe.png");
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          // img居中显示
          // ctx.drawImage(img, (canvas.width - img.width) / 2, (canvas.height - img.height) / 2);
          let base64 = canvas.toDataURL("image/png");
          data[i] = {
            category: iconList[i].type,
            id: iconList[i].id,
            name: iconList[i].name,
            symbolSize:
              iconList[i].name == "目标人物" ? 100 : iconList[i].symbolOffset ? 30 : 50,
            isicon: iconList[i].symbolOffset ? true : false,
            x: iconList[i].x,
            y: iconList[i].y,
            symbolOffset: iconList[i].symbolOffset ? iconList[i].symbolOffset : [0, 0],
            label: {
              position: "bottom",
              show: true,
              formatter: "{b}",
              fontSize: 20,
              fontWeight: "bold",
              color: "#fff",
            },
            // symbol: iconList[i].icon,
            symbol: "image://" + base64,
          };
          isover[i] = true;
        };
      }
      let interval = setInterval(() => {
        // 如果isover数组中的值都为true，则触发回调函数
        if (isover.every((item) => item === true)) {
          let links = [];
          // links为循环linkList生成
          for (let i = 0; i < linkList.length; i++) {
            // 根据节点id连接
            links.push({
              source: linkList[i].from,
              target: linkList[i].to,
              value: linkList[i].value,
              label: {
                show: true,
                color: "#fff",
                formatter: "{c}",
                opacity: 1,
                fontSize: 14,
              },
            });
          }

          this.$set(this.option.series[0], "data", data);
          this.$set(this.option.series[0], "links", links);
          this.$set(this.option.series[0], "lineStyle", {
            opacity: 0.9,
            width: 2,
            curveness: 0,
          });
          this.$nextTick(() => {
            this.chartsbol = true;
            clearInterval(interval);
          });
        }
      }, 100);
    },
    getAge(row) {
      let birth = row.user.csrq;
      return birth ? new Date().getFullYear() - new Date(birth).getFullYear() : "未知";
    },
    getPo(row) {
      let po = "无";
      for (let i of row.qsgx) {
        if (i.gx == "配偶") {
          return i.xm1 == row.user.xm ? i.xm2 : i.xm1;
        }
      }
      return po;
    },
    getCyxx(row) {
      let money = 0;
      for (let i of row) {
        money += i.drspj * i.cysl;
      }
      return money;
    },
    getDydk(row) {
      let zqse = 0;
      for (let i of row.dyq) {
        zqse += parseFloat(i.bdbzzqse);
      }
      return zqse.toFixed(2);
    },
    getNoName(row) {
      if (row.xm1 == this.cardData.nodeName) {
        return row.xm2;
      } else {
        return row.xm1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.relationship-class {
  width: 100%;
  height: 100%;
  background: url("../../assets/gra/background.jpg");
  background-size: 100% 100%;
  .title {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: #fff;
    font-weight: 900;
    letter-spacing: 10px;
    // 文字颜色渐变
  }
  .graph-class {
    width: 100%;
    height: calc(100% - 80px);
  }
  .setbutton {
    position: absolute;
    right: 30px;
    bottom: 30px;
    z-index: 9;
  }
  .tl-class {
    width: 100%;
    position: fixed;
    bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-checkbox:last-of-type {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .checkbox-public {
      width: 111px;
      height: 110px;
      background: url("../../assets/gra/tl2.fw.png");
      display: flex;
      align-items: center;
      justify-content: center;
      color: #a1f5f6;
      font-size: 20px;
    }
    .checkbox-shut {
      background: url("../../assets/gra/tl1.fw.png");
      color: #fedd7a;
    }
  }
  .right-line {
    position: fixed;
    right: 200px;
    bottom: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 9;
    .circle-class {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #00b2ff;
      position: relative;
      cursor: pointer;
      border: 1px solid transparent;
      .circle-text {
        width: 200px;
        position: absolute;
        right: -210px;
        top: -6px;
        color: #fff;
        font-size: 20px;
        white-space: nowrap;
      }
    }
    .click-circle-class {
      box-shadow: 0 0 10px #00b2ff;
      border: 1px solid #fff;
    }
    .line-class {
      width: 1px;
      height: 60px;
      background: #02adec;
      margin: 4px 0;
    }
  }
}
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 12px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  -webkit-box-shadow: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: rgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(0, 0, 0, 0.1);
}
.left-list {
  position: absolute;
  left: 10px;
  top: 100px;
  width: 240px;
  height: calc(100% - 130px);
  z-index: 50;
  // display: flex;
  // align-items: flex-start;
  // justify-content: flex-start;
  // flex-direction: column;
  // overflow-x: hidden;
  overflow-y: auto;
  .left-list-card {
    width: 200px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-image: url("../../assets/gra/leftlist.png");
    background-size: 100% 100%;
    margin: 10px 0;
    cursor: pointer;

    .left-list-name {
      text-indent: 1em;
      font-size: 20px;
      color: #fff;
      // 禁止换行，超出部分显示省略号
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .left-list-sex {
      margin-right: 10px;
    }
  }
  .left-list-card-click {
    width: 220px;
    height: 50px;
    background-image: url("../../assets/gra/leftlistclick.png");
    .left-list-name {
      text-indent: 1em;
      font-size: 24px;
      color: #fff;
    }
    .left-list-sex {
      margin-right: 10px;
      font-size: 18px;
    }
  }
}

.list-right-card {
  width: calc(100% - 300px);
  height: calc(100% - 130px);
  position: absolute;
  left: 240px;
  top: 100px;
  z-index: 5000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  .card-title {
    height: 20px;
    color: #fff;
    position: absolute;
    left: 10px;
    top: -6px;
    font-weight: 900;
  }
  .close-button {
    position: absolute;
    font-size: 30px;
    color: #fff;
    right: 0px;
    top: -30px;
    cursor: pointer;
  }
  .list-right-card-row {
    width: 100%;
    // height: 32%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .cardtitlebackground {
    background: url("../../assets/gra/cardtitlebackground.png");
    width: 144px;
    height: 29px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-indent: 1em;
    color: #fff;
    font-size: 18px;
  }
  .card-1-1 {
    position: relative;
    width: 33%;
    height: 100%;
    border: 1px solid #036a8c;
    background: #143643;
    box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.7) inset;
    .card-1-1-1 {
      width: 318px;
      height: 67px;
      background: url("../../assets/gra/card1.png");
      background-size: 100% 100%;
      position: absolute;
      top: 10px;
      left: 10px;
      .label-class {
        position: absolute;
        font-size: 24px;
        color: #feca4c;
      }
    }
    .card-1-1-2 {
      width: 317px;
      height: 114px;
      background: url("../../assets/gra/card2.png");
      background-size: 100% 100%;
      position: absolute;
      top: 100px;
      left: 15px;
      .label-class {
        position: absolute;
        font-size: 18px;
        color: #fff;
      }
    }
    .card-1-1-3 {
      width: 173px;
      height: 199px;
      background: url("../../assets/gra/photoback.png");
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .card-1-2 {
    width: 66%;
    height: 100%;
    border: 1px solid #036a8c;
    background: #143643;
    box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.7) inset;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    flex-direction: column;
    position: relative;
    .label-card {
      width: 15%;
      height: 40%;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 1%;
      .cardvalue {
        color: #fff;
        text-indent: 6px;
        font-size: 18px;
      }
    }
  }
  .card-class-now {
    width: 32%;
    height: 100%;
    border: 1px solid #036a8c;
    background: #143643;
    box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.7) inset;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    position: relative;
    padding-top: 10px;
  }
}
.card-2-border {
  background: linear-gradient(to left, #aaaaaa, #aaaaaa) left top no-repeat,
    linear-gradient(to bottom, #aaaaaa, #aaaaaa) left top no-repeat,
    linear-gradient(to left, #aaaaaa, #aaaaaa) right top no-repeat,
    linear-gradient(to bottom, #aaaaaa, #aaaaaa) right top no-repeat,
    linear-gradient(to left, #aaaaaa, #aaaaaa) left bottom no-repeat,
    linear-gradient(to bottom, #aaaaaa, #aaaaaa) left bottom no-repeat,
    linear-gradient(to left, #aaaaaa, #aaaaaa) right bottom no-repeat,
    linear-gradient(to left, #aaaaaa, #aaaaaa) right bottom no-repeat;
  /*设置大小*/
  background-size: 1px 10px, 10px 1px, 1px 10px, 10px 1px;
  background-color: #143643;

  .card-2-in-border {
    height: calc(100% - 20px);
    width: calc(100% - 8px);
    margin-top: 16px;
    margin-left: 4px;
    border: 1px solid #00698c;
    box-shadow: 0 0 10px rgba($color: #00698c, $alpha: 0.7) inset,
      0 0 10px rgba($color: #00698c, $alpha: 0.7);

    position: relative;
    display: flex;
    align-content: center;
    justify-content: space-around;
    .title-class {
      position: absolute;
      left: 20px;
      top: -12px;
      font-size: 20px;
      color: #fff;
      // background: #143643;
      // padding: 0 10px;
    }
  }
}
.card-2-1 {
  width: 28%;
  height: 100%;
  .card-2-1-1 {
    width: 45%;
    height: calc(100% - 20px);
    margin-top: 10px;
  }
  .card-2-1-2 {
    width: 45%;
    height: calc(100% - 20px);
    margin-top: 10px;
  }
}
.card-2-2 {
  width: 23%;

  height: 100%;
  .card-2-2-1 {
    width: 90%;
    height: calc(100% - 20px);
    margin-top: 10px;
  }
}
.card-2-row {
  width: 100%;
  margin: 14px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
}

.card-3 {
  width: 100%;
  height: 100%;
  background: linear-gradient(to left, #aaaaaa, #aaaaaa) left top no-repeat,
    linear-gradient(to bottom, #aaaaaa, #aaaaaa) left top no-repeat,
    linear-gradient(to left, #aaaaaa, #aaaaaa) right top no-repeat,
    linear-gradient(to bottom, #aaaaaa, #aaaaaa) right top no-repeat,
    linear-gradient(to left, #aaaaaa, #aaaaaa) left bottom no-repeat,
    linear-gradient(to bottom, #aaaaaa, #aaaaaa) left bottom no-repeat,
    linear-gradient(to left, #aaaaaa, #aaaaaa) right bottom no-repeat,
    linear-gradient(to left, #aaaaaa, #aaaaaa) right bottom no-repeat;
  /*设置大小*/
  background-size: 1px 10px, 10px 1px, 1px 10px, 10px 1px;
  background-color: #143643;
  display: flex;
  align-items: center;
  justify-content: center;
  .card-3-1 {
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    border: 1px solid #00698c;
    box-shadow: 0 0 10px rgba($color: #00698c, $alpha: 0.7) inset,
      0 0 10px rgba($color: #00698c, $alpha: 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .tab-class {
      position: absolute;
      top: -10px;
      color: #fff;
      cursor: pointer;
      font-size: 20px;
    }
    .card-3-1-1 {
      width: calc(100% - 20px);
      height: calc(100% - 20px);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px rgb(72, 106, 170) dashed;
      color: #fff;
      flex-direction: column;
    }
  }
}
</style>
