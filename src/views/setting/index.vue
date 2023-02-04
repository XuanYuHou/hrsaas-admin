<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="first">
            <el-row style="height:60px">
              <el-button type="primary" size="small" icon="el-icon-plus" @click="showDialog=true">新建角色</el-button>
            </el-row>
            <el-table border :data="list">
              <el-table-column label="序号" type="index" width="120px" align="center" />
              <el-table-column label="角色名" prop="name" width="240px" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作" align="center">
                <template slot-scope="{row}">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="updateRole(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="deleteRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="center" align="middle" style="height:60px">
              <el-pagination layout="prev, pager, next" :total="total" :page-size="pagesize" :current-page="page" @current-change="changePage" />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="second">
            <el-alert type="info" :closable="false" show-icon title="对公司名称..." />
            <el-form label-width="120px" style="margin-top: 50px;">
              <el-form-item label="企业名称">
                <el-input v-model="CompanyInfo.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="企业地址">
                <el-input v-model="CompanyInfo.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="企业电话">
                <el-input v-model="CompanyInfo.companyPhone" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="CompanyInfo.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="CompanyInfo.remarks" disabled type="textarea" :row="3" style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <el-dialog :title="roleTitle" :visible.sync="showDialog">
      <el-form ref="form" label-width="120px" :model="roleDetail" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleDetail.name" type="text" style="width:400px" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleDetail.description" type="text" style="width:400px" />
        </el-form-item>
        <el-row justify="center" type="flex">
          <el-col :span="8">
            <el-button size="small" @click="btnClose">取消</el-button>
            <el-button size="small" type="primary" @click="btnOk">确定</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, deleteRoleById, updateRoleById, getRoleDetail, addRole } from '@/api/setting'
import { mapState } from 'vuex'
export default {
  name: 'SettingIndex',
  // 注册组件
  components: {},
  data() {
    return {
      activeName: 'first',
      list: [],
      pagesize: 10,
      page: 1,
      total: 0,
      CompanyInfo: {},
      showDialog: false,
      roleDetail: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      }
    }
  },
  // 计算属性
  computed: {
    ...mapState('user', ['userInfo']),
    roleTitle() {
      return this.roleDetail.id ? '编辑角色' : '新增角色'
    }
  },
  // 侦听器
  watch: {},
  // 创建实例后钩子函数
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  // 挂载后钩子函数
  mounted() {},
  // 卸载后钩子函数
  beforeDestroy() {},
  // 方法
  methods: {
    async getRoleList() {
      const { total, rows } = await getRoleList({ page: this.page, pagesize: this.pagesize })
      this.total = total
      this.list = rows
    },
    changePage(val) {
      this.page = val
      this.getRoleList()
    },
    async getCompanyInfo() {
      this.CompanyInfo = await getCompanyInfo(this.userInfo.companyId)
    },
    async deleteRole(id) {
      try {
        await this.$confirm('确认删除该角色嘛')
        await deleteRoleById(id)
        this.getRoleList()
        this.$message.success('删除角色成功')
      } catch (error) {
        console.log(error)
      }
    },
    async updateRole(id) {
      this.roleDetail = await getRoleDetail(id)
      this.showDialog = true
    },
    async btnClose() {
      this.roleDetail = {
        name: '',
        description: ''
      }
      await this.$refs.form.resetFields()
      this.showDialog = false
    },
    async btnOk() {
      try {
        await this.$refs.form.validate()
        if (this.roleDetail.id) {
          await updateRoleById(this.roleDetail)
          this.$message.success('修改角色信息成功')
        } else {
          await addRole(this.roleDetail)
          this.$message.success('添加角色成功')
        }
        this.getRoleList()
        this.showDialog = false
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
