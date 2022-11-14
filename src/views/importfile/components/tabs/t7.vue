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
        xm1: { label: '姓名' },
        sfzh1: { label: '证件号码' },
        xm2: { label: '姓名' },
        sfzh2: { label: '证件号码' },
        gx: { label: '关系' }
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
