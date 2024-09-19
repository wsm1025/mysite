import NaiveUiUpload from "./src/NaiveUiUpload.vue"

import type { App } from "vue"
import type { Option, RequestFun, FileInfo } from "./src/types/index"

export type { RequestFun, FileInfo }
export { NaiveUiUpload }

import { provideKey } from "./src/const"

export { provideKey }

export default {
    install(app: App, option?: Option) {
        app.component("NaiveUiUpload", NaiveUiUpload)
        if (option?.requestFunc) {
            app.provide(provideKey, option.requestFunc)
        }
    },
}
