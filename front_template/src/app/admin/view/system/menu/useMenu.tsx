import { type TableInstance, type TableColumns } from "naive-ui-table"
import { type Recordable, type ModalFormInstance } from "naive-ui-form"
import {
    menus,
    createMenu,
    menuFiled,
    menuDelete,
    findDicByParentName,
} from "@/app/admin/api/app.ts"
import { computed, h, nextTick, ref } from "vue"
import { TYPE } from "../enum"
import { toTree } from "@/packages/utils/utils.ts"
import { NIcon, NSelect, NSwitch } from "naive-ui"
import { icons } from "@/packages/config/icon"
import appPinia from "@/packages/pinia/app.ts"

export default function useMenu() {
    const apiMap = [menus, createMenu, menuFiled, menuDelete]
    const premissionList = ref([])
    findDicByParentName("ROLE").then((res) => {
        premissionList.value = res.map((e) => ({
            label: e.dictionaryName,
            value: e.dictionaryValue,
        }))
    })
    const columns: TableColumns = [
        { title: "菜单名称", key: "title", align: "left", width: 180 },
        {
            title: "路由",
            key: "path",
            width: 150,
            align: "center",
        },
        {
            title: "图标",
            key: "icon",
            width: 80,
            align: "center",
            render: (row) =>
                h(
                    NIcon,
                    {
                        style: {
                            width: "20px",
                        },
                    },
                    {
                        default: () =>
                            h(icons[row.icon], {
                                style: {
                                    fontSize: "20px",
                                },
                            }),
                    }
                ),
        },
        {
            title: "是否显示",
            key: "shows",
            align: "center",
            render: (row) => <NSwitch value={row.shows} disabled />,
        },
        {
            title: "是否缓存",
            key: "keepAlive",
            align: "center",
            render: (row) => <NSwitch value={row.keepAlive} disabled />,
        },
        {
            title: "是否外链",
            key: "isIframe",
            align: "center",
            render: (row) => (
                <NSwitch value={row.isIframe ? row.isIframe : "-"} disabled />
            ),
        },
        {
            title: "外链地址",
            key: "url",
            align: "center",
            render: (row) => h("span", null, row.url || "-"),
        },
        {
            title: "是否固定",
            key: "tabFix",
            align: "center",
            render: (row) => <NSwitch value={row.tabFix} disabled />,
        },
        {
            title: "显示tab",
            key: "tabHidden",
            align: "center",
            render: (row) => <NSwitch value={row.tabHidden} disabled />,
        },
        {
            title: "操作",
            key: "operation",
            align: "center",
            fixed: "right",
            width: 200,
        },
    ]
    const showModal = ref(false)
    const loading = ref(false)
    const title = ref<number>(-1)
    const modalFormRef = ref<ModalFormInstance | null>()
    const naiveUiTableRef = ref<TableInstance | null>()
    const schemas = computed(() => [
        {
            field: "parentType",
            label: "是否父类",
            type: "radio",
            required: true,
            defaultValue: "0",
            componentProps: {
                options: [
                    {
                        label: "是",
                        value: "1",
                    },
                    {
                        label: "否",
                        value: "0",
                    },
                ],
            },
        },
        {
            field: "pid",
            label: "父级",
            type: "custom",
            required: true,
            vif: (row) => row.parentType === "0",
            render(formValue, field) {
                return {
                    type: NSelect,
                    componentProps: {
                        options: menuList(formValue["title"]),
                    },
                }
            },
        },
        {
            field: "title",
            label: "菜单名称",
            type: "input",
            required: true,
            componentProps: {
                disabled: title.value === TYPE.EDIT,
                maxlength: "10",
            },
        },
        {
            field: "path",
            label: "路由",
            type: "input",
            required: true,
            componentProps: {
                maxlength: "15",
            },
        },
        {
            field: "file",
            label: "文件地址",
            type: "input",
            componentProps: {
                maxlength: "20",
            },
        },
        {
            field: "icon",
            label: "图标",
            type: "slot",
            required: true,
            componentProps: {
                maxlength: "20",
            },
            slot: "icon",
        },
        {
            field: "shows",
            label: "是否显示",
            type: "switch",
            defaultValue: true,
            style: {
                "justify-content": "left",
            },
        },
        {
            field: "isIframe",
            label: "是否外链",
            type: "switch",
            defaultValue: false,
            style: {
                "justify-content": "left",
            },
        },
        {
            field: "url",
            label: "外链地址",
            type: "input",
            vif: (row) => row.isIframe,
            required: (row) => row.isIframe,
        },
        {
            field: "keepAlive",
            label: "是否缓存",
            type: "switch",
            defaultValue: true,
            style: {
                "justify-content": "left",
            },
        },
        {
            field: "tabFix",
            label: "是否固定",
            type: "switch",
            defaultValue: true,
            style: {
                "justify-content": "left",
            },
        },
        {
            field: "tabHidden",
            label: "是否显示tab",
            type: "switch",
            defaultValue: true,
            style: {
                "justify-content": "left",
            },
        },
        {
            field: "permission",
            label: "权限",
            type: "select",
            required: true,
            requiredType: "array",
            componentProps: {
                multiple: true,
                options: premissionList,
            },
        },
        {
            field: "order",
            label: "排序",
            type: "input-number",
            defaultValue: 0,
            componentProps: {
                min: 0,
                max: 100,
                precision: 0,
            },
        },
    ])
    const appStore = appPinia()

    const menuList = (title) => {
        return appStore.treeMenus
            .filter((e) => e.path !== "/home")
            .filter((e) => e.title !== title)
            .map((e) => ({
                label: e.title,
                value: e.id,
            }))
    }
    async function handleSubmit(values: Recordable) {
        loading.value = true
        await apiMap[title.value]({
            ...values,
            permission: values.permission?.join(","),
        }).finally(() => {
            loading.value = false
        })
        window?.$message.success(
            title.value === TYPE.ADD ? "新增成功" : "编辑成功"
        )
        showModal.value = false
        naiveUiTableRef?.value.refresh()
    }

    async function fun(type, { row = {} }) {
        title.value = type
        if (type === TYPE.DELETE) {
            await apiMap[TYPE.DELETE]({
                id: row.id,
            })
            window?.$message.success("删除成功")
            naiveUiTableRef?.value.refresh()
        } else {
            showModal.value = true
            nextTick(() => {
                modalFormRef?.value.setValue(deal(row))
            })
        }
    }
    function deal(row) {
        return {
            ...row,
            pid: row.pid || undefined,
            permission: (row.permission || "").split(",").filter(Boolean),
            parentType: !row.pid ? "1" : "0",
        }
    }

    async function getTableList(params: any) {
        return await apiMap[TYPE.LIST](params)
    }

    function dataCallback(data) {
        return toTree({ arr: data })
    }

    return {
        loading,
        columns,
        showModal,
        title,
        modalFormRef,
        schemas,
        handleSubmit,
        fun,
        getTableList,
        dataCallback,
        naiveUiTableRef,
    }
}
