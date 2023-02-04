import request from '@/utils/request'
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}
/** *
 * 删除组织架构的部门
 */
export function delDepartment(id) {
  return request({
    method: 'delete',
    url: `/company/department/${id}`
  })
}
/**
 * 新增组织架构部门
 */
export function addDepartment(data) {
  return request({
    method: 'post',
    url: '/company/department',
    data
  })
}
/** *
 * 组织架构部门负责人数据
 */
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
/**
 * 获取组织架构部门详情
 */
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}
/**
 * 编辑组织架构部门
 */
export function updateDepartments(data) {
  return request({
    method: 'put',
    url: `/company/department/${data.id}`,
    data
  })
}
