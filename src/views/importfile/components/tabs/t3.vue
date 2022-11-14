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
        bxcpmc: { label: '保险产品名称' },
        bdh: { label: '保单号' },
        ljjnbf: { label: '累计缴纳保费(元)' },
        biz: { label: '币种' },
        xzmc: { label: '险种名称' },
        bdsl: { label: '标的数量' }
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
