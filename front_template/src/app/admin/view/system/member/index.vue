<template>
    <div>
        <Modal ref="modelRef" @success="compHandle.getTableData" />
        <n-grid cols="24" x-gap="10" item-responsive responsive="screen">
            <n-grid-item span="24 m:24 l:24">
                <n-space :wrap-item="false">
                    <n-card content-style="padding: 0;">
                        <n-tabs
                            type="line"
                            size="large"
                            :tabs-padding="10"
                            pane-style="padding: 10px;"
                        >
                            <n-tab-pane name="查询数据">
                                <n-form
                                    style="margin-bottom: -24px"
                                    label-placement="left"
                                    label-align="right"
                                    :show-label="true"
                                    ref="searchFormRef"
                                    inline
                                    :label-width="60"
                                    :model="compData.searchForm"
                                >
                                    <n-grid
                                        cols="24"
                                        x-gap="10"
                                        item-responsive
                                        responsive="screen"
                                    >
                                        <n-grid-item span="24 m:12 l:8">
                                            <n-form-item
                                                label="用户名"
                                                path="userName"
                                            >
                                                <n-input
                                                    v-model:value="
                                                        compData.searchForm
                                                            .userName
                                                    "
                                                    placeholder="输入用户名"
                                                />
                                            </n-form-item>
                                        </n-grid-item>
                                        <n-grid-item span="24 m:12 l:8">
                                            <n-form-item
                                                label="角色"
                                                path="role"
                                            >
                                                <n-select
                                                    :options="roleOptions"
                                                    v-model:value="
                                                        compData.searchForm.role
                                                    "
                                                    placeholder="选择角色"
                                                />
                                            </n-form-item>
                                        </n-grid-item>
                                        <n-grid-item span="24 m:12 l:8">
                                            <n-form-item>
                                                <n-space>
                                                    <n-button
                                                        attr-type="button"
                                                        @click="
                                                            compHandle.search
                                                        "
                                                    >
                                                        搜索
                                                    </n-button>
                                                </n-space>
                                                <n-space
                                                    style="margin-left: 10px"
                                                >
                                                    <n-button
                                                        attr-type="button"
                                                        @click="formRest"
                                                    >
                                                        重置
                                                    </n-button>
                                                </n-space>
                                            </n-form-item>
                                        </n-grid-item>
                                    </n-grid>
                                </n-form>
                            </n-tab-pane>
                            <n-tab-pane name="表格操作">
                                <n-space>
                                    <n-button
                                        color="#52C41A"
                                        @click="compHandle.action(TYPE.ADD)"
                                        >新增数据</n-button
                                    >
                                    <n-button
                                        color="#1890ff"
                                        :loading="compData.loading"
                                        @click="compHandle.getTableData"
                                    >
                                        刷新数据
                                    </n-button>
                                    <n-popselect
                                        v-model:value="compData.tableSizeValue"
                                        :options="compData.tableSize"
                                        trigger="click"
                                    >
                                        <n-button
                                            strong
                                            secondary
                                            type="warning"
                                            >表格大小</n-button
                                        >
                                    </n-popselect>
                                    <n-popover
                                        trigger="click"
                                        placement="bottom"
                                    >
                                        <template #trigger>
                                            <n-button
                                                strong
                                                secondary
                                                type="info"
                                                >设置表列</n-button
                                            >
                                        </template>
                                        <n-checkbox-group
                                            v-model:value="
                                                compData.columnsOptionsValue
                                            "
                                            @update:value="
                                                compHandle.handleColumnsOptions
                                            "
                                        >
                                            <n-space vertical align="start">
                                                <n-checkbox
                                                    v-for="item in compData.columnsOptions"
                                                    :key="item.key"
                                                    :value="item.key"
                                                    :label="item.title"
                                                    :disabled="item.disabled"
                                                ></n-checkbox>
                                            </n-space>
                                        </n-checkbox-group>
                                    </n-popover>
                                </n-space>
                            </n-tab-pane>
                        </n-tabs>
                    </n-card>
                    <n-card
                        :segmented="{ content: true, footer: true }"
                        footer-style="padding:10px"
                        content-style="padding:0px"
                    >
                        <n-data-table
                            :bordered="false"
                            :bottom-bordered="false"
                            :columns="compData.columns"
                            :data="compData.tableData"
                            :single-line="false"
                            :loading="compData.loading"
                            :size="compData.tableSizeValue"
                            :row-key="compData.rowKey"
                            @update:checked-row-keys="compHandle.check"
                            :pagination="false"
                        />
                        <template #footer>
                            <n-pagination
                                :item-count="compData.total"
                                :page-sizes="compData.pageSize"
                                show-size-picker
                                size="large"
                                show-quick-jumper
                                style="justify-content: flex-end; flex: 1"
                                @update:page-size="
                                    (value) => (
                                        (compData.tablePageSize = value),
                                        compHandle.getTableData()
                                    )
                                "
                                @update:page="
                                    (value) => (
                                        (compData.tablePage = value),
                                        compHandle.getTableData()
                                    )
                                "
                            />
                        </template>
                    </n-card>
                </n-space>
            </n-grid-item>
        </n-grid>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import { useMessage } from "naive-ui"
