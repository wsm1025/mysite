<template>
    <n-grid cols="24" x-gap="10" item-responsive responsive="screen">
        <n-grid-item span="24 m:24 l:24">
            <n-space :wrap-item="false">
                <n-card
                    :segmented="{ content: true, footer: true }"
                    header-style="padding:0px 0px;border:none"
                    footer-style="padding:10px"
                >
                    <template #header>
                        <n-space justify="start" style="padding: 10px">
                            <n-button type="primary" @click="handle(TYPE.ADD)">
                                新增
                            </n-button>
                            <n-input
                                placeholder="搜索"
                                v-model:value="keyWord"
                                @blur="init"
                            >
                                <template #prefix>
                                    <n-icon :component="FlashOutline" />
                                </template>
                            </n-input>
                        </n-space>
                    </template>
                    <n-data-table
                        :columns="columns"
                        :data="tableData"
                        :loading="loading"
                        default-expand-all
                        :rowKey="(row) => row.id"
                        :pagination="pagination"
                    />
                </n-card>
                <Modal ref="modelRef" @success="() => init()" />
            </n-space>
        </n-grid-item>
    </n-grid>
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref, h } from "vue"
import { NSwitch, NButton, NSpace, NPopconfirm } from "naive-ui"
import { FlashOutline } from "@vicons/ionicons5"
import {
    dictionaryAll,
    dictionaryFiled,
    createDic,
    findDicById,
    deleteDicById,
} from "@/app/admin/api/app.ts"
import dayjs from "dayjs"
import Modal from "./components/modal.vue"
import { TYPE } from "../enum.ts"

const tabData: Ref<Array<{ name: string; value: string }>> = ref([])
const tableData = ref([])

const loading: Ref<boolean> = ref(false)
const keyWord: Ref<string> = ref("")

const columns = ref([
    {
        title: "字典名称",
        key: "dictionaryName",
    },
    {
        title: "字典值",
        key: "dictionaryValue",
    },
    {
        title: "字典描述",
        key: "dictionaryDesc",
        render: ({ dictionaryDesc }) => {
            return dictionaryDesc || "-"
        },
    },
    {
        title: "创建时间",
        key: "createTime",
        render: ({ createTime }) => {
            return dayjs(createTime).format("YYYY-MM-DD HH:mm:ss") || "-"
        },
    },
    {
        title: "更新时间",
        key: "updateTime",
        render: ({ updateTime }) => {
            return dayjs(updateTime).format("YYYY-MM-DD HH:mm:ss") || "-"
        },
    },
    {
        title: "创建人",
        key: "createBy",
        render: ({ createBy }) => {
            return createBy || "-"
        },
    },
    {
        title: "更新人",
        key: "updateBy",
        render: ({ updateBy }) => {
            return updateBy || "-"
        },
    },
    {
        title: "状态",
        key: "status",
        render(row) {
            return h(NSwitch, {
                value: row.status == 0,
                size: "small",
                onUpdateValue: async (value) => {
                    await dictionaryFiled({
                        status: String(Number(!value)),
                        id: row.id,
                    })
                    init()
                },
            })
        },
    },
    {
        title: "操作",
        key: "action",
        render(row) {
            return [
                h(
                    NButton,
                    {
                        type: "info",
                        size: "small",
                        onClick: async () => {
                            const data = await findDicById(row.id)
                            handle(TYPE.EDIT, data)
                        },
                        style: {
                            marginRight: "4px",
                        },
                    },
                    {
                        default: () => "编辑",
                    }
                ),
                h(
                    NPopconfirm,
                    {
                        positiveText: "确定",
                        negativeText: "取消",
                        onPositiveClick: async () => {
                            await deleteDicById({ id: row.id, isDelete: "1" })
                            init()
                        },
                    },
                    {
                        trigger: () =>
                            h(
                                NButton,
                                {
                                    type: "error",
                                    size: "small",
                                },
                                {
                                    default: () => "删除",
                                }
                            ),
                        default: () => "确定删除吗？",
                    }
                ),
            ]
        },
    },
])
const pagination = {
    pageSize: 10,
}

onMounted(() => {
    init()
})
const init = async () => {
    loading.value = true
    await getTabData()
    loading.value = false
}
const getTabData = async () => {
    const { columns } = await dictionaryAll({ keyWord: keyWord.value })
    tableData.value = columns
    tabData.value = columns.map((e) => ({
        label: e.dictionaryName,
        value: e.id,
    }))
}
const modelRef = ref()
const handle = (type, data) => {
    modelRef.value.model.visible = true
    modelRef.value.model.title = type == TYPE.ADD ? "新增字典" : "编辑字典"
    modelRef.value.model.tabData = tabData.value
    modelRef.value.model.methods =
        type == TYPE.ADD ? createDic : dictionaryFiled
    if (type == TYPE.EDIT) {
        modelRef.value.model.form = { ...data, type: TYPE.EDIT }
    }
}
</script>
../enum.ts
