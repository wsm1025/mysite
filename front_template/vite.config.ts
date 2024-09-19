import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
import Components from "unplugin-vue-components/vite"
import { NaiveUiResolver } from "unplugin-vue-components/resolvers"
import setupConfig from "./config"
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js"
import viteCompression from "vite-plugin-compression"
import vueJsx from "@vitejs/plugin-vue-jsx"

export default ({ mode }: { mode: any }) => {
    const { build } = setupConfig({ mode })
    const plugins = []
    if (mode === "lib") {
        plugins.push(cssInjectedByJsPlugin())
    } else {
        plugins.push(
            viteCompression({
                threshold: 10240,
            })
        )
    }
    return defineConfig({
        root: path.resolve(__dirname, "src/app"), // 修改root参数为多页面的根目录
        base: "./",
        plugins: [
            vue(),
            vueJsx(),
            Components({
                resolvers: [NaiveUiResolver()],
            }),
            ...plugins,
        ],
        publicDir: "public",
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
                "@api": path.resolve(__dirname, "src/app/admin/api"),
                "@components": path.resolve(
                    __dirname,
                    "src/app/admin/components"
                ),
                __ROOT__: path.resolve(__dirname, ""),
            },
            extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"], // 自动匹配文件后缀名
        },
        build,
        server: {
            host: "0.0.0.0",
            port: 8280,
            proxy: {
                "/api": {
                    target: "http://127.0.0.1:3000",
                    changeOrigin: true,
                },
            },
        },
    })
}
