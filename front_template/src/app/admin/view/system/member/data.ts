import dayjs from "dayjs"
import { DataTableColumns, NButton, NPopconfirm } from "naive-ui"
import { h } from "vue"
import { ROLE, TYPE } from "../enum"

const createColumns = ({ compHandle }): DataTableColumns => {
    return [
        {
            type: "selection",
        },
        {
            title: "用户名",
            key: "userName",
            align: "center",
            maxWidth: 100,
            ellipsis: true,
        },
        {
            title: "昵称",
            key: "nickName",
            align: "center",
            ellipsis: true,
        },
        {
            title: "邮箱",
            key: "email",
            align: "center",
            ellipsis: true,
            render(row) {
                return h("span", {}, row.email || "/")
            },
        },
        {
            title: "创建时间",
            key: "createTime",
            align: "center",
            ellipsis: true,
            render: ({ createTime }) => {
                return dayjs(createTime).format("YYYY-MM-DD HH:mm:ss") || "-"
            },
        },
        {
            title: "更新时间",
            key: "updateTime",
            align: "center",
            ellipsis: true,
            render: ({ updateTime }) => {
                return dayjs(updateTime).format("YYYY-MM-DD HH:mm:ss") || "-"
            },
        },
        {
            title: "角色",
            key: "opreration",
            align: "center",
            ellipsis: true,
            render(row: { role: keyof typeof ROLE }) {
                return h("span", {}, ROLE[row.role])
            },
        },
        {
            title: "操作",
            key: "actions",
            align: "center",
            width: 130,
            fixed: "right",
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
                            onPositiveClick: () => {
                                compHandle.del(row)
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

export { createColumns, tableSize }
