<template>
  <div class="mbs" v-if="dialogVisible">
    <div
      class="dialog-container"
      :class="{ sml: dialogType == 'node' }"
      v-if="dialogVisible"
    >
      <div>
        <div v-html="htmlstr"></div>
      </div>
      <div class="footer">
        <a class="close-btn" @click="dialogVisible = false">关闭</a>
      </div>
    </div>
  </div>
</template>
<script>
import { GetSELFRelationshiop } from '@/api/project'
import cytoscape from "cytoscape";
export default {
  data() {
    return {
      dialogVisible: false,
      htmlstr: "",

      dialogType: "node",

      tablestr: ''
    };
  },
  methods: {
    _getW(num, obj) {
      let ix = obj.change ? -1 : 1;
      let r = ((ix * num) / 10000).toFixed(1) + "万";
      return r;
    },
    async _getSELFInfo(projectId, userId, user) {
      let obj = await GetSELFRelationshiop(projectId, userId)
      let arr = []
      let rows = []
      for (let n of obj.data.nodes) {
        arr.push({ data: { id: n.id, label: n.nodeName } })
      }
      for (let l of obj.data.lines) {
        let name = Number(parseInt(l.name) / 10000).toFixed(1) + '万'
        arr.push({ data: { id: l.id, source: l.sid, target: l.eid, label: name } })

        for (let ll of l.relation) {
          rows.push(ll)
        }
      }

      this.tablestr = ''
      if (obj.data.nodes.length > 0 && rows.length > 0) {
        this.tablestr = `
          <table>
            <thead>
              <tr>
                <th>卡1</th>
                <th>卡2</th>
                <th>金额</th>
              </tr>
            </thead>
            <tbody>
        `
        for (let r of rows) {
          let je = Number(parseInt(r.jyje) / 10000).toFixed(1)
          this.tablestr += `<tr>
            <td>${r.bfkh}</td>
            <td>${r.jydfkh}</td>
            <td>${je}万</td>
          </tr>`
        }
        this.tablestr += '</tbody></table>'
      }

      let html = `
        <div class='echarts-dialog-class sml'>
          <div class='title'>${user.xm}</div>
          <div class='content'>
            <span>姓名：</span>
            </span>${user.xm}</span>
          </div>
          <div class='content'>
            <span>性别：</span>
            </span>${user.xb}</span>
          </div>
          <div class='content'>
            <span>身份证号：</span>
            </span>${user.sfzh}</span>
          </div>
          <div class='content'>
            <span>民族：</span>
            </span>${user.mz}</span>
          </div>
          <div class='content'>
            <span>血型：</span>
            </span>${user.xx}</span>
          </div>`;
      if(this.tablestr) {
        html += `<div class="graph-container-self">
              <div id="graphContainerSELF"></div>
              <div class="table">
                ${this.tablestr}
              </div>
            </div>
          </div>
        `;
      } else {
        html += `</div>`
      }
      this.htmlstr = html;

      setTimeout(() => {
        if (window.CY_SELF) {
          window.CY_SELF.destroy();
        }
        var cy = cytoscape({
          container: document.getElementById("graphContainerSELF"),
          elements: arr,
          wheelSensitivity: 0.1,
          layout: {
            name: "circle",
          },
          style: [
            {
              selector: "node",
              style: {
                width: 30,
                height: 30,
                label: "data(label)",
                'background-color': '#0ff',
                "background-clip": "none",
                "background-fit": "cover",
                color: "#fff",
                "font-size": 20,
              },
            },
            {
              selector: "edge",
              style: {
                width: 2,
                "line-color": "#f90",
                "source-arrow-color": "#ccc",
                "target-arrow-shape": "triangle",
                "curve-style": "bezier",
                label: "data(label)",
                "edge-text-rotation": "autorotate",
                color: "#fff",
                "font-size": 20,
                "text-margin-x": 10,
                "text-margin-y": 10,
              },
            }
          ],
        })
        window.CY_SELF = cy
      }, 500)
      return html
    },
    async show(params) {
      console.log(params);

      let html = "";
      this.dialogType = params.type;
      if (params.type == "node") {
        let user = params.data.user;
        let company = params.data.company;
        if (params.data.nodeType.indexOf("COMPANY") < 0 && user) {
          
          html = this._getSELFInfo(user.projectId, user.id, user)
          
        } else if (params.data.nodeType.indexOf("COMPANY") >= 0 && company) {
          html = `
            <div class='echarts-dialog-class'>
              <div class='title'>${params.data.nodeName}</div>
              <div class='content'>
                <span>法人：</span>
                </span>${company.fddbr}</span>
              </div>
              <div class='content'>
                <span>机构名称：</span>
                </span>${company.qyjgmc ? company.qyjgmc : ""}</span>
              </div>
              <div class='content'>
                <span>机构类型：</span>
                </span>${company.scztlx ? company.scztlx : ""}</span>
              </div>
              <div class='content'>
                <span>登记状态：</span>
                </span>${company.djzt ? company.djzt : ""}</span>
              </div>
            </div>
          `;
        }
        this.htmlstr = html;
      } else {
        let moneyData = {};
        let relations = params.data.relation;
        html = `<div class='echarts-dialog-class'><div class='title'>交易详情</div>`;
        html += `<div class='table-con'><table><thead>
          <tr>
            <th>反馈单位</th>
            <th>名称</th>
            <th>证件号码</th>
            <th>查询卡号</th>
            <th>本方账号</th>
            <th>本方卡号</th>
            <th>交易类型</th>
            <th>借贷标志</th>
            <th>交易金额</th>
            <th>交易时间</th>
            <th>交易对方名称</th>
            <th>交易对方账号</th>
            <th>交易摘要</th>
            <th>交易网点名称</th>
            <th>备注</th>
          </tr>
          <tbody>
          `;
        for (let r of relations) {
          let money = parseFloat(r.jyje);
          let name = r.jydfmc + "-" + r.mc;
          
          // if (r.change) {
          //   money = money * -1;
          // }
          if (money < 0) {
            name = r.mc + "-" + r.jydfmc;
            money = money * -1;
          }
          console.log(name)
          moneyData[name] = moneyData[name] ? moneyData[name] + money : money;
          html += `
          <tr>
            <td>${r.fkdw}</td>
            <td>${r.mc}</td>
            <td>${r.zjhm}</td>
            <td>${r.cxkh}</td>
            <td>${r.bfzh}</td>
            <td>${r.bfkh}</td>
            <td>${r.jylx}</td>
            <td>${r.jdbz}</td>
            <td>${this._getW(r.jyje, r)}</td>
            <td>${r.jysj}</td>
            <td>${r.jydfmc}</td>
            <td>${r.jydfzh}</td>
            <td>${r.jyzy}</td>
            <td>${r.jywdmc}</td>
            <td>${r.remark}</td>
          </tr>`;
        }
        console.log(moneyData);
        let moneyHtml = `<div class='money'>`;
        for (let key in moneyData) {
          moneyHtml += `<div class='money-item'><span>${key}：</span><span>${this._getW(
            moneyData[key],
            {}
          )}</span></div>`;
        }
        moneyHtml += `</div>`;
        html += `</tbody></table>${moneyHtml}</div></div>`;

        this.htmlstr = html;
      }
      
      this.dialogVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.mbs {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.66);
}
.dialog-container {
  position: absolute;
  width: 50%;
  height: auto;
  left: 50%;
  top: 50%;
  margin: -250px 0 0 -25%;
  &.sml {
    width: 50%;
    height: auto;
    margin: -250px 0 0 -15%;
  }
  .footer {
    position: absolute;
    bottom: 3px;
    left: 1%;
    width: 98%;
    height: 40px;
    text-align: right;
    background: #000;
    a {
      color: #fff;
      display: inline-block;
      border: solid 1px #0ff;
      border-radius: 4px;
      padding: 2px 5px;
      cursor: pointer;
      margin: 10px 10px 0 0;
    }
  }
}
</style>
