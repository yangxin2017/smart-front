<template>
  <div class="mbs" v-if="dialogVisible">
    <div
      class="dialog-container"
      :class="{ sml: dialogType == 'node' }"
      v-if="dialogVisible"
    >
      <div v-html="htmlstr"></div>
      <div class="footer">
        <a class="close-btn" @click="dialogVisible = false">关闭</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      htmlstr: "",

      dialogType: "node",
    };
  },
  methods: {
    _getW(num, obj) {
      let ix = obj.change ? -1 : 1;
      let r = ((ix * num) / 10000).toFixed(1) + "万";
      return r;
    },
    show(params) {
      console.log(params);
      let html = "";
      this.dialogType = params.type;
      if (params.type == "node") {
        let user = params.data.user;
        let company = params.data.company;
        if (params.data.nodeType != "COMPANY" && user) {
          html = `
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
              </div>
            </div>
          `;
        } else if (params.data.nodeType == "COMPANY" && company) {
          html = `
            <div class='echarts-dialog-class'>
              <div class='title'>${params.data.nodeName}</div>
              <div class='content'>
                <span>法人：</span>
                </span>${company.xm}</span>
              </div>
              <div class='content'>
                <span>身份证号：</span>
                </span>${company.sfzh ? company.sfzh : ""}</span>
              </div>
              <div class='content'>
                <span>机构类型：</span>
                </span>${company.jglx ? company.jglx : ""}</span>
              </div>
              <div class='content'>
                <span>机构代码：</span>
                </span>${company.jgdm ? company.jgdm : ""}</span>
              </div>
            </div>
          `;
        }
      } else {
        let moneyData = {};
        let relations = params.data.relation;
        html = `<div class='echarts-dialog-class'><div class='title'>交易详情</div>`;
        html += `<table><thead>
          <tr>
            <th>目标人</th>
            <th>目标卡号</th>
            <th>对方人</th>
            <th>对方卡号</th>
            <th>交易金额</th>
            <th>交易时间</th>
            <th>摘要</th>
          </tr>
          <tbody>
          `;
        for (let r of relations) {
          let name = r.cxdxmc + "-" + r.jydfmc;
          let money = parseFloat(r.jyje);
          if (r.change) {
            money = money * -1;
          }
          if (money < 0) {
            name = r.jydfmc + "-" + r.cxdxmc;
            money = money * -1;
          }
          moneyData[name] = moneyData[name] ? moneyData[name] + money : money;
          html += `
          <tr>
            <td>${r.cxdxmc}</td>
            <td>${r.bfkh}</td>
            <td>${r.jydfmc}</td>
            <td>${r.jydfzh}</td>
            <td>${this._getW(r.jyje, r)}</td>
            <td>${r.jysj}</td>
            <td>${r.jyzy}</td>
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
        html += `</tbody></table>${moneyHtml}</div>`;
      }
      this.htmlstr = html;
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
    width: 30%;
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
