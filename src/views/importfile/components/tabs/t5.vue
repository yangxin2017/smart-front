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
        dybdclx: { label: '抵押不动产类型' },
        zl: { label: '坐落' },
        dyr: { label: '抵押人' },
        dyfs: { label: '抵押方式' },
        bdbzzqse: { label: '被担保主债权数额(万)' },
        qszt: { label: '权属状态' },
        djsj: { label: '登记时间' }
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
