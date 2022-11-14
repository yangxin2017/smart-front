<template>
<vue-resizable width="800px" height="500px" left="30%" top="30%" style="position:absolute;" dragSelector=".dialog-search">
  <div class="dialog-search">
    <i class="el-icon-close close" @click="handleClose"></i>
    <div class="header">
      <b>查询条件：</b><small>{{ conditions }}</small>
    </div>
    <div class="tables" v-loading="loading">
      <el-table :data="tableList" border style="width: 100%" @sort-change="handleSortChange">
        <el-table-column prop="mc" label="名称"></el-table-column>
        <el-table-column prop="bfkh" label="卡号"></el-table-column>
        <el-table-column prop="jyje" label="交易金额"></el-table-column>
        <el-table-column prop="jysj" label="交易时间" sortable></el-table-column>
        <el-table-column prop="jydfmc" label="对方名称"></el-table-column>
        <el-table-column prop="jydfzh" label="对方账号"></el-table-column>
        <el-table-column prop="jydfkh" label="对方卡号"></el-table-column>
      </el-table>
    </div>
    <div class="pages">
      <el-pagination @current-change="handleChangePage"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</vue-resizable>
</template>
<script>
import {
  getList,
} from "@/api/public";
import VueResizable from 'vue-resizable'
export default {
  props: {
    form: {
      type: Object,
      default: null
    },
    inx: {
      type: Number,
      default: 0
    },
    did: {
      type: String,
      default: ''
    }
  },
  components: {
    VueResizable,
  },
  data() {
    return {
      loading: false,
      total: 0,
      tableList: [],
      conditions: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    handleSortChange(column) {
      this.form.prop = column.prop
      this.form.order = column.order
      this.init()
    },
    async init() {
      this.loading = true
      let res = await getList(`/bank/list`, this.form)
      this.tableList = res.data.records
      this.total = res.data.total
      this.loading = false
      
      let str = []
      if (this.form.mc) {
        str.push(`名称是“${this.form.mc}”`)
      }
      if (this.form.bfkh) {
        str.push(`本方卡号是“${this.form.bfkh}”`)
      }
      if (this.form.fkdw) {
        str.push(`反馈单位是“${this.form.fkdw}”`)
      }
      if (this.form.jydfkh) {
        str.push(`交易对方卡号是“${this.form.jydfkh}”`)
      }
      if (this.form.jydfmc) {
        str.push(`交易对方名称是“${this.form.jydfmc}”`)
      }
      if (this.form.jyje) {
        str.push(`交易金额是“${this.form.jyje}”`)
      }
      if (this.form.jylx) {
        str.push(`交易类型是“${this.form.jylx}”`)
      }
      if (this.form.sjysj) {
        str.push(`交易起始时间是“${this.form.jysj}”`)
      }
      if (this.form.ejysj) {
        str.push(`交易结束时间是“${this.form.jysj}”`)
      }
      this.conditions = str.join('、')
    },
    onDrag({ target, transform }) {
      target.style.transform = transform;
    },
    onScale({ target, drag }) {
      target.style.transform = drag.transform;
    },
    handleClose() {
      this.$emit('eventClose', this.did)
      console.log('123')
    },
    handleChangePage(ev) {
      this.form.pageIndex = ev
      this.init()
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog-search{
  position: absolute;
  padding: 15px;background: #fff;
  border: 1px solid #DCDFE6;
  box-shadow: 0 0 10px #ccc;
  resize:both;width: 100%;height: 100%;z-index: 9999;
  .close{
    position: absolute;right: 10px;top: 10px;
    cursor: pointer;font-size: 25px;z-index: 99;
  }
  .header{
    height: 50px;padding: 0 20px 0 0;
  }
  .tables{
    height: calc(100% - 100px);
    overflow: auto;
  }
  .pages{
    text-align: center;
    margin: 22px 0 0 0;
  }
}
</style>
