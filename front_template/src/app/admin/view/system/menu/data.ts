import {
    DataTableColumns,
    NButton,
    NIcon,
    NPopconfirm,
    NSwitch,
} from "naive-ui"
import { h } from "vue"
import { TYPE } from "../enum"
import { icons } from "@/packages/config/icon.ts"
import { menuFiled } from "@/app/admin/api/app"

const createColumns = ({ compHandle }): DataTableColumns => {
    const message = window.$message
    return [
        {
            title: "菜单名称",
            key: "title",
            align: "center",
            ellipsis: true,
        },
        {
            title: "路由",
            key: "path",
            align: "center",
            ellipsis: true,
            width: 160,
        },
        {
            title: "图标",
            key: "icon",
            align: "center",
            width: 70,
            render(row: any) {
                return h(NIcon, null, {
                    default: () =>
                        h(icons[row.icon], {
                            style: {
                                fontSize: "20px",
                            },
                        }),
                })
            },
        },
        {
            title: "是否显示",
            key: "shows",
            align: "center",
            ellipsis: true,
            width: 100,
            render(row: any) {
                return h(NSwitch, {
                    value: row.shows,
                    disabled: true,
                })
            },
        },
        {
            title: "是否缓存",
            key: "keepAlive",
            align: "center",
            ellipsis: true,
            width: 100,
            render(row: any) {
                return h(NSwitch, {
                    value: row.keepAlive,
                    onUpdateValue: async (value) => {
                        await menuFiled({
                            keepAlive: value,
                            id: row.id,
                        })
                        compHandle.getTableData()
                        window.location.reload()
                    },
                })
            },
        },
        {
            title: "是否外链",
            key: "isIframe",
            align: "center",
            ellipsis: true,
            width: 100,
            render(row: any) {
                return h(NSwitch, {
                    value: row.isIframe,
                    disabled: true,
                })
            },
        },
        {
            title: "外链地址",
            key: "url",
            align: "center",
            ellipsis: true,
            width: 100,
            render(row: any) {
                return h("span", {}, row.url || "/")
            },
        },
        {
            title: "是否固定",
            key: "tabFix",
            align: "center",
            ellipsis: true,
            width: 100,
            render(row: any) {
                return h(NSwitch, {
                    value: row.tabFix,
                    onUpdateValue: async (value) => {
                        await menuFiled({
                            tabFix: value,
                            id: row.id,
                        })
                        compHandle.getTableData()
                        window.location.reload()
                    },
                })
            },
        },
        {
            title: "显示tab",
            key: "tabHidden",
            align: "center",
            ellipsis: true,
            width: 100,
            render(row: any) {
                return h(NSwitch, {
                    value: row.tabHidden,
                    onUpdateValue: async (value) => {
                        await menuFiled({
                            tabHidden: value,
                            id: row.id,
                        })
                        compHandle.getTableData()
                        window.location.reload()
                    },
                })
            },
        },
        {
            title: "操作",
            key: "actions",
            align: "center",
            width: 130,
            render(row) {
                return h("div", [
                    h(
                        NButton,
                        {
                            type: "success",
                            size: "small",
                            ghost: true,
                            onClick: () => compHandle.action(TYPE.EDIT, row),
                            style: { marginRight: "5px" },
                        },
                        { default: () => "编辑" }
                    ),

                    h(
                        NPopconfirm,
                        {
                            onPositiveClick: async () => {
                                await compHandle.menuDelete({
                                    id: row.id,
                                    isDelete: "1",
                                })
                                message.success("操作成功")
                                compHandle.getTableData()
                                window.location.reload()
                            },
                            negativeText: "取消",
                            positiveText: "确定",
                        },
                        {
                            trigger: () => {
                                return h(
                                    NButton,
                                    {
                                        type: "error",
                                        strong: true,
                                        size: "small",
                                        ghost: true,
                                    },
                                    { default: () => "删除" }
                                )
                            },
                            default: () => {
                                return "确认删除该条数据嘛？"
                            },
                        }
                    ),
                ])
            },
        },
    ]
}

export { createColumns }
