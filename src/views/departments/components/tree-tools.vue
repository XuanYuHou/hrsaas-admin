<template>
  <el-row type="flex" justify="space-between" align="middle" style="height:40px;width:100%">
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="operateDepts">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartment } from '@/api/departments'

export default {
  name: 'TreeTools',
  // 注册组件
  components: {},
  props: {
    treeNode: {
      require: true,
      type: Object,
      default: () => { }
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 创建实例后钩子函数
  created() {},
  // 挂载后钩子函数
  mounted() {},
  // 卸载后钩子函数
  beforeDestroy() {},
  // 方法
  methods: {
    async operateDepts(type) {
      if (type === 'add') {
        this.$emit('addDepts', this.treeNode)
      } else if (type === 'edit') {
        this.$emit('editDepts', this.treeNode)
      } else {
        try {
          await this.$confirm(`确定要删除${this.treeNode.name}部门吗?`)
          await delDepartment(this.treeNode.id)
          this.$emit('delDepts')
          this.$message.success('删除部门成功')
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
