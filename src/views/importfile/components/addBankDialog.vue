<template>
  <el-dialog title="添加银行数据" :visible.sync="dialogVisible" width="60%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" v-if="ruleForm" label-width="100px" class="demo-ruleForm" size="mini">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-col :span="12" v-for="item in fields" :key="item.id">
            <el-form-item :label="item.name" :prop="item.field">
              <el-input v-if="item.type == 'text'" v-model="ruleForm[item.field]"></el-input>

              <el-radio-group v-if="item.type == 'radio'" v-model="ruleForm[item.field]">
                <el-radio :label="it.label" v-for="it of item.data" :key="it.value"></el-radio>
              </el-radio-group>
              
              <el-date-picker v-if="item.type == 'date'" type="date" placeholder="选择日期" v-model="ruleForm[item.field]" style="width: 100%;"></el-date-picker>
              
              <el-switch v-if="item.type == 'switch'" v-model="ruleForm[item.field]"></el-switch>

            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
    </el-form>

    <span slot="footer" class="dialog-footer" v-loading="loading">
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { postRequest } from '@/api/mbr'
import { v4 as uuidv4 } from 'uuid'
export default {
  data() {
    return {
      fields: [
        { id: 1, name: '反馈单位', type: 'text', field: 'fkdw', require: false },
        { id: 2, name: '审批表', type: 'text', field: 'spb', require: false },
        { id: 3, name: '名称', type: 'text', field: 'mc', require: true },
        { id: 331, name: '证件类型', type: 'text', field: 'zjlx', require: false },
        { id: 4, name: '证件号码', type: 'text', field: 'zjhm', require: false },
        { id: 5, name: '查询对象名称', type: 'text', field: 'cxdxmc', require: false },
        { id: 6, name: '查询卡号', type: 'text', field: 'cxkh', require: false },
        { id: 7, name: '查询反馈结果原因', type: 'text', field: 'cxfkjgyy', require: false },
        { id: 8, name: '本方账号', type: 'text', field: 'bfzh', require: false },
        { id: 9, name: '本方卡号', type: 'text', field: 'bfkh', require: false },
        { id: 10, name: '交易类型', type: 'text', field: 'jylx', require: false },
        { id: 11, name: '借贷标志', type: 'text', field: 'jdbz', require: true },
        { id: 12, name: '币种', type: 'text', field: 'bz', require: false },
        { id: 13, name: '交易金额', type: 'text', field: 'jyje', require: true },
        { id: 14, name: '交易余额', type: 'text', field: 'jyye', require: false },
        { id: 15, name: '交易时间', type: 'date', field: 'jysj', require: false },
        { id: 16, name: '交易流水号', type: 'text', field: 'jylsh', require: false },
        { id: 17, name: '交易对方名称', type: 'text', field: 'jydfmc', require: true },
        { id: 18, name: '交易对方账号', type: 'text', field: 'jydfzh', require: false },
        { id: 19, name: '交易对方卡号', type: 'text', field: 'jydfkh', require: false },
        { id: 20, name: '交易对方证件号码', type: 'text', field: 'jydfzjhm', require: false },
        { id: 21, name: '交易对手余额', type: 'text', field: 'jydsye', require: false },
        { id: 22, name: '交易对方账号开户行', type: 'text', field: 'jydfzhkhh', require: false },
        { id: 23, name: '交易摘要', type: 'text', field: 'jyzy', require: false },
        { id: 24, name: '交易网点名称', type: 'text', field: 'jywdmc', require: false },
        { id: 25, name: '交易网点代码', type: 'text', field: 'jywddm', require: false },
        { id: 26, name: '日志号', type: 'text', field: 'rzh', require: false },
        { id: 27, name: '传票号', type: 'text', field: 'cph', require: false },
        { id: 28, name: '凭证种类', type: 'text', field: 'pzzl', require: false },
        { id: 29, name: '凭证号', type: 'text', field: 'pzh', require: false },
        { id: 30, name: '现金标志', type: 'text', field: 'xjbz', require: false },
        { id: 31, name: '终端号', type: 'text', field: 'zdh', require: false },
        { id: 32, name: '交易是否成功', type: 'text', field: 'jysfcg', require: false },
        { id: 33, name: '交易发生地', type: 'text', field: 'jyfsd', require: false },
        { id: 34, name: '商户名称', type: 'text', field: 'shmc', require: false },
        { id: 35, name: '商户号', type: 'text', field: 'shh', require: false },
        { id: 36, name: 'IP地址', type: 'text', field: 'ipdz', require: false },
        { id: 37, name: 'MAC地址', type: 'text', field: 'macdz', require: false },
        { id: 38, name: '交易柜员号', type: 'text', field: 'jygyh', require: false },
        { id: 39, name: '备注', type: 'text', field: 'remark', require: false },
      ],
      ruleForm: null,
      rules: {},
      dialogVisible: false,

      banks: [],

      projectId: '',
      loading: false,

      addurl: '/bank/add'
    }
  },
  mounted() {
    this.initInfo()
  },
  methods: {
    initInfo() {
      let fm = {}
      for (let d of this.fields) {
        if (d.require === true) {
          this.rules[d.field] = [{ required: true, message: '请输入' + d.name, trigger: 'blur' }]
        }
        if (d.default !== undefined) {
          fm[d.field] = d.default
        } else {
          fm[d.field] = ''
        }
        
      }
      this.ruleForm = fm
    },
    handleConfirm() {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          this.loading = true
          await postRequest(`${this.addurl}?projectId=${this.projectId}`, this.ruleForm)
          this.loading = false

          this.$message.success('添加成功！')
          this.dialogVisible = false
          this.$emit('eventAdded')
        }
      })
    },
    dy_show(projectId) {
      this.dialogVisible = true
      this.projectId = projectId
      this.banks = []
      setTimeout(() => {
        this.dy_reset()
      })
    },
    dy_reset() {
      this.$refs['ruleForm'].resetFields();
    },
    handleAddCard() {
      this.banks.push({ id: uuidv4(), kh: '' })
    },
    handleRemoveCard(id) {
      this.banks = this.banks.filter((v) => { return v.id !== id })
    }
  }
}
</script>
<style lang="scss" scoped>
.add-card{
  margin: 0 0 10px 0;
}
.list-cards{
  .md{
    display: flex;margin: 0 0 10px 0;
    justify-content: space-between;
    .inp{
      width: 80%;
    }
  }
}
</style>
