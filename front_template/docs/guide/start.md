# 快速开始

## 安装

```shell
pnpm i vue-wsm-admin pinia vue-router --save
```

## 安装 naive-ui

```shell
pnpm i naive-ui --save-prod
pnpm i unplugin-vue-components --save-dev
```

```shell
// vite.config.js
import Components from "unplugin-vue-components/vite"
import {NaiveUiResolver} from "unplugin-vue-components/resolvers"
export default defineConfig({
    plugins: [
        Components({
          resolvers: [NaiveUiResolver()]
        })
    ]
})
```

如果需要可以配置，也可以在使用的时候，在引入即可

```ts
import { useNotification } from "naive-ui";
```

```ts
import AutoImport from "unplugin-auto-import/vite";
export default defineConfig({
    plugins: [
        AutoImport({
            imports: [
                "vue",
                {
                    "naive-ui": [
                        "useDialog",
                        "useMessage",
                        "useNotification",
                        "useLoadingBar",
                    ],
                },
            ],
        }),
    ],
});
```

## main.js

```javascript
import { createApp } from "vue";
import "./style.css";
import App, { install, router } from "vue-wsm-admin";

createApp(App)
    .use(install, {
        // getViews: () => import.meta.glob("@/view/**/*.vue", {eager: true})
        getViews: () => import.meta.glob("./view/**/*.vue", { eager: true }),
    })
    .use(router)
    .mount("#app");
```

## mock 数据

### 在 vite 环境下 ，安装 mock 插件

```shell
pnpm i  mockjs vite-plugin-mock@2.9 -D
```

::: danger

vite-plugin-mock3.x 在 vite4.0 中有 bug，等待作者修复中
:::

### vite.config.ts

```javascript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from "vite-plugin-mock";

export default defineConfig({
    plugins: [
        vue(),
        viteMockServe({
            mockPath: "./mock",
        }),
    ],
});
```

### 添加测试数据

在根目录下新建文件`mock/app.js`，如添加以下测试数据，复制即可，详细字段说明[查看接口说明](/guide/menu.html#菜单配置)

```javascript
function createDataItem(data = {}) {
    const item = {
        id: "",
        title: "",
        icon: "",
        shows: true,
        path: "",
        order: 1,
        pid: "",
        file: "",
        isIframe: "",
        url: "",
        keepAlive: false,
        tabHidden: false,
        tabFix: false,
        httpFile: "",
    };
    for (const itemKey in item) {
        item[itemKey] =
            data[itemKey] || data[itemKey] === false
                ? data[itemKey]
                : item[itemKey];
    }
    return item;
}

export default [
    {
        url: "/menus",
        method: "post",
        response: {
            code: 1,
            data: [
                createDataItem({
                    id: "100",
                    title: "首页",
                    path: "/home",
                    file: "/view/home/index.vue", // 你的页面路径
                    icon: "HomeOutline",
                    keepAlive: true,
                    tabFix: true,
                    order: 100,
                }),
                createDataItem({
                    id: "5000",
                    title: "动画",
                    path: "/animation",
                    file: "/view/animation/index.vue", // 你的页面路径
                    icon: "LogoPinterest",
                }),
                createDataItem({
                    id: "6000",
                    title: "内嵌页面",
                    icon: "PlanetOutline",
                }),
                createDataItem({
                    id: "6002",
                    title: "FormGenerator",
                    pid: "6000",
                    path: "/formDesigner/generator",
                    isIframe: true,
                    url: "https://www.baidu.com",
                }),
            ],
        },
    },
    {
        url: "/login",
        method: "post",
        response: {
            code: 1,
            data: {
                username: "管理员",
                roles: ["admin", "web"],
                id: "YTSOVNEGA4GPZYT6W5D2",
                accessToken: "SISCA6W7TXZJWKKJFX1772HCIHF2IT",
                expiresTime: "2023-10-01 00:00:00",
            },
        },
    },
    {
        url: "/userInfo",
        method: "post",
        response: {
            code: 1,
            data: {
                username: "管理员",
                roles: ["admin", "web"],
                permission: ["sys:permission:admin", "sys:permission:web"],
            },
        },
    },
];
```

## 目录结构

此时你的项目结构如此

```
├─ mock // 新增
│  ├─ api.js
├─ public
├─ src
│  ├─ assets
│  ├─ components
│  ├─ views // 新增
│  │  ├─ home
│  │  │  ├─ index.vue
│  │  ├─ animation
│  │  │  ├─ index.vue
│  ├─ App.vue
│  ├─ main.ts
├─ .package.json
├─ index.html
├─ vite.config.ts
├─ README.md
```

## 启动

```shell
pnpm run dev
```

打开浏览器[http://127.0.0.1:5173/](http://127.0.0.1:5173/)
