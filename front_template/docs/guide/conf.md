# 配置说明

```javascript
import { createApp } from "vue";
import "./style.css";
import App, { install, router } from "vue-wsm-admin";

createApp(App)
    .use(install, {
        getViews: () => import.meta.glob("@/view/**/*.vue", { eager: true }),
    })
    .use(router)
    .mount("#app");
```

## getViews

框架能动态找到本地路由，需要注入一个函数获取当前项目的文件路径,该函数应该返回你存放路由页面的位置

## Router

高级用法，然后在`main.js`中`app.use(router)`引用该导出的 router

```javascript
import { router } from "vue-wsm-admin";

// 路由前置钩子函数
router.beforeEach((to, from, next) => {
    next();
});

// 路由后置钩子函数
router.beforeEach((to, from) => {});

export default router;
```

## 更多配置

```javascript
createApp(App)
    .use(install, {
        whiteList: ["/login", "/test"], // 路由白名单
        resetPath: "/login", // 比如用户失效需要跳转的路由
        httpCode: [1], // 接口返回是成功的code码
        apiModeStrapi: false, // 如果接口是strapi框架，设置为true，默认false
    })
    .use(router)
    .mount("#app");
```

> 关于如何使用 strapi 框架，请看[https://juejin.cn/post/7337957655191535650](https://juejin.cn/post/7337957655191535650)

## 静态添加路由

通过配置参数`menus`,添加路由，更多属性[查看菜单配置](/guide/menu.html#菜单配置)

```javascript
createApp(App).use(install, {
    menus: [
        {
            "id": 9000,
            "title": "首页",
            "icon": "Home",
            "path": "/home",
            "pid": 0,
            "file": "/view/home/index.vue",
            ...
        }
    ],
    getViews: () => import.meta.glob("@/view/**/*.vue", {eager: true})
}).use(router).mount("#app")
```

## 全局变量

已内置，可在组件外部使用
[官方-message](https://www.naiveui.com/zh-CN/os-theme/components/message)，
[官方-notification](https://www.naiveui.com/zh-CN/os-theme/components/notification)

```javascript
window.$message['success'] ... // 信息
window.$notification['warning'] ... // 通知
```
