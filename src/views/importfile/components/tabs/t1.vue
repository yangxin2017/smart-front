<template>
  <div v-if="user">
    <div class="cons">
      <div class="avatar">
        <img width="100%" :src="'/ai/webfile/' + user.zp" />
      </div>
      <div class="txts">
        <div class="t1"><b>姓名：</b>{{ user.xm }}</div>
        <div class="t1"><b>性别：</b>{{ user.xb }}</div>
        <div class="t1"><b>身份证：</b>{{ user.sfzh }}</div>
        <div class="t1"><b>民族：</b>{{ user.mz }}</div>
        <div class="t1"><b>户籍地：</b>{{ user.hjd }}</div>
        <div class="t1"><b>出生日期：</b>{{ user.csrq }}</div>
        <div class="t1"><b>籍贯：</b>{{ user.jg }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default: null
    }
  }
}
</script>
<style lang="scss" scoped>
.cons{
  display: flex;
  justify-content: space-between;
  .avatar{
    width: 30%;border: solid 1px #ddd;
    margin: 0 20px 0 0;padding: 5px;
  }
  .txts{
    flex: 1;
    .t1{
      margin: 0 0 10px 0;
    }
  }
}
</style>
