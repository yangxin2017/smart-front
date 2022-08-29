<template>
  <div class="importfile-class">
    <template v-if="dialog == -1">
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
      <el-row v-for="(item, index) in upfileList" class="row-class" :key="index">
        <template v-for="(row, rowindex) in item">
          <el-col :span="4" align="center" :key="'row0' + index + '_' + rowindex">
            {{ row.title }}
          </el-col>
          <el-col :span="2" :key="'row1' + index + '_' + rowindex">
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
              <!-- :limit="1" -->
              <el-button type="primary" size="mini"> 数据导入 </el-button>
            </el-upload>
          </el-col>
          <el-col :span="2" :key="'row2' + index + '_' + rowindex">
            <el-button
              type="primary"
              size="mini"
              v-if="row.outfile"
              @click="downloadFile(row)"
            >
              数据导出
            </el-button>
          </el-col>
          <el-col :span="2" :key="'row3' + index + '_' + rowindex">
            <el-button
              type="primary"
              size="mini"
              v-if="row.download"
              @click="downlaodTemplate(row)"
            >
              模板下载
            </el-button>
          </el-col>
          <el-col :span="2" :key="'row4' + index + '_' + rowindex">
            <el-button
              type="primary"
              size="mini"
              v-if="row.alldata"
              @click="allData(row)"
            >
              全部数据
            </el-button>
          </el-col>
        </template>
      </el-row>
    </template>

    <template v-if="dialog == 1">
      <el-button type="primary" size="mini" class="rest-button" @click="dialog = -1">
        返回
      </el-button>
      <tablePublic :tableName="tableName" :headerList="headerList" />
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
      upfileList: [
        [
          {
            title: "银行数据",
            upfile: true,
            outfile: true,
            download: true,
            alldata: true,
            downloadUrl: "/ai/bank/export",
            action: "/ai/bank/upload",
            bid: 1,
            template: "/downFile/银行调查交易信息模板.xlsx",
            headerList: [
              {
                label: "反馈单位",
                modifiable: true,
                prop: "fkdw",
              },
              {
                label: "审批表",
                modifiable: true,
                prop: "spb",
              },
              {
                label: "名称",
                modifiable: true,
                prop: "mc",
              },
              {
                label: "证件类型",
                modifiable: true,
                prop: "zjlx",
              },
              {
                label: "证件号码",
                modifiable: true,
                prop: "zjhm",
              },
              {
                label: "查询对象名称",
                modifiable: true,
                prop: "cxdxmc",
              },
              {
                label: "查询卡号",
                modifiable: true,
                prop: "cxkh",
              },
              {
                label: "查询反馈结果原因",
                modifiable: true,
                prop: "cxfkjgyy",
              },
              {
                label: "本方账号",
                modifiable: true,
                prop: "bfzh",
              },
              {
                label: "本方卡号",
                modifiable: true,
                prop: "bfkh",
              },
              {
                label: "交易类型",
                modifiable: true,
                prop: "jylx",
              },
              {
                label: "借贷标志",
                modifiable: true,
                prop: "jdbz",
              },
              {
                label: "币种",
                modifiable: true,
                prop: "bz",
              },
              {
                label: "交易金额",
                modifiable: true,
                prop: "jyje",
              },
              {
                label: "交易余额",
                modifiable: true,
                prop: "jyye",
              },
              {
                label: "交易时间",
                modifiable: true,
                prop: "jysj",
              },
              {
                label: "交易流水号",
                modifiable: true,
                prop: "jylsh",
              },
              {
                label: "交易对方名称",
                modifiable: true,
                prop: "jydfmc",
              },
              {
                label: "交易对方账号",
                modifiable: true,
                prop: "jydfzh",
              },
              {
                label: "交易对方卡号",
                modifiable: true,
                prop: "jydfkh",
              },
              {
                label: "交易对方证件号码",
                modifiable: true,
                prop: "jydfzjhm",
              },
              {
                label: "交易对手余额",
                modifiable: true,
                prop: "jydsye",
              },
              {
                label: "交易对方账号开户行",
                modifiable: true,
                prop: "jydfzhkhh",
              },
              {
                label: "交易摘要",
                modifiable: true,
                prop: "jyzy",
              },
              {
                label: "交易网点名称",
                modifiable: true,
                prop: "jywdmc",
              },
              {
                label: "交易网点代码",
                modifiable: true,
                prop: "jywddm",
              },
              {
                label: "日志号",
                modifiable: true,
                prop: "rzh",
              },
              {
                label: "传票号",
                modifiable: true,
                prop: "cph",
              },
              {
                label: "凭证种类",
                modifiable: true,
                prop: "pzzl",
              },
              {
                label: "凭证号",
                modifiable: true,
                prop: "pzh",
              },
              {
                label: "现金标志",
                modifiable: true,
                prop: "xjbz",
              },
              {
                label: "终端号",
                modifiable: true,
                prop: "zdh",
              },
              {
                label: "交易是否成功",
                modifiable: true,
                prop: "jysfcg",
              },
              {
                label: "交易发生地",
                modifiable: true,
                prop: "jyfsd",
              },
              {
                label: "商户名称",
                modifiable: true,
                prop: "shmc",
              },
              {
                label: "商户号",
                modifiable: true,
                prop: "shh",
              },
              {
                label: "IP地址",
                modifiable: true,
                prop: "ipdz",
              },
              {
                label: "MAC地址",
                modifiable: true,
                prop: "macdz",
              },
              {
                label: "交易柜员号",
                modifiable: true,
                prop: "jygyh",
              },
              {
                label: "备注",
                modifiable: true,
                prop: "remark",
              },
            ],
          },
          {
            title: "公安数据-民航离岗记录",
            upfile: true,
            outfile: true,
            download: true,
            alldata: true,
            downloadUrl: "/ai/mhlgjl/export",
            action: "/ai/mhlgjl/upload",
            bid: 2,
            template: "/downFile/公安情报信息模块-民航离港记录.xlsx",
            headerList: [
              {
                label: "旅客中文姓名",
                modifiable: true,
                prop: "lkzwxm",
              },
              {
                label: "身份证号",
                modifiable: true,
                prop: "sfzh",
              },
              {
                label: "证件号码",
                modifiable: true,
                prop: "zjhm",
              },
              {
                label: "航班日期",
                modifiable: true,
                prop: "hbrq",
              },
              {
                label: "起飞港站",
                modifiable: true,
                prop: "qfgz",
              },
              {
                label: "到达航站",
                modifiable: true,
                prop: "ddhz",
              },
              {
                label: "航空公司",
                modifiable: true,
                prop: "hkgs",
              },
              {
                label: "航班号",
                modifiable: true,
                prop: "hbh",
              },
              {
                label: "旅客名",
                modifiable: true,
                prop: "lkm",
              },
              {
                label: "旅客中间名",
                modifiable: true,
                prop: "lkzjm",
              },
              {
                label: "旅客姓",
                modifiable: true,
                prop: "lkx",
              },
              {
                label: "性别",
                modifiable: true,
                prop: "xb",
              },
              {
                label: "出生日期",
                modifiable: true,
                prop: "csrq",
              },
              {
                label: "证件类型",
                modifiable: true,
                prop: "zjlx",
              },
              {
                label: "旅客姓名",
                modifiable: true,
                prop: "lkxm",
              },
              {
                label: "出生地",
                modifiable: true,
                prop: "csd",
              },
              {
                label: "航班后缀",
                modifiable: true,
                prop: "hbhz",
              },
              {
                label: "旅客座位",
                modifiable: true,
                prop: "lkzw",
              },
              {
                label: "离港时间",
                modifiable: true,
                prop: "lgsj",
              },
              {
                label: "进港时间",
                modifiable: true,
                prop: "jgsj",
              },
              {
                label: "离港国家/地区",
                modifiable: true,
                prop: "lggjdq",
              },
              {
                label: "进港国家/地区",
                modifiable: true,
                prop: "jggjdq",
              },
              {
                label: "旅客出入境标识",
                modifiable: true,
                prop: "lkcrjbs",
              },
              {
                label: "旅客国家/地区",
                modifiable: true,
                prop: "lkgjdq",
              },
              {
                label: "发证国家/地区",
                modifiable: true,
                prop: "fzgjdq",
              },
              {
                label: "发证日期",
                modifiable: true,
                prop: "fzrq",
              },
              {
                label: "过期日期",
                modifiable: true,
                prop: "gqrq",
              },
              {
                label: "值机时间",
                modifiable: true,
                prop: "zjsj",
              },
              {
                label: "值机办公室",
                modifiable: true,
                prop: "zjbgs",
              },
              {
                label: "执行旅客操作的终端号",
                modifiable: true,
                prop: "zxlkczdzdh",
              },
              {
                label: "执行值机的代理号",
                modifiable: true,
                prop: "zxzjddlh",
              },
              {
                label: "ICS中记录信息",
                modifiable: true,
                prop: "icszjlxx",
              },
              {
                label: "共同订票标识字段",
                modifiable: true,
                prop: "gtdpbszd",
              },
              {
                label: "信息删除标识",
                modifiable: true,
                prop: "xxscbs",
              },
              {
                label: "更新时间",
                modifiable: true,
                prop: "gxsj",
              },
              {
                label: "户籍地_省",
                modifiable: true,
                prop: "hjds",
              },
              {
                label: "户籍地_市",
                modifiable: true,
                prop: "hjdshi",
              },
              {
                label: "户籍地_县",
                modifiable: true,
                prop: "hjdx",
              },
              {
                label: "籍贯_省",
                modifiable: true,
                prop: "jgs",
              },
              {
                label: "籍贯_市",
                modifiable: true,
                prop: "jgshi",
              },
              {
                label: "籍贯_县",
                modifiable: true,
                prop: "jgx",
              },
            ],
          },
        ],
        [
          {
            title: "公安数据-人员电子档案",
            upfile: true,
            outfile: true,
            download: true,
            alldata: true,
            downloadUrl: "/ai/rydzda/export",
            action: "/ai/rydzda/upload",
            bid: 4,
            template: "/downFile/公安情报信息模块-人员电子档案.xlsx",
            headerList: [
              // {
              //   label: "头像照片",
              //   modifiable: true,
              //   prop: "txzp",
              // },
              {
                label: "姓名",
                modifiable: true,
                prop: "xm",
              },
              {
                label: "性别",
                modifiable: true,
                prop: "xb",
              },
              {
                label: "身份证号码",
                modifiable: true,
                prop: "sfzh",
              },
              {
                label: "民族",
                modifiable: true,
                prop: "mz",
              },
              {
                label: "出生日期",
                modifiable: true,
                prop: "csrq",
              },
              {
                label: "婚姻状况",
                modifiable: true,
                prop: "hyzk",
              },
              {
                label: "生肖",
                modifiable: true,
                prop: "sx",
              },
              {
                label: "星座",
                modifiable: true,
                prop: "xz",
              },
              {
                label: "别名绰号",
                modifiable: true,
                prop: "bmch",
              },
              {
                label: "曾用名",
                modifiable: true,
                prop: "cym",
              },
              {
                label: "身高",
                modifiable: true,
                prop: "sg",
              },
              {
                label: "血型",
                modifiable: true,
                prop: "xx",
              },
              {
                label: "最高学历",
                modifiable: true,
                prop: "zgxl",
              },
              {
                label: "政治面貌",
                modifiable: true,
                prop: "zzmm",
              },
              {
                label: "职业",
                modifiable: true,
                prop: "zy",
              },
              {
                label: "从业单位",
                modifiable: true,
                prop: "cydw",
              },
              {
                label: "兵役状况",
                modifiable: true,
                prop: "byzk",
              },
              {
                label: "体貌特征描述",
                modifiable: true,
                prop: "tmtzms",
              },
              {
                label: "出生地区划",
                modifiable: true,
                prop: "csdqh",
              },
              {
                label: "籍贯",
                modifiable: true,
                prop: "jg",
              },
              {
                label: "户籍地区划",
                modifiable: true,
                prop: "hjdqh",
              },
              {
                label: "户籍地址",
                modifiable: true,
                prop: "hjdz",
              },
              {
                label: "其他地址",
                modifiable: true,
                prop: "qtdz",
              },
              {
                label: "行为标签",
                modifiable: true,
                prop: "xwbq",
              },
            ],
          },
          {
            title: "公安数据-民航订票记录",
            upfile: true,
            outfile: true,
            download: true,
            alldata: true,
            downloadUrl: "/ai/mhdpjl/export",
            action: "/ai/mhdpjl/upload",
            bid: 11,
            template: "/downFile/公安情报信息模块-民航订票记录.xlsx",
            headerList: [
              {
                label: "旅客中文名",
                modifiable: true,
                prop: "lkzwm",
              },
              {
                label: "身份证号",
                modifiable: true,
                prop: "sfzh",
              },
              {
                label: "证件号码",
                modifiable: true,
                prop: "zjhm",
              },
              {
                label: "出发日期时间",
                modifiable: true,
                prop: "cfrqsj",
              },
              {
                label: "出发日期",
                modifiable: true,
                prop: "cfrq",
              },
              {
                label: "出发时间",
                modifiable: true,
                prop: "cfsj",
              },
              {
                label: "起飞机场",
                modifiable: true,
                prop: "qfjc",
              },
              {
                label: "到达机场",
                modifiable: true,
                prop: "ddjc",
              },
              {
                label: "旅客英文姓",
                modifiable: true,
                prop: "lkywx",
              },
              {
                label: "旅客英文名",
                modifiable: true,
                prop: "lkywm",
              },
              {
                label: "证件类型",
                modifiable: true,
                prop: "zjlx",
              },
              {
                label: "到达日期",
                modifiable: true,
                prop: "ddrq",
              },
              {
                label: "到达时间",
                modifiable: true,
                prop: "ddsj",
              },
              {
                label: "承运航空公司",
                modifiable: true,
                prop: "cyhkgs",
              },
              {
                label: "航班号",
                modifiable: true,
                prop: "hbh",
              },
              {
                label: "航班号后缀",
                modifiable: true,
                prop: "hbhhz",
              },
              {
                label: "VIP标识",
                modifiable: true,
                prop: "vipbs",
              },
              {
                label: "代理人编号",
                modifiable: true,
                prop: "dlrbh",
              },
              {
                label: "团体标识",
                modifiable: true,
                prop: "ttbs",
              },
              {
                label: "订座GDS",
                modifiable: true,
                prop: "dzgds",
              },
              {
                label: "共同订票标识",
                modifiable: true,
                prop: "gtdpbs",
              },
              {
                label: "索引Key值",
                modifiable: true,
                prop: "sykeyz",
              },
              {
                label: "客票状态",
                modifiable: true,
                prop: "kpzt",
              },
              {
                label: "操作类型",
                modifiable: true,
                prop: "czlx",
              },
              {
                label: "操作时间",
                modifiable: true,
                prop: "czsj",
              },
              {
                label: "删除判断标识",
                modifiable: true,
                prop: "scpdbs",
              },
              {
                label: "更新时间",
                modifiable: true,
                prop: "gxsj",
              },
              {
                label: "户籍地_省",
                modifiable: true,
                prop: "hjds",
              },
              {
                label: "户籍地_市",
                modifiable: true,
                prop: "hjdshi",
              },
              {
                label: "户籍地_县",
                modifiable: true,
                prop: "hjdx",
              },
              {
                label: "籍贯_省",
                modifiable: true,
                prop: "jgs",
              },
              {
                label: "籍贯_市",
                modifiable: true,
                prop: "jgshi",
              },
              {
                label: "籍贯_县",
                modifiable: true,
                prop: "jgx",
              },
            ],
          },
        ],
        [
          {
            title: "公安数据-全国驾驶人",
            upfile: true,
            outfile: true,
            download: true,
            alldata: true,
            downloadUrl: "/ai/qgjsr/export",
            action: "/ai/qgjsr/upload",
            bid: 5,
            template: "/downFile/公安情报信息模块-全国驾驶人.xlsx",
            headerList: [
              {
                label: "姓名",
                modifiable: true,
                prop: "xm",
              },
              {
                label: "证件号码",
                modifiable: true,
                prop: "zjhm",
              },
              {
                label: "性别",
                modifiable: true,
                prop: "xb",
              },
              {
                label: "出生日期",
                modifiable: true,
                prop: "csrq",
              },
              {
                label: "发证机关",
                modifiable: true,
                prop: "fzjg",
              },
              {
                label: "初次领证日期",
                modifiable: true,
                prop: "cclzrq",
              },
              {
                label: "准驾车型",
                modifiable: true,
                prop: "zjcx",
              },
              {
                label: "证件种类",
                modifiable: true,
                prop: "zjzl",
              },
              {
                label: "国籍/地区",
                modifiable: true,
                prop: "gjdq",
              },
              {
                label: "登记住所详址",
                modifiable: true,
                prop: "djzsxz",
              },
              {
                label: "联系住所详址",
                modifiable: true,
                prop: "lxzsxz",
              },
              {
                label: "暂住证编号",
                modifiable: true,
                prop: "zzzbh",
              },
              {
                label: "原准驾车型",
                modifiable: true,
                prop: "yzjcx",
              },
              {
                label: "有效期止",
                modifiable: true,
                prop: "yxqz",
              },
              {
                label: "有效期起",
                modifiable: true,
                prop: "yxqq",
              },
              {
                label: "驾驶证期限",
                modifiable: true,
                prop: "jszqx",
              },
              {
                label: "驾驶证状态",
                modifiable: true,
                prop: "jszzt",
              },
              {
                label: "驾驶证超分日期",
                modifiable: true,
                prop: "jszcfrq",
              },
              {
                label: "累积记分",
                modifiable: true,
                prop: "ljjf",
              },
              {
                label: "更新时间",
                modifiable: true,
                prop: "gxsj",
              },
            ],
          },
          {
            title: "公安数据-铁路售票信息",
            upfile: true,
            outfile: true,
            download: true,
            alldata: true,
            downloadUrl: "/ai/tlspxx/export",
            action: "/ai/tlspxx/upload",
            bid: 12,
            template: "/downFile/公安情报信息模块-铁路售票信息.xlsx",
            headerList: [
              {
                label: "姓名",
                modifiable: true,
                prop: "xm",
              },
              {
                label: "身份证号",
                modifiable: true,
                prop: "sfzh",
              },
              {
                label: "证件号码",
                modifiable: true,
                prop: "zjhm",
              },
              {
                label: "车号",
                modifiable: true,
                prop: "ch",
              },
              {
                label: "发车日期",
                modifiable: true,
                prop: "fcrq",
              },
              {
                label: "发站",
                modifiable: true,
                prop: "fz",
              },
              {
                label: "到站",
                modifiable: true,
                prop: "dz",
              },
              {
                label: "车厢号",
                modifiable: true,
                prop: "cxh",
              },
              {
                label: "座位号",
                modifiable: true,
                prop: "zwh",
              },
              {
                label: "票号",
                modifiable: true,
                prop: "ph",
              },
              {
                label: "车票状态",
                modifiable: true,
                prop: "cpzt",
              },
              {
                label: "证件类型",
                modifiable: true,
                prop: "zjlx",
              },
              {
                label: "更新时间",
                modifiable: true,
                prop: "gxsj",
              },
              {
                label: "信息删除标识",
                modifiable: true,
                prop: "xxscbs",
              },
              {
                label: "户籍地_省",
                modifiable: true,
                prop: "hjds",
              },
              {
                label: "户籍地_市",
                modifiable: true,
                prop: "hjdshi",
              },
              {
                label: "户籍地_县",
                modifiable: true,
                prop: "hjdx",
              },
              {
                label: "籍贯_省",
                modifiable: true,
                prop: "jgs",
              },
              {
                label: "籍贯_市",
                modifiable: true,
                prop: "jgshi",
              },
              {
                label: "籍贯_县",
                modifiable: true,
                prop: "jgx",
              },
            ],
          },
        ],
        [
          {
            title: "公安数据-全国机动车",
            upfile: true,
            outfile: true,
            download: true,
            alldata: true,
            downloadUrl: "/ai/qgjdc/export",
            action: "/ai/qgjdc/upload",
            bid: 6,
            template: "/downFile/公安情报信息模块-全国机动车.xlsx",
            headerList: [
              {
                label: "号牌种类",
                modifiable: true,
                prop: "hpzl",
              },
              {
                label: "号牌号码",
                modifiable: true,
                prop: "hphm",
              },
              {
                label: "中文品牌",
                modifiable: true,
                prop: "zwpp",
              },
              {
                label: "车辆识别代号",
                modifiable: true,
                prop: "clsbdh",
              },
              {
                label: "车辆类型",
                modifiable: true,
                prop: "cllx",
              },
              {
                label: "车身颜色",
                modifiable: true,
                prop: "csys",
              },
              {
                label: "发证机关",
                modifiable: true,
                prop: "fzjg",
              },
              {
                label: "初次登记日期",
                modifiable: true,
                prop: "ccdjrq",
              },
              {
                label: "机动车状态",
                modifiable: true,
                prop: "jdczt",
              },
              {
                label: "机动车所有人",
                modifiable: true,
                prop: "jdcsyr",
              },
              {
                label: "证件类别",
                modifiable: true,
                prop: "zjlb",
              },
              {
                label: "证件号码",
                modifiable: true,
                prop: "zjhm",
              },
              {
                label: "住所地址",
                modifiable: true,
                prop: "zsdz",
              },
              {
                label: "暂住证编号",
                modifiable: true,
                prop: "zzzbh",
              },
              {
                label: "暂住地址",
                modifiable: true,
                prop: "zzdz",
              },
              {
                label: "是否抵押/质押",
                modifiable: true,
                prop: "sfdyzy",
              },
              {
                label: "机动车档案编号",
                modifiable: true,
                prop: "jdcdabh",
              },
              {
                label: "机动车发动机号",
                modifiable: true,
                prop: "jdcfdjh",
              },
              {
                label: "机动车发动机型号",
                modifiable: true,
                prop: "jdcfdjxh",
              },
              {
                label: "机动车能源种类",
                modifiable: true,
                prop: "jdcnyzl",
              },
              {
                label: "机动车发动机排量",
                modifiable: true,
                prop: "jdcfdjpl",
              },
              {
                label: "机动车发动机功率",
                modifiable: true,
                prop: "jdcfdjgl",
              },
              {
                label: "机动车总质量",
                modifiable: true,
                prop: "jdczzl",
              },
              {
                label: "机动车核定载质量",
                modifiable: true,
                prop: "jdchdzzl",
              },
              {
                label: "机动车核定载客人数",
                modifiable: true,
                prop: "jdchdzkrs",
              },
              {
                label: "机动车准牵引总质量",
                modifiable: true,
                prop: "jdczqyzzl",
              },
              {
                label: "出厂日期",
                modifiable: true,
                prop: "ccrq",
              },
              {
                label: "机动车驾驶证号",
                modifiable: true,
                prop: "jdcjszh",
              },
              {
                label: "更新时间",
                modifiable: true,
                prop: "gxsj",
              },
            ],
          },
          {
            title: "公安数据-旅客住宿记录",
            upfile: true,
            outfile: true,
            download: true,
            alldata: true,
            downloadUrl: "/ai/lkzsxx/export",
            action: "/ai/lkzsxx/upload",
            bid: 13,
            template: "/downFile/公安情报信息模块-旅店住宿信息.xlsx",
            headerList: [
              {
                label: "姓名",
                modifiable: true,
                prop: "xm",
              },
              {
                label: "身份证号",
                modifiable: true,
                prop: "sfzh",
              },
              {
                label: "证件号码",
                modifiable: true,
                prop: "zjhm",
              },
              {
                label: "入住时间",
                modifiable: true,
                prop: "rzsj",
              },
              {
                label: "离店时间",
                modifiable: true,
                prop: "ldsj",
              },
              {
                label: "旅店名称",
                modifiable: true,
                prop: "ldmc",
              },
              {
                label: "房间号码",
                modifiable: true,
                prop: "fjhm",
              },
              {
                label: "旅店区划",
                modifiable: true,
                prop: "ldqh",
              },
              {
                label: "旅店地址",
                modifiable: true,
                prop: "lddz",
              },
              {
                label: "证件类型",
                modifiable: true,
                prop: "zjlx",
              },
              {
                label: "国籍/地区",
                modifiable: true,
                prop: "gjdq",
              },
              {
                label: "性别",
                modifiable: true,
                prop: "xb",
              },
              {
                label: "民族",
                modifiable: true,
                prop: "mz",
              },
              {
                label: "出生日期",
                modifiable: true,
                prop: "csrq",
              },
              {
                label: "户籍地区划",
                modifiable: true,
                prop: "hjdqh",
              },
              {
                label: "户籍地详址",
                modifiable: true,
                prop: "hjdxz",
              },
              {
                label: "旅店代码",
                modifiable: true,
                prop: "lddm",
              },
              {
                label: "旅店负责人",
                modifiable: true,
                prop: "ldfzr",
              },
              {
                label: "旅店房间数",
                modifiable: true,
                prop: "ldfjs",
              },
              {
                label: "旅店床位数",
                modifiable: true,
                prop: "ldcws",
              },
              {
                label: "所属派出所名称",
                modifiable: true,
                prop: "sspcsmc",
              },
              {
                label: "机构数据位置",
                modifiable: true,
                prop: "jgsjwz",
              },
              {
                label: "省级名称",
                modifiable: true,
                prop: "sjmc",
              },
              {
                label: "入库时间",
                modifiable: true,
                prop: "rksj",
              },
              {
                label: "更新时间",
                modifiable: true,
                prop: "gxsj",
              },
              {
                label: "信息删除标识",
                modifiable: true,
                prop: "xxscbs",
              },
              {
                label: "户籍地_省",
                modifiable: true,
                prop: "hjs",
              },
              {
                label: "户籍地_市",
                modifiable: true,
                prop: "hjshi",
              },
              {
                label: "户籍地_县",
                modifiable: true,
                prop: "hjdx",
              },
              {
                label: "籍贯_省",
                modifiable: true,
                prop: "jgs",
              },
              {
                label: "籍贯_市",
                modifiable: true,
                prop: "jgshi",
              },
              {
                label: "籍贯_县",
                modifiable: true,
                prop: "jgx",
              },
            ],
          },
        ],
        [
          {
            title: "公安数据-出入境证件",
            upfile: true,
            outfile: true,
            download: true,
            alldata: true,
            downloadUrl: "/ai/crjzj/export",
            action: "/ai/crjzj/upload",
            bid: 7,
            template: "/downFile/公安情报信息模块-出入境证件.xlsx",
            headerList: [
              {
                label: "姓名",
                modifiable: true,
                prop: "xm",
              },
              {
                label: "身份证号",
                modifiable: true,
                prop: "sfzh",
              },
              {
                label: "证件种类",
                modifiable: true,
                prop: "zjzl",
              },
              {
                label: "证件号码",
                modifiable: true,
                prop: "zjhm",
              },
              {
                label: "签发日期",
                modifiable: true,
                prop: "qfrq",
              },
              {
                label: "截止日期",
                modifiable: true,
                prop: "jzrq",
              },
              {
                label: "前往地国家/地区",
                modifiable: true,
                prop: "qwdgjdq",
              },
              {
                label: "签发机关",
                modifiable: true,
                prop: "qfjg",
              },
              {
                label: "性别",
                modifiable: true,
                prop: "xb",
              },
              {
                label: "民族",
                modifiable: true,
                prop: "mz",
              },
              {
                label: "出生日期",
                modifiable: true,
                prop: "csrq",
              },
              {
                label: "出生地国家/地区",
                modifiable: true,
                prop: "csdgjdq",
              },
              {
                label: "户口所在地",
                modifiable: true,
                prop: "hkszd",
              },
              {
                label: "所属派出所",
                modifiable: true,
                prop: "hjpcs",
              },
              {
                label: "出境事由",
                modifiable: true,
                prop: "cjsy",
              },
              {
                label: "入库时间",
                modifiable: true,
                prop: "rksj",
              },
              {
                label: "更新时间",
                modifiable: true,
                prop: "gxsj",
              },
            ],
          },
          {
            title: "公安数据-全部轨迹",
            upfile: true,
            outfile: true,
            download: true,
            alldata: true,
            downloadUrl: "/ai/qbgj/export",
            action: "/ai/qbgj/upload",
            bid: 14,
            template: "/downFile/公安情报信息模块-全部轨迹.xlsx",
            headerList: [
              {
                label: "标题",
                modifiable: true,
                prop: "bt",
              },
              {
                label: "姓名",
                modifiable: true,
                prop: "xm",
              },
              {
                label: "内容",
                modifiable: true,
                prop: "nr",
              },
            ],
          },
        ],
        [
          {
            title: "公安数据-机构法人信息",
            upfile: true,
            outfile: true,
            download: true,
            alldata: true,
            downloadUrl: "/ai/jgfrxx/export",
            action: "/ai/jgfrxx/upload",
            bid: 8,
            template: "/downFile/公安情报信息模块-机构法人信息.xlsx",
            headerList: [
              {
                label: "姓名",
                modifiable: true,
                prop: "xm",
              },
              {
                label: "证件号码",
                modifiable: true,
                prop: "zjhm",
              },
              {
                label: "机构名称",
                modifiable: true,
                prop: "jgmc",
              },
              {
                label: "机构类型",
                modifiable: true,
                prop: "jglx",
              },
              {
                label: "办证日期",
                modifiable: true,
                prop: "bzrq",
              },
              {
                label: "行政区划",
                modifiable: true,
                prop: "xzqh",
              },
              {
                label: "经营范围",
                modifiable: true,
                prop: "jyfw",
              },
              {
                label: "机构代码",
                modifiable: true,
                prop: "jgdm",
              },
              {
                label: "注册日期",
                modifiable: true,
                prop: "zcrq",
              },
              {
                label: "新经济行业",
                modifiable: true,
                prop: "xjjhy",
              },
              {
                label: "常用证件",
                modifiable: true,
                prop: "cyzj",
              },
              {
                label: "作废日期",
                modifiable: true,
                prop: "zfrq",
              },
              {
                label: "邮政编码",
                modifiable: true,
                prop: "yzbb",
              },
              {
                label: "机构地址",
                modifiable: true,
                prop: "jgdz",
              },
              {
                label: "经济类型",
                modifiable: true,
                prop: "jjlx",
              },
              {
                label: "年检期限",
                modifiable: true,
                prop: "njqx",
              },
              {
                label: "年检日期",
                modifiable: true,
                prop: "njrq",
              },
              {
                label: "变更日期",
                modifiable: true,
                prop: "bgrq",
              },
            ],
          },
          {
            title: "公安数据-出入境记录",
            upfile: true,
            outfile: true,
            download: true,
            alldata: true,
            downloadUrl: "/ai/crjjl/export",
            action: "/ai/crjjl/upload",
            bid: 15,
            template: "/downFile/公安情报信息模块-出入境记录.xlsx",
            headerList: [
              {
                label: "姓名",
                modifiable: true,
                prop: "xm",
              },
              {
                label: "国籍/地区",
                modifiable: true,
                prop: "gjdq",
              },
              {
                label: "性别",
                modifiable: true,
                prop: "xb",
              },
              {
                label: "身份证号",
                modifiable: true,
                prop: "sfzh",
              },
              {
                label: "证件类别",
                modifiable: true,
                prop: "zjlb",
              },
              {
                label: "证件号码",
                modifiable: true,
                prop: "zjhm",
              },
              {
                label: "出生日期",
                modifiable: true,
                prop: "csrq",
              },
              {
                label: "出入日期时间",
                modifiable: true,
                prop: "crrqsj",
              },
              {
                label: "出入日期",
                modifiable: true,
                prop: "crrq",
              },
              {
                label: "出入时间",
                modifiable: true,
                prop: "crrq",
              },
              {
                label: "出入口岸",
                modifiable: true,
                prop: "crka",
              },
              {
                label: "签证种类",
                modifiable: true,
                prop: "qzzl",
              },
              {
                label: "签证号码",
                modifiable: true,
                prop: "qzhm",
              },
              {
                label: "前往/归来国家/地区",
                modifiable: true,
                prop: "qwglgjdq",
              },
              {
                label: "出入境类别",
                modifiable: true,
                prop: "crjlb",
              },
              {
                label: "交通方式",
                modifiable: true,
                prop: "jtfs",
              },
              {
                label: "交通工具",
                modifiable: true,
                prop: "jtgj",
              },
              {
                label: "旅游团号",
                modifiable: true,
                prop: "lyth",
              },
              {
                label: "入库时间",
                modifiable: true,
                prop: "rksj",
              },
              {
                label: "更新时间",
                modifiable: true,
                prop: "gxsj",
              },
              {
                label: "操作类型",
                modifiable: true,
                prop: "czlx",
              },
              {
                label: "操作时间",
                modifiable: true,
                prop: "czsj",
              },
              {
                label: "户籍地_省",
                modifiable: true,
                prop: "hjds",
              },
              {
                label: "户籍地_市",
                modifiable: true,
                prop: "hjdshi",
              },
              {
                label: "户籍地_县",
                modifiable: true,
                prop: "hjdx",
              },
              {
                label: "籍贯_省",
                modifiable: true,
                prop: "jgs",
              },
              {
                label: "籍贯_市",
                modifiable: true,
                prop: "jgshi",
              },
              {
                label: "籍贯_县",
                modifiable: true,
                prop: "jgx",
              },
            ],
          },
        ],
        [
          {
            title: "公安数据-机动车违章",
            upfile: true,
            outfile: true,
            download: true,
            alldata: true,
            downloadUrl: "/ai/jdcwz/export",
            action: "/ai/jdcwz/upload",
            bid: 9,
            template: "/downFile/公安情报信息模块-机动车违章.xlsx",
            headerList: [
              {
                label: "当事人",
                modifiable: true,
                prop: "dsr",
              },
              {
                label: "驾驶证号",
                modifiable: true,
                prop: "jszh",
              },
              {
                label: "号牌号码",
                modifiable: true,
                prop: "hphm",
              },
              {
                label: "违法时间",
                modifiable: true,
                prop: "wfsj",
              },
              {
                label: "违法地址",
                modifiable: true,
                prop: "wfdz",
              },
              {
                label: "违法行为",
                modifiable: true,
                prop: "wfxw",
              },
              {
                label: "处理时间",
                modifiable: true,
                prop: "clsj",
              },
              {
                label: "处理机关",
                modifiable: true,
                prop: "cljg",
              },
              {
                label: "号牌种类",
                modifiable: true,
                prop: "hpzl",
              },
              {
                label: "更新时间",
                modifiable: true,
                prop: "gxsj",
              },
            ],
          },
          {
            title: "公安数据-银行核查信息",
            upfile: true,
            outfile: true,
            download: true,
            alldata: true,
            downloadUrl: "/ai/yhhcxx/export",
            action: "/ai/yhhcxx/upload",
            bid: 16,
            template: "/downFile/公安情报信息模块-银行核查信息.xlsx",
            headerList: [
              {
                label: "姓名",
                modifiable: true,
                prop: "xm",
              },
              {
                label: "身份证号",
                modifiable: true,
                prop: "sfzh",
              },
              {
                label: "核查时间",
                modifiable: true,
                prop: "hcsj",
              },
              {
                label: "银行名称",
                modifiable: true,
                prop: "yhmc",
              },
              {
                label: "银行地址",
                modifiable: true,
                prop: "yhdz",
              },
              {
                label: "核查结果",
                modifiable: true,
                prop: "hcjg",
              },
              {
                label: "核查耗时",
                modifiable: true,
                prop: "hchs",
              },
              {
                label: "认证码",
                modifiable: true,
                prop: "rzm",
              },
              {
                label: "银行代码",
                modifiable: true,
                prop: "yhdm",
              },
              {
                label: "银行性质",
                modifiable: true,
                prop: "yhxz",
              },
              {
                label: "银行类型",
                modifiable: true,
                prop: "yhlx",
              },
              {
                label: "银行所在省",
                modifiable: true,
                prop: "yhszs",
              },
              {
                label: "银行所在市",
                modifiable: true,
                prop: "yhszshi",
              },
              {
                label: "银行所在区县",
                modifiable: true,
                prop: "yhszqx",
              },
              {
                label: "银行邮编",
                modifiable: true,
                prop: "yhyb",
              },
              {
                label: "银行邮箱",
                modifiable: true,
                prop: "yhyx",
              },
              {
                label: "业务类型",
                modifiable: true,
                prop: "ywlx",
              },
              {
                label: "核查总数",
                modifiable: true,
                prop: "hczs",
              },
              {
                label: "核查人",
                modifiable: true,
                prop: "hcr",
              },
              {
                label: "入库时间",
                modifiable: true,
                prop: "rksj",
              },
              // {
              //   label: "id",
              //   prop: "id",
              // },
              {
                label: "户籍地_省",
                modifiable: true,
                prop: "hjds",
              },
              {
                label: "户籍地_市",
                modifiable: true,
                prop: "hjdshi",
              },
              {
                label: "户籍地_县",
                modifiable: true,
                prop: "hjdx",
              },
              {
                label: "籍贯_省",
                modifiable: true,
                prop: "jgs",
              },
              {
                label: "籍贯_市",
                modifiable: true,
                prop: "jgshi",
              },
              {
                label: "籍贯_县",
                modifiable: true,
                prop: "jgx",
              },
            ],
          },
        ],
        [
          {
            title: "资产-自然资源部",
            upfile: true,
            outfile: true,
            download: true,
            alldata: true,
            downloadUrl: "/ai/zrzyb/export",
            action: "/ai/zrzyb/upload",
            bid: 9,
            template: "/downFile/资产-自然资源部.xlsx",
            headerList: [
              {
                label: "反馈单位",
                modifiable: true,
                prop: "fkdw",
              },
              {
                label: "审批表",
                modifiable: true,
                prop: "spb",
              },
              {
                label: "名称",
                modifiable: true,
                prop: "mc",
              },
              {
                label: "证件类型",
                modifiable: true,
                prop: "zjlx",
              },
              {
                label: "是否有财产",
                modifiable: true,
                prop: "sfycc",
              },
              {
                label: "查询请求单号",
                modifiable: true,
                prop: "cxqqdh",
              },
              {
                label: "查询申请地区",
                modifiable: true,
                prop: "cxsqdq",
              },
              {
                label: "查询申请地区号",
                modifiable: true,
                prop: "cxsqdqh",
              },
              {
                label: "权利人名称",
                modifiable: true,
                prop: "qlrmc",
              },
              {
                label: "权利人证件号码",
                modifiable: true,
                prop: "qlrzjhm",
              },
              {
                label: "查询结果数",
                modifiable: true,
                prop: "cxjgs",
              },
              {
                label: "权力类型",
                modifiable: true,
                prop: "qllx",
              },
              {
                label: "不动产坐落",
                modifiable: true,
                prop: "bdczl",
              },
              {
                label: "不动产面积",
                modifiable: true,
                prop: "bdcmj",
              },
              {
                label: "规划用途",
                modifiable: true,
                prop: "ghyt",
              },
              {
                label: "共有权人名称",
                modifiable: true,
                prop: "gyqrmc",
              },
              {
                label: "共用方式",
                modifiable: true,
                prop: "gyfs",
              },
              {
                label: "不动产单元号",
                modifiable: true,
                prop: "bdcdyh",
              },
              {
                label: "不动产权证号",
                modifiable: true,
                prop: "bdcqzh",
              },
              {
                label: "登记时间",
                modifiable: true,
                prop: "djsj",
              },
              {
                label: "权属状态",
                modifiable: true,
                prop: "qszt",
              },
              {
                label: "是否抵押",
                modifiable: true,
                prop: "sfdy",
              },
              {
                label: "是否查封",
                modifiable: true,
                prop: "sfcf",
              },
              {
                label: "备注",
                modifiable: true,
                prop: "bz",
              },
              {
                label: "查询单位",
                modifiable: true,
                prop: "cxdw",
              },
            ],
          },
          {
            title: "金融机构-交易流水",
            upfile: true,
            outfile: true,
            download: true,
            alldata: true,
            downloadUrl: "/ai/jyls/export",
            action: "/ai/jyls/upload",
            bid: 9,
            template: "/downFile/金融机构-交易流水.xlsx",
            headerList: [
              {
                label: "反馈单位",
                modifiable: true,
                prop: "fkdw",
              },
              {
                label: "审批表",
                modifiable: true,
                prop: "spb",
              },
              {
                label: "名称",
                modifiable: true,
                prop: "mc",
              },
              {
                label: "证件类型",
                modifiable: true,
                prop: "zjlx",
              },
              {
                label: "证件号码",
                modifiable: true,
                prop: "zjhm",
              },
              {
                label: "查询对象名称",
                modifiable: true,
                prop: "cxdxmc",
              },
              {
                label: "查询卡号",
                modifiable: true,
                prop: "cxkh",
              },
              {
                label: "查询反馈结果原因",
                modifiable: true,
                prop: "cxfkjgyy",
              },
              {
                label: "本方账号",
                modifiable: true,
                prop: "bfzh",
              },
              {
                label: "本方卡号",
                modifiable: true,
                prop: "bfkh",
              },
              {
                label: "交易类型",
                modifiable: true,
                prop: "jylx",
              },
              {
                label: "借贷标志",
                modifiable: true,
                prop: "jdbz",
              },
              {
                label: "币种",
                modifiable: true,
                prop: "biz",
              },
              {
                label: "交易金额",
                modifiable: true,
                prop: "jyje",
              },
              {
                label: "交易余额",
                modifiable: true,
                prop: "jyye",
              },
              {
                label: "交易时间",
                modifiable: true,
                prop: "jysj",
              },
              {
                label: "交易流水号",
                modifiable: true,
                prop: "jylsh",
              },
              {
                label: "交易对方名称",
                modifiable: true,
                prop: "jydfmc",
              },
              {
                label: "交易对方账号",
                modifiable: true,
                prop: "jydfzh",
              },
              {
                label: "交易对方卡号",
                modifiable: true,
                prop: "jydfkh",
              },
              {
                label: "交易摘要",
                modifiable: true,
                prop: "jyzy",
              },
              {
                label: "交易网点名称",
                modifiable: true,
                prop: "jywdmc",
              },
              {
                label: "交易网点代码",
                modifiable: true,
                prop: "jywddm",
              },
              {
                label: "交易柜员号",
                modifiable: true,
                prop: "jygyh",
              },
              {
                label: "备注",
                modifiable: true,
                prop: "bz",
              },
            ],
          },
        ],
        [
          {
            title: "金融机构-金融理财",
            upfile: true,
            outfile: true,
            download: true,
            alldata: true,
            downloadUrl: "/ai/jrlc/export",
            action: "/ai/jrlc/upload",
            bid: 9,
            template: "/downFile/金融机构-金融理财.xlsx",
            headerList: [
              {
                label: "反馈单位",
                modifiable: true,
                prop: "fkdw",
              },
              {
                label: "审批表",
                modifiable: true,
                prop: "spb",
              },
              {
                label: "名称",
                modifiable: true,
                prop: "mc",
              },
              {
                label: "证件类型",
                modifiable: true,
                prop: "zjlx",
              },
              {
                label: "证件号码",
                modifiable: true,
                prop: "zjhm",
              },
              {
                label: "查询账户",
                modifiable: true,
                prop: "cxzh",
              },
              {
                label: "是否有财产",
                modifiable: true,
                prop: "sfycc",
              },
              {
                label: "查询反馈结果原因",
                modifiable: true,
                prop: "cxfkjgyy",
              },
              {
                label: "查询卡号",
                modifiable: true,
                prop: "cxkh",
              },
              {
                label: "理财卡号",
                modifiable: true,
                prop: "lckh",
              },
              {
                label: "理财账号",
                modifiable: true,
                prop: "lczh",
              },
              {
                label: "网银账户名称",
                modifiable: true,
                prop: "wyzhmc",
              },
              {
                label: "最后登录IP",
                modifiable: true,
                prop: "zhdlip",
              },
              {
                label: "最后登录时间",
                modifiable: true,
                prop: "zhdlsj",
              },
              {
                label: "账户类别",
                modifiable: true,
                prop: "zhlb",
              },
              {
                label: "账户状态",
                modifiable: true,
                prop: "zhzt",
              },
              {
                label: "开户网点",
                modifiable: true,
                prop: "khyh",
              },
              {
                label: "开户网点代码",
                modifiable: true,
                prop: "khyhdm",
              },
              {
                label: "开户日期",
                modifiable: true,
                prop: "khrq",
              },
              {
                label: "销户日期",
                modifiable: true,
                prop: "xhrq",
              },
              {
                label: "销户网点",
                modifiable: true,
                prop: "xhyh",
              },
              {
                label: "币种",
                modifiable: true,
                prop: "biz",
              },
              {
                label: "钞汇标志",
                modifiable: true,
                prop: "chbz",
              },
              {
                label: "账户余额",
                modifiable: true,
                prop: "zhye",
              },
              {
                label: "可用余额",
                modifiable: true,
                prop: "kyye",
              },
              {
                label: "最后交易时间",
                modifiable: true,
                prop: "zhjysj",
              },
              {
                label: "备注",
                modifiable: true,
                prop: "bz",
              },
            ],
          },
          {
            title: "中国人民银行-银行账户",
            upfile: true,
            outfile: true,
            download: true,
            alldata: true,
            downloadUrl: "/ai/rmyhzh/export",
            action: "/ai/rmyhzh/upload",
            bid: 9,
            template: "/downFile/中国人民银行-银行账户.xlsx",
            headerList: [
              {
                label: "反馈单位",
                modifiable: true,
                prop: "fkdw",
              },
              {
                label: "审批表",
                modifiable: true,
                prop: "spb",
              },
              {
                label: "名称",
                modifiable: true,
                prop: "mc",
              },
              {
                label: "证件类型",
                modifiable: true,
                prop: "zjlx",
              },
              {
                label: "证件号码",
                modifiable: true,
                prop: "zjhm",
              },
              {
                label: "查询账户",
                modifiable: true,
                prop: "cxzh",
              },
              {
                label: "是否有财产",
                modifiable: true,
                prop: "sfycc",
              },
              {
                label: "开户银行名称",
                modifiable: true,
                prop: "khyhmc",
              },
              {
                label: "帐号",
                modifiable: true,
                prop: "zh",
              },
              {
                label: "账户性质",
                modifiable: true,
                prop: "zhxz",
              },
              {
                label: "开户时间",
                modifiable: true,
                prop: "khsj",
              },
              {
                label: "销户时间",
                modifiable: true,
                prop: "xhsj",
              },
              {
                label: "账户状态",
                modifiable: true,
                prop: "zhzt",
              },
              {
                label: "银行机构代码",
                modifiable: true,
                prop: "yhjgdm",
              },
              {
                label: "账户名称",
                modifiable: true,
                prop: "zhmc",
              },
              {
                label: "证照号码",
                modifiable: true,
                prop: "zzhm",
              },
              {
                label: "反馈人",
                modifiable: true,
                prop: "fkr",
              },
              {
                label: "反馈录入时间",
                modifiable: true,
                prop: "fkrsj",
              },
              {
                label: "备注",
                modifiable: true,
                prop: "bz",
              },

            ],
          },
        ],
        [
          {
            title: "公安数据-亲属关系",
            upfile: false,
            outfile: true,
            download: false,
            alldata: true,
            action: "",
            bid: 10,
            template: "",
            headerList: [
              { label: "姓名", prop: "xm1" },
              { label: "关系", prop: "gx" },
              { label: "证件号码", prop: "sfzh1" },
              { label: "姓名", prop: "xm2" },
              { label: "证件号码", prop: "sfzh2" },
            ],
          },
        ],
      ],
      dialog: -1,
      tableName: "",
      headerList: [],
      projectId: null,
    };
  },
  mounted() {
    this.projectId = this.$route.query.id;
  },
  methods: {
    uploadEnd(res) {
      console.log(res);
      this.fileList = {};
      // this.$refs.ref_upload.clearFiles();
      this.$message.success("导入成功！");
    },
    allData(item) {
      this.tableName = item.title;
      this.headerList = item.headerList;
      this.dialog = 1;
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
    height: 50px;
    border-bottom: 1px solid #e8e8e8;
  }
  .rest-button {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 50;
  }
}
</style>
