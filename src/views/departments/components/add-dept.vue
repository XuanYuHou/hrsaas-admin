<template>
  <el-dialog :title="title" :visible="showDialog" @close="btnCancel">
    <el-form ref="deptForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option v-for="(item, index) in peoples" :key="index" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" type="" @click="btnCancel">
          取消
        </el-button>
        <el-button size="small" type="primary" @click="btnOk">
          确定
        </el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { addDepartment, getDepartDetail, getDepartments, getEmployeeSimple, updateDepartments } from '@/api/departments'

export default {
  name: 'AddDept',
  // 注册组件
  components: {},
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      require: true,
      default: () => { }
    }
  },
  data() {
    const checkNameRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      if (this.formData.id) {
        depts.filter(item => this.treeNode.id === item.pid && item.id !== this.formData.id).some(item => item.name === value) ? callback(new Error('部门名称重复')) : callback()
      } else {
        depts.filter(item => this.treeNode.id === item.pid).some(item => item.name === value) ? callback(new Error('部门名称重复')) : callback()
      }
    }
    const checkCodeRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      if (this.formData.id) {
        depts.some(item => item.code === value && item.id !== this.formData.id && value) ? callback(new Error('部门编码重复')) : callback()
      } else {
        depts.some(item => item.code === value && value) ? callback(new Error('部门编码重复')) : callback()
      }
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称长度为1-50', trigger: 'blur' },
          { validator: checkNameRepeat, trigger: 'blur' }],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码长度为1-50', trigger: 'blur' },
          { validator: checkCodeRepeat, trigger: 'blur' }],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍长度为1-300', trigger: 'blur' }]
      },
      peoples: []
    }
  },
  // 计算属性
  computed: {
    title() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  // 侦听器
  watch: {},
  // 创建实例后钩子函数
  created() {
  },
  // 挂载后钩子函数
  mounted() {},
  // 卸载后钩子函数
  beforeDestroy() {},
  // 方法
  methods: {
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
    },
    async btnCancel() {
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      await this.$refs.deptForm.resetFields()
      this.$emit('update:showDialog', false)
    },
    async  btnOk() {
      try {
        await this.$refs.deptForm.validate()
        if (!this.formData.id) {
          await addDepartment({ ...this.formData, pid: this.treeNode.id })
          await this.$confirm('添加部门成功')
        } else {
          await updateDepartments(this.formData)
          await this.$confirm('修改部门成功')
        }
        this.$emit('addDepts')
        this.$emit('update:showDialog', false)
      } catch (error) {
        console.log(error)
      }
    },
    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
