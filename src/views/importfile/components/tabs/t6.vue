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
        zqzh: { label: '证券账户' },
        zqzhzt: { label: '证券账户状态' },
        zqlb: { label: '证券类别' },
        zqzgbsl: { label: '证券总股本数量' },
        cysl: { label: '持有数量' },
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
