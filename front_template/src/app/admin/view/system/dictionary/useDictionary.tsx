import {
    type TableInstance,
    type TableColumns,
    type FormProps,
} from "naive-ui-table"
import { type Recordable, type ModalFormInstance } from "naive-ui-form"
import {
    dictionaryAll,
    createDic,
    dictionaryFiled,
    deleteDicById,
} from "@/app/admin/api/app.ts"
import { computed, h, nextTick, Ref, ref } from "vue"
import { TYPE } from "../enum"
import { NSelect, NSwitch } from "naive-ui"
import dayjs from "dayjs"

export default function useMenu() {
    const apiMap = [dictionaryAll, createDic, dictionaryFiled, deleteDicById]
    const columns: TableColumns = [
        { title: "字典名称", key: "dictionaryName", align: "left", width: 180 },
        {
            title: "字典值",
            key: "dictionaryValue",
            width: 150,
            align: "center",
        },
        {
            title: "字典描述",
            key: "dictionaryDesc",
            width: 80,
            align: "center",
            render: (row) => h("span", null, row.dictionaryDesc || "-"),
        },
        {
            title: "创建时间",
            key: "createTime",
            align: "center",
            render: (row) =>
                dayjs(row.createTime).format("YYYY-MM-DD HH:mm:ss") || "-",
        },
        {
            title: "更新时间",
            key: "updateTime",
            align: "center",
            render: (row) =>
                dayjs(row.updateTime).format("YYYY-MM-DD HH:mm:ss") || "-",
        },
        {
            title: "创建人",
            key: "createBy",
            align: "center",
            render: (row) => h("span", null, row.createBy || "-"),
        },
        {
            title: "更新人",
            key: "updateBy",
            align: "center",
            render: (row) => h("span", null, row.updateBy || "-"),
        },
        {
            title: "状态",
            key: "status",
            align: "center",
            render: (row) => <NSwitch value={row.status == 1} disabled />,
        },
        {
            title: "操作",
            key: "operation",
            align: "center",
            width: 200,
        },
    ]
    const search: Ref<FormProps> = computed(() => {
        return {
            schemas: [
                {
                    label: "关键字",
                    field: "keyWord",
                    type: "input",
                },
            ],
        }
    })
    const showModal = ref(false)
    const loading = ref(false)
    const title = ref<number>(-1)
    const modalFormRef = ref<ModalFormInstance | null>()
    const naiveUiTableRef = ref<TableInstance | null>()

    const pidOptions = ref([])
    dictionaryAll().then((res) => {
        pidOptions.value = res.map((e) => ({
            label: e.dictionaryName,
            value: e.id,
        }))
    })
    const schemas = computed(() => [
        {
            field: "parentType",
            label: "是否父类",
            type: "radio",
            required: true,
            defaultValue: "1",
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
                        options: pidOptions.value.filter(
                            (item) => item.value !== formValue["id"]
                        ),
                    },
                }
            },
        },
        {
            field: "dictionaryName",
            label: "字典名称",
            type: "input",
            required: true,
            componentProps: {
                maxlength: "10",
            },
        },
        {
            field: "dictionaryValue",
            label: "字典值",
            type: "input",
            required: true,
            componentProps: {
                maxlength: "10",
            },
        },
        {
            field: "dictionaryDesc",
            label: "字典描述",
            type: "input",
            componentProps: {
                type: "textarea",
                maxlength: "50",
            },
        },
        {
            field: "status",
            label: "是否启用",
            type: "radio",
            required: true,
            defaultValue: "1",
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
    ])
    async function handleSubmit(values: Recordable) {
        loading.value = true
        await apiMap[title.value]({
            ...values,
        }).finally(() => {
            loading.value = false
        })
        window?.$message.success(
            title.value === TYPE.ADD ? "新增成功" : "编辑成功"
        )
        showModal.value = false
        naiveUiTableRef?.value.refresh()
    }

    async function fun(type, { row = { id: "" } }) {
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
            type: title.value,
        }
    }
    async function getTableList(params: any) {
        return await apiMap[TYPE.LIST](params)
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
        search,
        getTableList,
        naiveUiTableRef,
    }
}
