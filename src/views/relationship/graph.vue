<template>
  <div>
    <div id="test-panel">
      <div class="line">
        <span class="lbl">随机生成：</span>
        <el-switch v-model="layoutOption.randomize" size="mini"></el-switch>
      </div>
      <div class="line">
        <span class="lbl">mass：</span>
        <el-input v-model="layoutOption.mass" size="mini" type="number" :step="1"></el-input>
      </div>
      <div class="line">
        <span class="lbl">theta：</span>
        <el-input v-model="layoutOption.theta" size="mini" type="number" :step="0.001"></el-input>
      </div>
      <div class="line">
        <span class="lbl">gravity：</span>
        <el-input v-model="layoutOption.gravity" size="mini" type="number" :step="0.01"></el-input>
      </div>
      <div class="line">
        <span class="lbl">springLength：</span>
        <el-input v-model="layoutOption.springLength" size="mini" type="number" :step="1"></el-input>
      </div>
      <div class="line">
        <span class="lbl">convergenceThreshold：</span>
        <el-input v-model="layoutOption.convergenceThreshold" size="mini" type="number" :step="0.01"></el-input>
      </div>
      <div class="line">
        <el-button size="mini" @click="handleUpdateLayout">更新</el-button>
      </div>
    </div>
    <div id="graphContainer"></div>
    <el-slider
      v-if="readySlider"
      class="slider-bar"
      height="800px"
      v-model="sliderVal"
      :min="min" range
      :max="max"
      :marks="marks"
      :step="1"
      vertical
      @change="handleChange"
    >
    </el-slider>
    <div class="inp">
      <el-input type="text" v-model="v1" size="mini" @blur="handleChangeInpt"></el-input>
      <span>-</span>
      <el-input type="text" v-model="v2" size="mini" @blur="handleChangeInpt"></el-input>
    </div>
  </div>
