<template>
  <el-dialog title="人员详情信息" :visible.sync="dialogVisible" width="60%">
    <el-tabs v-model="curTab" v-if="user">
      <el-tab-pane label="基本信息" name="1">
        <t1 :user="user"></t1>
      </el-tab-pane>
      <el-tab-pane label="公司信息" name="12">
        <t12 :gs="user.gs"></t12>
      </el-tab-pane>
      <el-tab-pane label="房产信息" name="2">
        <t2 :data="user.fdcq"></t2>
      </el-tab-pane>
      <el-tab-pane label="累计缴纳保费" name="3">
        <t3 :data="user.bxbd"></t3>
      </el-tab-pane>
      <el-tab-pane label="银行卡" name="4">
        <t4 :data="user.yhk"></t4>
      </el-tab-pane>
      <el-tab-pane label="抵押贷款" name="5">
        <t5 :data="user.dyq"></t5>
      </el-tab-pane>
      <el-tab-pane label="证券信息" name="6">
        <t6 :data="user.cyxx"></t6>
      </el-tab-pane>
      <el-tab-pane label="亲属关系" name="7">
        <t7 :data="user.qsgx"></t7>
      </el-tab-pane>
      <el-tab-pane label="密切人" name="8">
        <t8 :data="user.mqr"></t8>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>
<script>
import t1 from './tabs/t1.vue'
import t12 from './tabs/t12.vue'
import t2 from './tabs/t2.vue'
import t3 from './tabs/t3.vue'
import t4 from './tabs/t4.vue'
import t5 from './tabs/t5.vue'
import t6 from './tabs/t6.vue'
import t7 from './tabs/t7.vue'
import t8 from './tabs/t8.vue'
export default {
  components: {
    t1, t12, t2, t3, t4, t5, t6, t7, t8
  },
  data() {
    return {
      curTab: '1',
      user: null,
      dialogVisible: false
    }
  },
  methods: {
    dy_show(rw) {
      this.dialogVisible = true
      this.user = rw
      console.log(rw)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
