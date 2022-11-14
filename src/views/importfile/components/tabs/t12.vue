<template>
  <div>
    <el-table :data="gs" style="width: 100%">
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
    gs: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      tableData: [],
      columns: {
        qyjgmc: { label: '企业机构名称' },
        zw: { label: '职务' }
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
