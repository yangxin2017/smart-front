<template>
  <div>
    <el-table :data="data" style="width: 100%">
      <el-table-column v-for="item,key in columns" :key="key"
        :prop="key"
        :label="item.label">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      tableData: [],
      columns: {
        fdzl: { label: '房地坐落' },
        jzmjpfm: { label: '建筑面积平方米' },
        ghyt: { label: '规划用途' },
        fwxz: { label: '房屋性质' },
        bdbzzqse: { label: '被担保主债权数额(万)' },
        qszt: { label: '权属状态' },
        djsj: { label: '登记时间' },
        jyjewy: { label: '交易金额万元' }
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
