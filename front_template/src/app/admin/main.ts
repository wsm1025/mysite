import { createApp, shallowRef } from "vue";
// @ts-ignore
import App, { install, router } from "@/packages/install.vue";
import headerUserSet from "@/app/admin/components/headerUserSet.vue";

createApp(App)
    .use(install, {
        menus: [
            // {
            //     "id": 9000,
            //     "title": "首页",
            //     "icon": "Home",
            //     "path": "/home",
            //     "pid": 0,
            //     "file": "/view/home/index.vue",
            // }
        ],
        getViews: () => {
            return import.meta.glob("@/app/admin/view/**/*.vue", {
                eager: true,
            });
        },
        website: {},
        components: {
            headerUserSet: null,
        },
        // apis: {
        //     "/login": "/auth/local",
        //     "/userInfo": "/user/userinfo",
        //     "/menus": "/menus/getAll",
        // },
        apiModeStrapi: true,
    })
    .use(router)
    .mount("#app");
