import { get, post } from "@/packages/http/request.ts"
import apiMap from "@/app/admin/api/apiMap.ts"

const member = () => {
    return post(apiMap.member)
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
// 获取全部数据
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
const craeteMenu = (params) => {
    return post(apiMap.craeteMenu, params)
}

export {
    member,
    role,
    branch,
    menus,
    dictionaryAll,
    dictionaryFiled,
    createDic,
    findDicById,
    deleteDicById,
    craeteMenu,
}
