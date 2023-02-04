import request from '@/utils/request'
/**
 * 获取角色列表
 */
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}
/**
 * 根据id查询企业详情
 */
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
/** *
 * 根据id删除角色
 */
export function deleteRoleById(roleId) {
  return request({
    method: 'delete',
    url: `/sys/role/${roleId}`
  })
}
/**
 * 根据角色id获取角色详情
 */
export function getRoleDetail(roleId) {
  return request({
    url: `/sys/role/${roleId}`
  })
}
/**
 * 根据id编辑更新角色
 */
export function updateRoleById(data) {
  return request({
    method: 'put',
    url: `/sys/role/${data.id}`,
    data
  })
}
/**
 * 新增角色
 */
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
