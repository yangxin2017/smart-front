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
        kh: { label: '卡号' },
        zh: { label: '账号' },
        wyzhmc: { label: '网银账户名称' },
        biz: { label: '币种' },
        zhye: { label: '账户余额(元)' },
        kyye: { label: '可用余额(元)' }
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
