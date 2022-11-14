<template>
  <el-dialog title="添加人员" :visible.sync="dialogVisible" width="60%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" v-if="ruleForm" label-width="100px" class="demo-ruleForm" size="mini">
      <el-row :gutter="20">
        <el-col :span="isSimple ? 24 : 16">
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
        <el-col :span="8" v-if="!isSimple">
          <div class="add-card">
            <el-button size="mini" type="primary" @click="handleAddCard">
              添加银行卡信息
            </el-button>
          </div>
          <div class="list-cards">
            <div class="md" v-for="item in banks" :key="item.id">
              <el-input class="inp" type="text" size="mini" placeholder="卡号" v-model="item.kh"></el-input>
              <el-button class="btn" type="danger" size="mini" icon="el-icon-delete" circle @click="handleRemoveCard(item.id)"></el-button>
            </div>
          </div>
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
  props: {
    isSimple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fields: [
        { id: 1, name: '姓名', type: 'text', field: 'xm', require: true },
        { id: 2, name: '身份证号', type: 'text', field: 'sfzh', require: true },
        { id: 3, name: '性别', type: 'radio', field: 'xb', require: false, data: [{ label: '男', value: '男' }, { label: '女', value: '女' }] },
        { id: 31, name: '是否目标人', type: 'switch', field: 'sfMbr', require: false, default: false },
        { id: 4, name: '民族', type: 'text', field: 'mz', require: false },
        { id: 5, name: '出生日期', type: 'date', field: 'csrq', require: false },
        { id: 6, name: '婚姻状况', type: 'text', field: 'hyzk', require: false },
        { id: 7, name: '生肖', type: 'text', field: 'sx', require: false },
        { id: 8, name: '星座', type: 'text', field: 'xz', require: false },
        { id: 9, name: '别名绰号', type: 'text', field: 'bmch', require: false },
        { id: 10, name: '曾用名', type: 'text', field: 'cym', require: false },
        { id: 11, name: '身高', type: 'text', field: 'sg', require: false },
        { id: 12, name: '血型', type: 'text', field: 'xx', require: false },
        { id: 13, name: '最高学历', type: 'text', field: 'zgxl', require: false },
        { id: 14, name: '政治面貌', type: 'text', field: 'zzmm', require: false },
        { id: 15, name: '职业', type: 'text', field: 'zy', require: false },
        { id: 16, name: '从业单位', type: 'text', field: 'cydw', require: false },
        { id: 17, name: '兵役状况', type: 'text', field: 'byzk', require: false },
        { id: 18, name: '体貌特征描述', type: 'text', field: 'tmtzms', require: false },
        { id: 19, name: '出生地区划', type: 'text', field: 'csdqh', require: false },
        { id: 20, name: '籍贯', type: 'text', field: 'jg', require: false },
        { id: 21, name: '户籍地区划', type: 'text', field: 'hjdqh', require: false },
        { id: 22, name: '户籍地址', type: 'text', field: 'hjdz', require: false },
        { id: 23, name: '其他地址', type: 'text', field: 'qtdz', require: false },
        { id: 24, name: '行为标签', type: 'text', field: 'xwbq', require: false },
      ],
      ruleForm: null,
      rules: {},
      dialogVisible: false,

      banks: [],

      projectId: '',
      loading: false
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
          await postRequest(`/rydzda/add?projectId=${this.projectId}`, this.ruleForm)

          if (!this.isSimple) {
            let form = []
            for (let b of this.banks) {
              form.push({ mc: this.ruleForm.xm, zjlx: '身份证', zjhm: this.ruleForm.sfzh, kh: b.kh })
            }
            await postRequest(`/jrjgzhZhjbxx/addlist?projectId=${this.projectId}`, form)
          }

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
