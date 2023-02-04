<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card ">
        <TreeTools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <TreeTools slot-scope="{ data }" :tree-node="data" @delDepts="getDepartments" @addDepts="addDepts" @editDepts="editDepts" />
        </el-tree>
      </el-card>
    </div>
    <AddDept ref="addDepts" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />
  </div>
</template>

<script>
import AddDept from './components/add-dept'
import { getDepartments } from '@/api/departments'
import TreeTools from './components/tree-tools'
import { treeListToTreeData } from '@/utils'
export default {
  name: 'DepartmentsIndex',
  // 注册组件
  components: {
    AddDept,
    TreeTools },
  data() {
    return {
      node: null,
      showDialog: false,
      company: { manager: '负责人', name: '123', id: '' },
      departs: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 创建实例后钩子函数
  created() {
    this.getDepartments()
  },
  // 挂载后钩子函数
  mounted() {

  },
  // 卸载后钩子函数
  beforeDestroy() {},
  // 方法
  methods: {
    async getDepartments() {
      const results = await getDepartments()
      this.departs = treeListToTreeData(results.depts, '')
      this.company.name = results.companyName
    },
    addDepts(node) {
      this.showDialog = true
      this.node = node
    },
    editDepts(node) {
      this.showDialog = true
      this.node = node
      this.$refs.addDepts.getDepartDetail(node.id)
    }
  }
}
</script>

<style scoped lang="scss">
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
