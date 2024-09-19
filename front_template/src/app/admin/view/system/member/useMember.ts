import {
    type TableInstance,
    type TableColumns,
    type FormProps,
} from "naive-ui-table"
import {
    type FormSchema,
    type Recordable,
    type ModalFormInstance,
} from "naive-ui-form"
import {
    getAllUser,
    createUser,
    editUser,
    deleteUser,
    findDicByParentName,
    getOperationList,
    uploadFile,
} from "@/app/admin/api/app.ts"
import { computed, h, nextTick, ref, type Ref } from "vue"
import dayjs from "dayjs"
import { ROLE, TYPE } from "../enum"
import { validateEmail } from "@/packages/utils/utils.ts"
export default function useForm() {
    const roleOptions = ref([])
    const operationOptions = ref([])

    const apiMap = [getAllUser, createUser, editUser, deleteUser]
    const search: Ref<FormProps> = computed(() => {
        return {
            schemas: [
                {
                    label: "用户名",
                    field: "userName",
                    type: "input",
                },
                {
                    label: "角色",
                    field: "role",
                    type: "select",
                    componentProps: {
                        options: roleOptions,
                    },
                },
            ],
        }
    })
    const columns: TableColumns = [
        { title: "用户名", key: "userName" },
        {
            title: "昵称",
            key: "nickName",
            render: (row) => row.nickName || "-",
        },
        {
            title: "邮箱",
            key: "email",
            render: (row) => h("span", {}, row.email || "-"),
        },
        {
            title: "创建时间",
            key: "createTime",
            render: (row) =>
                dayjs(row.createTime).format("YYYY-MM-DD HH:mm:ss") || "-",
        },
        {
            title: "更新时间",
            key: "updateTime",
            render: (row) =>
                dayjs(row.updateTime).format("YYYY-MM-DD HH:mm:ss") || "-",
        },
        {
            title: "角色",
            key: "opreration",
            width: 80,
            render: (row) => h("span", {}, ROLE[row.role]),
        },
        {
            title: "操作",
            key: "operation",
            fixed: "right",
            align: "center",
            width: 200,
        },
    ]
    const showModal = ref(false)
    const loading = ref(false)
    const title = ref<number>(-1)
    const modalFormRef = ref<ModalFormInstance | null>()
    const naiveUiTableRef = ref<TableInstance | null>()
    const schemas: Ref<FormSchema[]> = computed(() => [
        {
            field: "userName",
            label: "用户名",
            type: "input",
            required: true,
            componentProps: {
                disabled: title.value === TYPE.EDIT,
                maxlength: "10",
            },
        },
        {
            field: "nickName",
            label: "昵称",
            type: "input",
            maxlength: "10",
            componentProps: {
                maxlength: "10",
            },
        },
        {
            field: "avatar",
            label: "头像",
            type: "upload",
            required: true,
            requiredType: "array",
            componentProps: {
                requestFunc: uploadFile,
                max: 1,
                size: 2,
                accept: ".png,.jpg,.jpeg,.gif",
            },
        },
        {
            field: "email",
            label: "邮箱",
            type: "input",
            componentProps: {
                maxlength: "20",
            },
            rules: {
                message: "请输入正确的邮箱",
                trigger: ["blur", "input"],
                validator: (rule, value) => {
                    return value ? validateEmail(value) : Promise.resolve()
                },
            },
        },
        {
            field: "operationList",
            label: "权限",
            type: "select",
            required: true,
            requiredType: "array",
            componentProps: {
                options: operationOptions,
                multiple: true,
                clearable: true,
            },
        },
        {
            field: "role",
            label: "角色",
            type: "select",
            required: true,
            componentProps: {
                options: roleOptions,
            },
        },
    ])

    async function handleSubmit(values: Recordable) {
        loading.value = true
        await apiMap[title.value]({
            ...values,
            avatar: values.avatar[0].url,
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
        if (type === TYPE.DELETE) {
            await deleteUser({
                userId: row.userId,
            })
            window?.$message.success("删除成功")
            naiveUiTableRef?.value.refresh()
        } else {
            title.value = type
            showModal.value = true
            nextTick(() => {
                modalFormRef?.value.setValue(deal(row))
            })
        }
    }
    function deal(row) {
        row.avatar = Array.isArray(row.avatar)
            ? row.avatar
            : row.avatar
                  ?.split(",")
                  .filter(Boolean)
                  .map((e) => ({
                      name: e,
                      url: e,
                  })) || []

        row.operationList = Array.isArray(row.operationList)
            ? row.operationList
            : row.operationList?.split(",") || []
        return row
    }

    async function getTableList(params: any) {
        return await apiMap[TYPE.LIST](params)
    }

    findDicByParentName("ROLE").then((res) => {
        roleOptions.value = res.map((e) => ({
            label: e.dictionaryName,
            value: e.dictionaryValue,
        }))
    })
    getOperationList().then((res) => {
        operationOptions.value = res.map((item) => {
            return {
                label: item.text,
                value: item.value,
            }
        })
    })

    return {
        loading,
        roleOptions,
        operationOptions,
        search,
        columns,
        showModal,
        title,
        modalFormRef,
        schemas,
        handleSubmit,
        fun,
        deal,
        getTableList,
        naiveUiTableRef,
    }
}
