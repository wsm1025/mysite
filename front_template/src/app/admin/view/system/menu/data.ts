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
const message = window.$message

const createColumns = ({ compHandle }): DataTableColumns => {
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

const treeData = [
    {
        label: "阿里巴巴",
        key: "1",
        children: [
            { label: "数字政务", key: "10" },
            { label: "Ai事业部", key: "11" },
            {
                label: "住建事业部",
                key: "12",
            },
            { label: "胜算事业部", key: "13" },
        ],
    },
    {
        label: "丰树科技",
        key: "2",
        children: [
            { label: "塔吊事业部", key: "21" },
            { label: "人工智能", key: "22" },
            { label: "大数据研发", key: "23" },
        ],
    },
    {
        label: "合作伙伴",
        key: "3",
        children: [
            { label: "阿里巴巴", key: "31" },
            { label: "新浪科技", key: "32" },
            { label: "网易云", key: "33" },
        ],
    },
]

const tableSize = [
    {
        label: "较小",
        value: "small",
    },
    {
        label: "适中",
        value: "medium",
    },
    {
        label: "较大",
        value: "large",
    },
]

const emailOptions = ["@gmail.com", "@163.com", "@qq.com"]

const jobOptions = [
    { label: "前端开发", value: "前端开发" },
    { label: "前端架构师", value: "前端架构师" },
    { label: "UI设计师", value: "UI设计师" },
    { label: "产品经理", value: "产品经理" },
    { label: "后端开发", value: "后端开发" },
    { label: "测试工程师", value: "测试工程师" },
    { label: "运维工程师", value: "运维工程师" },
    { label: "3D模型开发", value: "3D模型开发" },
    { label: "全栈开发", value: "全栈开发" },
    { label: "场景设计师", value: "场景设计师" },
    { label: "IOS开发", value: "IOS开发" },
    { label: "Android开发", value: "Android开发" },
]

const tagOptions = [
    { label: "管理员", value: "admin" },
    { label: "测试人员", value: "test" },
    { label: "普通用户", value: "web" },
    { label: "vip用户", value: "vip" },
]

export {
    createColumns,
    treeData,
    tableSize,
    emailOptions,
    jobOptions,
    tagOptions,
}
