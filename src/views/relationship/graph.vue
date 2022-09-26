<template>
  <div>
    <div id="graphContainer"></div>
    <el-slider
      v-if="readySlider"
      class="slider-bar"
      height="800px"
      v-model="sliderVal"
      :min="min"
      :max="max"
      :marks="marks"
      :step="1"
      vertical
      @change="handleChange"
    >
    </el-slider>
  </div>
</template>
<script>
import { GetRelationshiop, GetGraphOne, SaveGraph, UpdateGraph } from "@/api/project";
import cytoscape from "cytoscape";
import cxtmenu from "cytoscape-cxtmenu";
import contextMenus from "cytoscape-context-menus";
import edgeEditing from "cytoscape-edge-editing/src/index";
import konva from "konva";
import jquery from "jquery";
import { gerFinalNodeAndLine } from "@/utils/nodeLayout";
import "cytoscape-context-menus/cytoscape-context-menus.css";
export default {
  props: {
    minJE: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      cyObj: null,
      sliderVal: 0,
      stepNum: 10,

      readySlider: false,
      marks: null,
      min: 0,
      max: 100,

      dataArr: [],
      isUpdate: false,

      sline: [],

      nodeBorderColor: {},
    };
  },
  mounted() {
    cytoscape.use(cxtmenu);
    cytoscape.use(contextMenus);
    window.$ = jquery;
    edgeEditing(cytoscape, jquery, konva);

    let projectId = this.getQueryString("id", this.$route.fullPath);

    GetGraphOne({ projectId: projectId }).then((res) => {
      if (res.data) {
        let obj = JSON.parse(res.data.jsonstr);
        this.dataArr = obj.arr;
        this.sliderVal = obj.val;
        this.isUpdate = true;
      } else {
        this.dataArr = [];
        this.sliderVal = 0;
        this.isUpdate = false;
      }
      this.initInfo();
    });
    // this.initInfo()
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

      let { nodes, lines } = gerFinalNodeAndLine(obj.data, this.minJE);

      // console.log("=====================");
      // console.log(nodes, lines);
      // line新增classes与id相同
      for (let i = 0; i < lines.length; i++) {
        // lines[i].data.classes =
        //   lines[i].data.source + "===" + lines[i].data.target;
        // lines[i].classes = "segments";
        // this.sline.push(lines[i].data.classes);
        // console.log(lines[i].data.source);
        lines[i].classes = [];
        lines[i].data.label =
          lines[i].data.data.name == "密切人"
            ? "密切人"
            : "金额：" +
              (lines[i].data.data.name < 0
                ? ((lines[i].data.data.name * -1) / 10000).toFixed(2)
                : (lines[i].data.data.name / 10000).toFixed(2)) +
              "万";
        for (let j of this.dataArr) {
          // console.log(j.data.id, lines[i].data.id);
          if (
            j.data.source == lines[i].data.source &&
            j.data.target == lines[i].data.target
          ) {
            // lines[i].data.classes=j.data.classes
            // console.log(j.classes[0]);
            lines[i].classes[0] = j.classes[0] ? j.classes[0] : "";
          }
        }
        // 取lines[i].data.data.name正数
        // let num = lines[i].data.data.name;
        // if (num < 0) {
        //   num = num * -1;
        // }
        // num = num / 10000;
        // if (num < 10) {
        //   lines[i].classes.push("edge2");
        // } else if (num >= 10 && num < 50) {
        //   lines[i].classes.push("edge3");
        // } else if (num >= 50 && num < 200) {
        //   lines[i].classes.push("edge4");
        // } else if (num >= 200 && num < 500) {
        //   lines[i].classes.push("edge5");
        // } else if (num >= 500 && num < 1000) {
        //   lines[i].classes.push("edge6");
        // } else if (num >= 1000) {
        //   lines[i].classes.push("edge7");
        // }
      }
      // console.log(nodes, lines);

      if (lines.length > 0) {
        this.initSlideBar(lines, nodes);
      }

      let arr = nodes.concat(lines);

      arr = this.mergeArr(arr);

      // console.log(arr)
      // for (let a of arr) {
      //   if (a.data.source == '1513' || a.data.target == '1513') {
      //     console.log(a)
      //   }
      // }

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
          if (l.data.data.name != "密切人") {
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
      this.max = max;

      console.log(max);

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
        ms[number] = this.stepNum * i + "万";
      }
      ms[max] = max + "万";

      this.marks = ms;
      console.log(ms);

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
          jsonstr: JSON.stringify({
            val: this.sliderVal,
            arr: arr,
          }),
        });
      } else {
        await SaveGraph({
          projectId: this.getQueryString("id", this.$route.fullPath),
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
      var cy = cytoscape({
        container: document.getElementById("graphContainer"),
        elements: arr,
        wheelSensitivity: 0.1,
        layout: {
          name: "preset",
        },
        style: [
          {
            selector: "node",
            style: {
              width: 100,
              height: 100,
              "background-image": person,
              label: "data(label)",
              "background-clip": "none",
              "background-fit": "cover",
              "background-opacity": 0,
              color: "#fff",
              "font-size": 20,
            },
          },
          {
            selector: "edge",
            style: {
              width: 6,
              "line-color": "#66b1ff",
              "source-arrow-color": "#ccc",
              "source-arrow-shape": "triangle",
              "curve-style": "bezier",
              label: "data(label)",
              "edge-text-rotation": "autorotate",
              color: "#fff",
              "font-size": 20,
              "source-text-offset": 1000,
              "line-fill": "linear-gradient",
            },
          },

          {
            selector: "edge2",
            style: {
              width: 2,
            },
          },
          {
            selector: "edge3",
            style: {
              width: 3,
            },
          },
          {
            selector: "edge4",
            style: {
              width: 4,
            },
          },
          {
            selector: "edge5",
            style: {
              width: 5,
            },
          },
          {
            selector: "edge6",
            style: {
              width: 6,
            },
          },
          {
            selector: "edge7",
            style: {
              width: 7,
            },
          },
          {
            selector: ".hide",
            style: {
              display: "none",
            },
          },
          {
            selector: "edge.segments",
            style: {
              "curve-style": "segments",
              // "segment-distances": [40, -40],
              // "segment-weights": [0.25, 0.75],
              "segment-distances": [20],
              "segment-weights": [0.5],
            },
          },
          {
            selector: "edge.segments-0",
            style: {
              "curve-style": "segments",
              // "segment-distances": [40, -40],
              // "segment-weights": [0.25, 0.75],
              "segment-distances": [20],
              "segment-weights": [0.5],
            },
          },
          {
            selector: "edge.segments-1",
            style: {
              "curve-style": "segments",
              // "segment-distances": [40, -40],
              // "segment-weights": [0.25, 0.75],
              "segment-distances": [30],
              "segment-weights": [0.5],
            },
          },
          {
            selector: "edge.segments-2",
            style: {
              "curve-style": "segments",
              // "segment-distances": [40, -40],
              // "segment-weights": [0.25, 0.75],
              "segment-distances": [40],
              "segment-weights": [0.5],
            },
          },
          {
            selector: "edge.segments-3",
            style: {
              "curve-style": "segments",
              // "segment-distances": [40, -40],
              // "segment-weights": [0.25, 0.75],
              "segment-distances": [20, 20],
              "segment-weights": [0.25, 0.75],
            },
          },
          {
            selector: "edge.segments-4",
            style: {
              "curve-style": "segments",
              // "segment-distances": [40, -40],
              // "segment-weights": [0.25, 0.75],
              "segment-distances": [30, 30],
              "segment-weights": [0.25, 0.75],
            },
          },
          {
            selector: "edge.segments-5",
            style: {
              "curve-style": "segments",
              // "segment-distances": [40, -40],
              // "segment-weights": [0.25, 0.75],
              "segment-distances": [40, 40],
              "segment-weights": [0.25, 0.75],
            },
          },
          // this.sline.forEach((item) => {
          //   return {
          //     data: {
          //       source: item.split("===")[0],
          //       target: item.split("===")[1],
          //     },
          //     classes: item,
          //   };
          // }),
        ],
      });

      cy.on("click", "node", (ev) => {
        let data = ev.target.data();
        this.$emit("chooseEvent", { type: "node", data: data.data });
      });
      cy.on("click", "edge", (ev) => {
        let data = ev.target.data();
        if (data.label != "密切人") {
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
      let nodes = window.CY.nodes();
      let edges = window.CY.edges();
      let minMoney = ev;

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

        if (tmp.data.name == "密切人") {
          // 设置为虚线
          l.style("line-style", "dashed");
          l.style("width", 2);
          // 去掉箭头
          l.style("source-arrow-shape", "none");

          // 样式改为曲线
          l.style("curve-style", "unbundled-bezier");
          l.style("control-point-step-size", 50);
          l.style("control-point-weights", 0.5);
        } else {
          console.log(tmp);
          // console.log(tmp.data.relation);
          let json = {};
          let allnum = 0;
          let nameList = [];
          for (let i of tmp.data.relation) {
            let ix = i.change ? -1 : 1;
            if (parseFloat(i.jyje) * ix < 0) {
              if (!json[i.jydfmc + "-" + i.cxdxmc]) {
                json[i.jydfmc + "-" + i.cxdxmc] = 0;
                nameList.push(i.jydfmc + "-" + i.cxdxmc);
              }
              json[i.jydfmc + "-" + i.cxdxmc] +=
                parseFloat(i.jyje) < 0 ? parseFloat(i.jyje) * -1 : parseFloat(i.jyje);
              allnum +=
                parseFloat(i.jyje) < 0 ? parseFloat(i.jyje) * -1 : parseFloat(i.jyje);
            } else {
              if (!json[i.cxdxmc + "-" + i.jydfmc]) {
                json[i.cxdxmc + "-" + i.jydfmc] = 0;
                nameList.push(i.cxdxmc + "-" + i.jydfmc);
              }
              json[i.cxdxmc + "-" + i.jydfmc] +=
                parseFloat(i.jyje) < 0 ? parseFloat(i.jyje) * -1 : parseFloat(i.jyje);
              allnum +=
                parseFloat(i.jyje) < 0 ? parseFloat(i.jyje) * -1 : parseFloat(i.jyje);
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
            l.style("line-fill", "linear-gradient");
            l.style("line-gradient-stop-colors", "#66b1ff #66b1ff #0f0 #0f0");
            l.style(
              "line-gradient-stop-positions",
              `0% ${(minnumber / allnum) * 100}% ${(minnumber / allnum) * 100}% 100%`
            );
          } else {
            l.style("line-fill", "linear-gradient");
            l.style("line-gradient-stop-colors", "#66b1ff #66b1ff");
            l.style(
              "line-gradient-stop-positions",
              `0% ${(minnumber / allnum) * 100}% 100%`
            );
          }
        }

        if (tmp.data.name == "密切人") {
          l.toggleClass("hide", false);
          showLines.push({
            source: l.source().id(),
            target: l.target().id(),
          });
        } else {
          let mon = Number(tmp.data.name);
          mon = parseInt(Math.abs(mon) / 10000);
          if (mon >= minMoney) {
            l.toggleClass("hide", false);
            showLines.push({
              source: l.source().id(),
              target: l.target().id(),
            });
          } else {
            l.toggleClass("hide", true);
          }
        }

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
          n.style("border-color", this.getNodeBorderColor(n.data().data.nodeGroup));
          n.style("border-width", 5);
          n.style("text-outline-color", this.getNodeBorderColor(n.data().data.nodeGroup));
          n.style("text-outline-width", 2);
        }
        if (mqrid.indexOf(nid) != -1) {
          n.toggleClass("hide", false);
        }
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
  },
};
</script>
<style lang="scss">
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
