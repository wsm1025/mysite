import { get, post, deleteAction } from "@/packages/http/request.ts"
import apiMap from "@/app/admin/api/apiMap.ts"

const findDicByParentName = (name, params = {}) => {
    return get(apiMap.findDicByParentName + name, params)
}

const getAllUser = (params = {}) => {
    return get(apiMap.getAllUser, params)
}

const deleteUser = (params = {}) => {
    return deleteAction(apiMap.deleteUser, params)
}

const createUser = (params = {}) => {
    return post(apiMap.createUser, params)
}

const editUser = (params = {}) => {
    return post(apiMap.editUser, params)
}

const role = () => {
    return post(apiMap.role)
}

const branch = () => {
    return post(apiMap.branch)
}

const menus = () => {
    return post(apiMap.menus)
}
// 获取全部数据
const dictionaryAll = (params = {}) => {
    return get(apiMap.dictionaryAll, params)
}

const dictionaryFiled = (params) => {
    return post(apiMap.dictionaryFiled, params)
}

const createDic = (params) => {
    return post(apiMap.createDic, params)
}
const findDicById = (id) => {
    return get(apiMap.findDicById + `/${id}`)
}
const deleteDicById = (params) => {
    return post(apiMap.deleteDicById, params)
}
const createMenu = (params) => {
    return post(apiMap.createMenu, params)
}
const menuFiled = (params) => {
    return post(apiMap.menuFiled, params)
}
const menuDelete = (params) => {
    return post(apiMap.menuDelete, params)
}

export {
    findDicByParentName,
    getAllUser,
    deleteUser,
    createUser,
    editUser,
    role,
    branch,
    menus,
    dictionaryAll,
    dictionaryFiled,
    createDic,
    findDicById,
    deleteDicById,
    createMenu,
    menuFiled,
    menuDelete,
}
