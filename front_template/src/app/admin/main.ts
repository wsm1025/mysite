import { createApp } from "vue"
// @ts-ignore
import App, { install, router } from "@/packages/install.vue"
import NaiveUiTableInstall from "naive-ui-table"
import NaiveUiFormInstall from "naive-ui-form"
import NaiveUiUploadInstall from "naive-ui-upload"
createApp(App)
    .use(install, {
        menus: [],
        getViews: () => {
            return import.meta.glob("@/app/admin/view/**/*.vue", {
                eager: true,
            })
        },
        website: {},
        components: {
            NaiveUiTableInstall,
            NaiveUiFormInstall,
            NaiveUiUploadInstall,
        },
        apiModeStrapi: true,
    })
    .use(router)
    .mount("#app")
