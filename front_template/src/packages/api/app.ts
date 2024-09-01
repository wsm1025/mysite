import { get, post } from "@/packages/http/request.ts"
import apiMap from "@/packages/api/apiMap.ts"
import { resetApiInstanceUrl } from "@/packages/global"

const login = (params) => {
    // @ts-ignore
    return post(resetApiInstanceUrl(apiMap.login), params, { hint: true })
}

const register = (params) => {
    // @ts-ignore
    return post(resetApiInstanceUrl(apiMap.register), params, { hint: true })
}
const menus = (userId: string) => {
    return post(resetApiInstanceUrl(apiMap.menus + `/${userId}`))
}

const userInfo = () => {
    return get(resetApiInstanceUrl(apiMap.userInfo))
}

export { login, menus, userInfo, register }
