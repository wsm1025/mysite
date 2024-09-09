import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios"
import axiosRetry from "axios-retry"
import locaStore from "@/packages/utils/locaStore.ts"

interface BagAxiosInstance extends AxiosInstance {
    $configOptions?: any
    $router?: any
}

axios.defaults.baseURL = "/api"

const http: BagAxiosInstance = axios.create({
    withCredentials: true,
})

axiosRetry(http, {
    retries: 3,
    shouldResetTimeout: true,
    retryDelay: (retryCount) => retryCount * 1500, // 间隔时间
})

http.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (locaStore.get("access_token")) {
            config.headers["authorization"] = locaStore.get("access_token")
        }
        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

http.interceptors.response.use(
    (response: AxiosResponse) => {
        const { code, msg } = response.data
        if (
            http.$configOptions.httpCode.indexOf(code) !== -1 ||
            http.$configOptions.apiModeStrapi
        ) {
            // @ts-ignore
            if (
                response.config.hint &&
                msg &&
                window.$message &&
                code === 200
            ) {
                window.$message.success(msg)
            }
            if (code >= 400) {
                window.$message.error(msg)
                return Promise.reject(response)
            }
            return response.data.data
        }
        if (code === 1003) {
            http.$router.push(http.$configOptions.resetPath)
        }
        return Promise.reject(response)
    },
    (err: AxiosError) => {
        const { response } = err

        console.log(response.data)
        if (response?.data) {
            // @ts-ignore
            const { msg } = response?.data
            msg && window.$message.error(msg)
        }
        return Promise.reject(err)
    }
)

const post = (url: string, params?: any, config?: AxiosRequestConfig) => {
    return http.post(url, params, config)
}

const get = (url: string, params?: any, config?: AxiosRequestConfig) => {
    return http.get(url, { params, ...config })
}
const deleteAction = (
    url: string,
    params?: any,
    config?: AxiosRequestConfig
) => {
    return http.delete(url, { params, ...config })
}
export { post, get, deleteAction, http as axios }