import type { FormInst } from "naive-ui"
import {
    getAllUser,
    deleteUser,
    createUser,
    editUser,
} from "@/app/admin/api/app.ts"
import {
    createColumns,
    tableSize,
} from "@/app/admin/view/system/member/data.ts"
import { ROLE, TYPE } from "@/app/admin/view/system/enum.ts"
import Modal from "./components/modal.vue"

const searchFormRef = ref<FormInst | null>(null)
const modelRef = ref()
const message = useMessage()
const compData = reactive({
    tableData: [],
    tablePage: 1,
    tablePageSize: 5,
    total: 0,
    tableSizeValue: "medium",
    tableSize,
    loading: true,
    columns: [],
    sourceColumns: [],
    columnsOptions: [],
    columnsOptionsValue: [],
    searchForm: { userName: "", role: [] },
    pageSize: [5, 9],
    rowKey: (row: any) => row.userId,
    checkedRowKeys: [],
})
const compHandle = reactive({
    getTableData() {
        compData.loading = true
        getAllUser({
            ...compData.searchForm,
            page: compData.tablePage,
            size: compData.tablePageSize,
        })
            .then((res) => {
                compData.tableData = res.data
                compData.total = res.total
            })
            .finally(() => {
                compData.loading = false
            })
    },
    async del(row) {
        await deleteUser({
            userId: row.userId,
        })
        message.success("删除成功")
        compHandle.getTableData()
    },
    action(type, data = {}) {
        const method = type === TYPE.ADD ? createUser : editUser
        modelRef.value.init(type, data, method)
    },
    check(rowKeys: any) {
        compData.checkedRowKeys = rowKeys
    },
    handleColumnsOptions(value: (string | number)[]) {
        compData.columns = compData.sourceColumns.filter(
            (item) => value.indexOf(item.key) !== -1
        )
    },
    search() {
        compHandle.getTableData()
    },
})
compData.sourceColumns = createColumns({ compHandle })
compData.columns = compData.sourceColumns
compData.columnsOptionsValue = compData.sourceColumns.map((item) => item.key)
compData.columnsOptions = compData.sourceColumns
    .filter((item) => item.type !== "selection")
    .map((item) => {
        if (item.key === "actions") {
            item.disabled = true
        }
        return item
    })
compHandle.getTableData()
const formRest = () => {
    compData.searchForm = { userName: "", role: [] }
    compHandle.getTableData()
}
const roleOptions = Object.entries(ROLE).map(([key, value]) => ({
    label: value,
    value: key,
}))
</script>