</template>
<script>
import {
  GetRelationshiop,
  GetGraphOne,
  SaveGraph,
  UpdateGraph,
} from "@/api/project";
import cytoscape from "cytoscape";
import cxtmenu from "cytoscape-cxtmenu";
import contextMenus from "cytoscape-context-menus";
import edgeEditing from "cytoscape-edge-editing/src/index";
import konva from "konva";
import jquery from "jquery";
import { gerFinalNodeAndLine } from "@/utils/nodeLayout";
import euler from 'cytoscape-euler'
import cola from 'cytoscape-cola'
import fcose from 'cytoscape-fcose'
import "cytoscape-context-menus/cytoscape-context-menus.css";
export default {
  props: {
    minJE: {
      type: Number,
      default: 0,
    },
    simple: {
      type: Boolean,
      default: false
    },
    pageType: {
      type: String,
      default: "SIMPLE"
    }
  },
  data() {
    return {
      cyObj: null,
      sliderVal: [0, 100],
      stepNum: 10,

      readySlider: false,
      marks: null,
      min: 0,
      max: 100,

      v1: 0,
      v2: 0,

      dataArr: [],
      isUpdate: false,

      sline: [],

      nodeBorderColor: {},

      // pageType: 'SIMPLE',

      layoutOption: {
        name: "fcose",
        randomize: false,
        animate: false,
        nodeSeparation: 120,
        sampleSize: 10,
        idealEdgeLength: 100,
        // randomize: false,
        // animate: false,
        // mass: 300,
        // theta: 0.666,
        // gravity: -0.02,
        // springLength: 100,

        nodeDimensionsIncludeLabels: true
        // convergenceThreshold: 0.01
      },
      layoutOptionSIM: {
        name: 'preset'
      },

      isFirst: true
    };
  },
  mounted() {
    cytoscape.use(cola)
    cytoscape.use(euler)
    cytoscape.use(fcose)
    cytoscape.use(cxtmenu);
    cytoscape.use(contextMenus);
    window.$ = jquery;
    edgeEditing(cytoscape, jquery, konva);

    let projectId = this.getQueryString("id", this.$route.fullPath);

    GetGraphOne({ projectId: projectId, pageType: this.pageType }).then((res) => {
      if (res.data) {
        let obj = JSON.parse(res.data.jsonstr);
        this.dataArr = obj.json;
        this.sliderVal = obj.val;
        this.isUpdate = true;
      } else {
        this.dataArr = [];
        this.sliderVal = [0, 100];
        this.isUpdate = false;
      }
      this.initInfo();
    });
    // this.initInfo()
  },
  methods: {
    handleUpdateLayout() {
      let layout = window.CY.layout(this.layoutOption)
      layout.run()
    },
    handleChangeInpt() {
      this.sliderVal = [this.v1, this.v2]
      this.handleChange(this.sliderVal)
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
    async initInfo() {
      const loading = this.$loading({
        lock: true,
        text: "正在加载数据，请稍候...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let projectId = this.getQueryString("id", this.$route.fullPath);

      let id = projectId;
      let obj = await GetRelationshiop(id);

      
      let { nodes, lines } = gerFinalNodeAndLine(obj.data, this.minJE, this.simple);
      

      for (let i = 0; i < lines.length; i++) {
        lines[i].data.label = ''
        if (lines[i].data.data.name == "密切人") {
          lines[i].data.label = '密切人'
        } else if (lines[i].data.data.name == "公司所有人") {
          lines[i].data.label = '公司所有人'
        } else {
          lines[i].data.label = "金额：" + this._getW(0, lines[i].data.data)
        }
      }

      if (lines.length > 0) {
        this.initSlideBar(lines, nodes);
      }

      let arr = nodes.concat(lines);

      // arr = this.mergeArr(arr);

      this.drawGraph(arr);

      this.handleChange(this.sliderVal);
      loading.close();
    },
    mergeArr(oldArr) {
      if (this.dataArr) {
        for (let o of oldArr) {
          if (!o.data.source) {
            for (let ea of this.dataArr) {
              if (o.data.id == ea.data.id) {
                o.position = ea.position;
              }
            }
          }
        }
      }
      return oldArr;
    },
    initSlideBar(lines, nodes) {
      let moneys = [];

      let nullIds = "";
      for (let n of nodes) {
        if (n.data.label == "空") {
          nullIds += n.data.id + ",";
        }
      }

      for (let l of lines) {
        if (
          nullIds.indexOf(l.data.source + ",") < 0 &&
          nullIds.indexOf(l.data.target + ",") < 0
        ) {
          if (l.data.data.name != "密切人" && l.data.data.name != "公司所有人") {
            let n = Number(l.data.data.name);
            n = parseInt(Math.abs(n) / 10000);
            moneys.push(n);
          }
        }
      }
      let min = 0; //Math.min(...moneys)
      let max = Math.max(...moneys);
      max = Math.max(max, 100);
      this.min = min;
      this.max = max + 10;

      if (!this.isUpdate) {
        if (!this.simple) {
          this.sliderVal[0] = this.max * 0.3
        }
        this.sliderVal[1] = this.max
      }

      let count = 10;
      this.stepNum = (max - min) / count;
      let ms = {};
      // for (let i = 0; i < 10; i++) {
      //   let inx = parseInt((i * 10 * max) / 100) + min;
      //   ms[inx] = (i * 10 * max) / 100 + min + "万";
      // }
      // ms[max] = max + "万";

      for (let i = 0; i < count; i++) {
        let number = parseInt(this.stepNum * i);
        ms[number] = parseInt(this.stepNum * i) + "万";
      }
      ms[max] = max + "万";

      this.marks = ms;

      setTimeout(() => {
        this.readySlider = true;
      }, 500);
    },
    initCxtMenu(cy) {
      cy.cxtmenu({
        selector: "edge",
        commands: [
          {
            content: "添加点",
            select: function (ele) {
              console.log("add");
            },
          },
        ],
      });
      cy.cxtmenu({
        selector: ".tempnode",
        commands: [
          {
            content: "删除点",
            select: function (ele) {
              console.log("delete");
            },
          },
        ],
      });
    },
    initEditLine(cy) {
      // let options = {
      //   // A function parameter to get bend point positions, should return positions of bend points
      //   bendPositionsFunction: function(ele) {
      //     return ele.data('bendPointPositions');
      //   },
      //   // A function parameter to get control point positions, should return positions of control points
      //   controlPositionsFunction: function(ele) {
      //     return ele.data('controlPointPositions');
      //   },
      //   // A function parameter to set bend point positions
      //   bendPointPositionsSetterFunction: function(ele, bendPointPositions) {
      //     ele.data('bendPointPositions', bendPointPositions);
      //   },
      //   // A function parameter to set bend point positions
      //   controlPointPositionsSetterFunction: function(ele, controlPointPositions) {
      //     ele.data('controlPointPositions', controlPointPositions);
      //   },
      //   // whether to initilize bend and control points on creation of this extension automatically
      //   initAnchorsAutomatically: true,
      //   // the classes of those edges that should be ignored
      //   ignoredClasses: [],
      //   // whether the bend editing operations are undoable (requires cytoscape-undo-redo.js)
      //   undoable: false,
      //   // the size of bend and control point shape is obtained by multipling width of edge with this parameter
      //   anchorShapeSizeFactor: 3,
      //   // z-index value of the canvas in which bend points are drawn
      //   zIndex: 999,
      //   /*An option that controls the distance (in pixels) within which a bend point is considered near the line segment between
      //     its two neighbors and will be automatically removed
      //     min value = 0 , max value = 20 , values less than 0 are set to 0 and values greater than 20 are set to 20
      //   */
      //   bendRemovalSensitivity : 8,
      //   // title of add bend point menu item (User may need to adjust width of menu items according to length of this option)
      //   addBendMenuItemTitle: "Add Bend Point",
      //   // title of remove bend point menu item (User may need to adjust width of menu items according to length of this option)
      //   removeBendMenuItemTitle: "Remove Bend Point",
      //   // title of remove all bend points menu item
      //   removeAllBendMenuItemTitle: "Remove All Bend Points",
      //   // title of add control point menu item (User may need to adjust width of menu items according to length of this option)
      //   addControlMenuItemTitle: "Add Control Point",
      //   // title of remove control point menu item (User may need to adjust width of menu items according to length of this option)
      //   removeControlMenuItemTitle: "Remove Control Point",
      //   // title of remove all control points menu item
      //   removeAllControlMenuItemTitle: "Remove All Control Points",
      //   // whether 'Remove all bend points' and 'Remove all control points' options should be presented to the user
      //   enableMultipleAnchorRemovalOption: false,
      //   // whether the bend and control points can be moved by arrows
      //   moveSelectedAnchorsOnKeyEvents: function () {
      //       return true;
      //   },
      //   // this function handles reconnection of the edge, if undefined simply connect edge to its new source/target
      //   // handleReconnectEdge (newSource.id(), newTarget.id(), edge.data())
      //   handleReconnectEdge: undefined,
      //   // this function checks validation of the edge and its new source/target
      //   validateEdge: function (edge, newSource, newTarget) {
      //     return 'valid';
      //   },
      //   // this function is called if reconnected edge is not valid according to validateEdge function
      //   actOnUnsuccessfulReconnection: undefined,
      //   // specifically for edge-editing menu items, whether trailing dividers should be used
      //   useTrailingDividersAfterContextMenuOptions: false,
      //   // Enable / disable drag creation of anchor points when there is at least one anchor already on the edge
      //   enableCreateAnchorOnDrag: true
      // }
      let instance = cy.edgeEditing({
        undoable: false,
        bendRemovalSensitivity: 16,
        enableMultipleAnchorRemovalOption: true,
        initAnchorsAutomatically: false,
        useTrailingDividersAfterContextMenuOptions: false,
        enableCreateAnchorOnDrag: true,
      });
      let a = cy.edgeEditing("initialized");
      cy.style().update();
    },

    refresh() {
      this.initInfo();
    },
    async save() {
      let json = window.CY.json()
      
      if (this.isUpdate) {
        await UpdateGraph({
          projectId: this.getQueryString("id", this.$route.fullPath),
          pageType: this.pageType,
          jsonstr: JSON.stringify({
            val: this.sliderVal,
            json: json,
          }),
        });
      } else {
        await SaveGraph({
          projectId: this.getQueryString("id", this.$route.fullPath),
          pageType: this.pageType,
          jsonstr: JSON.stringify({
            val: this.sliderVal,
            json: json,
          }),
        });
      }
      this.$message.success("保存成功！")
    },
    async save2() {
      let arr = [];
      let nodes = window.CY.nodes();
      let edges = window.CY.edges();

      for (let c of nodes) {
        let tmp = c.data();
        let st = c.style();
        let tmpstyle = {};
        if (st["background-image"]) {
          tmpstyle = { "background-image": st["background-image"] };
        }
        arr.push({ data: tmp, style: tmpstyle, position: c.position() });
      }
      for (let l of edges) {
        let tmp = l.data();
        arr.push({ data: tmp, classes: l.classes() });
      }

      if (this.isUpdate) {
        await UpdateGraph({
          projectId: this.getQueryString("id", this.$route.fullPath),
          pageType: this.pageType,
          jsonstr: JSON.stringify({
            val: this.sliderVal,
            arr: arr,
          }),
        });
      } else {
        await SaveGraph({
          projectId: this.getQueryString("id", this.$route.fullPath),
          pageType: this.pageType,
          jsonstr: JSON.stringify({
            val: this.sliderVal,
            arr: arr,
          }),
        });
      }
      this.$message.success("保存成功！");
    },

    drawGraph(arr) {
      if (window.CY) {
        window.CY.destroy();
      }
      let person = require("@/assets/gra/pe.png");
      let red = require("@/assets/icon/red.png");
      let green = require("@/assets/icon/green.png");
      let blue = require("@/assets/icon/blue.png");
      let yellow = require("@/assets/icon/yellow.png");

      var cy = cytoscape({
        container: document.getElementById("graphContainer"),
        elements: arr,
        wheelSensitivity: 0.1,
        layout: this.layoutOption,
        style: [
          {
            selector: "node",
            style: {
              width: 30,
              height: 30,
              "background-image": person,
              label: "data(label)",
              "background-clip": "none",
              "background-fit": "cover",
              "background-opacity": 0,
              color: "#fff",
              "font-size": 9,
            },
          },
          {
            selector: "node.red",
            style: {
              'background-image': red
            }
          },
          {
            selector: "node.green",
            style: {
              'background-image': green
            }
          },
          {
            selector: "node.blue",
            style: {
              'background-image': blue
            }
          },
          {
            selector: "node.yellow",
            style: {
              'background-image': yellow
            }
          },
          {
            selector: "edge",
            style: {
              width: 1,
              "line-color": "#00ffff",
              "source-arrow-color": "#ccc",
              "target-arrow-shape": "triangle",
              "curve-style": "unbundled-bezier",
              label: "data(label)",
              "edge-text-rotation": "autorotate",
              color: "#fff",
              "font-size": 9,
              "text-margin-x": 8,
              "text-margin-y": 8,
              "z-index": 9
              // "line-fill": "linear-gradient"
            },
          },
          {
            selector: "edge.red",
            style: {
              'line-color': '#ff0000'
            }
          },
          {
            selector: "edge.blue",
            style: {
              'line-color': '#00ffff'
            }
          },
          {
            selector: ".hide",
            style: {
              display: "none",
            },
          },
          {
            selector: ".specedge",
            style: {
              'line-style': 'dashed',
              'line-color': '#cccccc',
              'width': 2,
              'source-arrow-shape': 'none',
              'curve-style': 'unbundled-bezier',
              'control-point-step-size': 50,
              'control-point-weights': 0.5
            }
          }
        ],
      });

      cy.on("click", "node", (ev) => {
        let data = ev.target.data();
        this.$emit("chooseEvent", { type: "node", data: data.data });
      });
      cy.on("click", "edge", (ev) => {
        let data = ev.target.data();
        if (data.label != "密切人" && data.label != "公司所有人") {
          this.$emit("chooseEvent", { type: "line", data: data.data });
        }
      });
      // 右键点击edge触发
      // cy.on("cxttap", "edge", (ev) => {
      //   // 修改classes为segments
      //   let data = ev.target.data();
      //   let classes = ev.target.classes();
      //   // 遍历classes每个元素，如果包含segments
      //   let isSegments = false;
      //   classes.forEach((item) => {
      //     if (item.indexOf("segments") > -1) {
      //       isSegments = true;
      //     }
      //   });
      //   if (!isSegments) {
      //     ev.target.classes("segments");
      //   } else {
      //     let index = classes[0].split("-")[1] ? classes[0].split("-")[1] : 0;
      //     if (index == 5) {
      //       // 移除classes
      //       ev.target.classes("");
      //     } else {
      //       ev.target.classes("segments-" + (parseInt(index) + 1));
      //     }
      //   }
      // });
      // this.initCxtMenu(cy)
      // this.initEditLine(cy)

      window.CY = cy;
    },

    handleChange(ev) {
      this.v1 = ev[0]
      this.v2 = ev[1]
      let nodes = window.CY.nodes();
      let edges = window.CY.edges();
      let minMoney = ev[0];
      let maxMoney = ev[1]

      let mqrid = [];

      let showLines = [];
      for (let l of edges) {
        if (l.data().label == "密切人") {
          if (mqrid.indexOf(l.data().source) == -1) {
            mqrid.push(l.data().source);
          }
          if (mqrid.indexOf(l.data().target) == -1) {
            mqrid.push(l.data().target);
          }
        }

        let tmp = l.data();

        let num = tmp.data.name;
        if (num < 0) {
          num = num * -1;
        }
        num = num / 10000;
        if (num < 10) {
          l.style("width", 2);
        } else if (num >= 10 && num < 50) {
          l.style("width", 3);
        } else if (num >= 50 && num < 200) {
          l.style("width", 4);
        } else if (num >= 200 && num < 500) {
          l.style("width", 5);
        } else if (num >= 500 && num < 1000) {
          l.style("width", 6);
        } else if (num >= 1000) {
          l.style("width", 7);
        }

        if (tmp.data.name == "密切人" || tmp.data.name == '公司所有人') {
          // l.toggleClass('specedge', true)
          // // 设置为虚线
          l.style("line-style", "dashed");
          l.style("line-color", "#cccccc");
          l.style("width", 2);
          // 去掉箭头
          l.style("source-arrow-shape", "none");

          // 样式改为曲线
          l.style("curve-style", "straight");
          l.style("control-point-step-size", 50);
          l.style("control-point-weights", 0.5);
        } else {
          // console.log(tmp.data.relation);
          let json = {};
          let allnum = 0;
          let nameList = [];
          for (let i of tmp.data.relation) {
            let ix = i.change ? -1 : 1;
            if (parseFloat(i.jyje) * ix < 0) {
              if (!json[i.jydfmc + "-" + i.mc]) {
                json[i.jydfmc + "-" + i.mc] = 0;
                nameList.push(i.jydfmc + "-" + i.mc);
              }
              json[i.jydfmc + "-" + i.mc] +=
                parseFloat(i.jyje) < 0
                  ? parseFloat(i.jyje) * -1
                  : parseFloat(i.jyje);
              allnum +=
                parseFloat(i.jyje) < 0
                  ? parseFloat(i.jyje) * -1
                  : parseFloat(i.jyje);
            } else {
              if (!json[i.mc + "-" + i.jydfmc]) {
                json[i.mc + "-" + i.jydfmc] = 0;
                nameList.push(i.mc + "-" + i.jydfmc);
              }
              json[i.mc + "-" + i.jydfmc] +=
                parseFloat(i.jyje) < 0
                  ? parseFloat(i.jyje) * -1
                  : parseFloat(i.jyje);
              allnum +=
                parseFloat(i.jyje) < 0
                  ? parseFloat(i.jyje) * -1
                  : parseFloat(i.jyje);
            }
          }
          // console.log(json, allnum, json[nameList[0]] / allnum);

          // 取json中最小的值
          let minnumber = 0;
          for (let i of nameList) {
            if (minnumber == 0) {
              minnumber = json[i];
            } else {
              if (json[i] < minnumber) {
                minnumber = json[i];
              }
            }
          }

          if (nameList.length > 1) {
            // l.style("line-fill", "linear-gradient");
            // l.style("line-gradient-stop-colors", "#66b1ff #66b1ff #0f0 #0f0");
            // l.style(
            //   "line-gradient-stop-positions",
            //   `0% ${(minnumber / allnum) * 100}% ${
            //     (minnumber / allnum) * 100
            //   }% 100%`
            // );
          } else {
            // l.style("line-fill", "linear-gradient");
            // l.style("line-gradient-stop-colors", "#66b1ff #66b1ff");
            // l.style(
            //   "line-gradient-stop-positions",
            //   `0% ${(minnumber / allnum) * 100}% 100%`
            // );
          }
        }

        if (tmp.data.name == "密切人" || tmp.data.name == '公司所有人') {
          l.toggleClass("hide", false);
          showLines.push({
            source: l.source().id(),
            target: l.target().id(),
          });
        } else {
          let mon = Number(tmp.data.name);
          mon = Number(Math.abs(mon) / 10000);
          if (mon >= minMoney && mon <= maxMoney) {
            l.toggleClass("hide", false);
            showLines.push({
              source: l.source().id(),
              target: l.target().id(),
            });
          } else {
            l.toggleClass("hide", true);
          }
        }

        // window.CY.run()

        // // 获取起始点和终点的坐标
        // let source = l.source().position();
        // let target = l.target().position();
        // let x = (target.x - source.x) * 0.3;
        // let y = (target.y - source.y) * 0.3;

        // // 设置label偏移
        // l.style("text-margin-x", x);
        // l.style("text-margin-y", y);
      }
      for (let n of nodes) {
        let nid = n.id();
        let isshow = false;
        for (let l of showLines) {
          if (nid == l.source || nid == l.target) {
            isshow = true;
            break;
          }
        }
        // isshow = true;
        if (isshow) {
          n.toggleClass("hide", false);
        } else {
          n.toggleClass("hide", true);
        }

        if (n.data().data.nodeGroup != null) {
          n.style(
            "border-color",
            this.getNodeBorderColor(n.data().data.nodeGroup)
          );
          n.style("border-width", 3);
          n.style(
            "text-outline-color",
            this.getNodeBorderColor(n.data().data.nodeGroup)
          );
          n.style("text-outline-width", 1);
        }
        if (mqrid.indexOf(nid) != -1) {
          n.toggleClass("hide", false);
        }
      }

      if (this.isUpdate) {
        if (this.isFirst) {
          window.CY.json(this.dataArr)
          this.isFirst = false
          this.handleChange(this.sliderVal)
        } else {
          let layout = window.CY.layout(this.layoutOptionSIM)
          layout.run()
        }
        
      } else {
        let layout = window.CY.layout(this.layoutOption)
        layout.run()
      }
    },
    getNodeBorderColor(id) {
      if (!this.nodeBorderColor[id]) {
        this.nodeBorderColor[id] = this.getRandomColor();
      }
      return this.nodeBorderColor[id];
    },
    getRandomColor() {
      // 随机生成一个颜色
      return (
        "#" +
        (function (h) {
          return new Array(7 - h.length).join("0") + h;
        })(((Math.random() * 0x1000000) << 0).toString(16))
      );
    },
    _getW(num, l) {
      let moneyData = {}
      for(let r of l.relation) {
        let money = parseFloat(r.jyje)
        let name = r.mc + "-" + r.jydfmc

        if (money < 0) {
          name = r.jydfmc + "-" + r.mc
          money = money * -1
        }
        moneyData[name] = moneyData[name] ? moneyData[name] + money : money;
      }
      let rnum = 0
      for (let k in moneyData) {
        if (rnum == 0) {
          rnum = moneyData[k]
        } else {
          rnum = rnum - moneyData[k]
        }
      }
      rnum = Math.abs(rnum)

      let r = (num / 10000).toFixed(1) + "万"

      return (rnum / 10000).toFixed(1) + "万"
    }
  },
};
</script>
<style lang="scss">
#test-panel{
  display: none;
  position: absolute;
  left: 30px;top: 30px;
  z-index: 9999;
  background: #0ff;
  padding: 20px;
  .line{
    margin: 0 0 10px 0;
    display: flex;
    align-items: center;
    .lbl{
      width: 100px;
    }
  }
}
.inp{
  display: flex;
  justify-content: space-between;
  position: absolute !important;
  width: 125px;
  bottom: 45px;
  right: 39px;
}
#graphContainer {
  position: absolute;
  width: 100%;
  height: calc(100% - 100px);
}
.slider-bar {
  position: absolute !important;
  // height: 300px;
  width: 100px;
  right: 21px;
  bottom: 90px;

  .el-slider__marks-text {
    white-space: nowrap;
  }
}
</style>
