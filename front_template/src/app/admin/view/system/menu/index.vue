<template>
    <n-grid cols="24" x-gap="10" item-responsive responsive="screen">
        <n-grid-item span="24 m:24 l:24">
            <n-space :wrap-item="false">
                <n-card
                    :segmented="{ content: true, footer: true }"
                    header-style="padding:0"
                    footer-style="padding:10px"
                    content-style="padding:0px;"
                >
                    <template #header>
                        <n-space justify="start" style="padding: 10px">
                            <n-button
                                type="primary"
                                @click="compHandle.action(TYPE.ADD)"
                            >
                                新增
                            </n-button>
                            <n-popover trigger="click" placement="bottom">
                                <template #trigger>
                                    <n-button strong secondary type="info">
                                        设置表列
                                    </n-button>
                                </template>
                                <n-checkbox-group
                                    v-model:value="compData.columnsOptionsValue"
                                    @update:value="
                                        compHandle.handleColumnsOptions
                                    "
                                >
                                    <n-space vertical align="start">
                                        <n-checkbox
                                            v-for="item in compData.columnsOptions"
                                            :key="item.value"
                                            :value="item.key"
                                            :label="item.title"
                                            :disabled="item.disabled"
                                        ></n-checkbox>
                                    </n-space>
                                </n-checkbox-group>
                            </n-popover>
                        </n-space>
                    </template>
                    <n-data-table
                        :bordered="false"
                        :bottom-bordered="false"
                        :columns="compData.columns"
                        :data="compData.tableData"
                        :pagination="compData.pagination"
                        :single-line="false"
                        :loading="compData.loading"
                        :size="compData.tableSizeValue"
                        :default-expanded-row-keys="[200]"
                    />
                    <template #footer>
                        <n-pagination
                            v-model:page="compData.tablePage"
                            :page-count="1"
                            size="large"
                            show-quick-jumper
                            show-size-picker
                            style="justify-content: flex-end; flex: 1"
                        />
                    </template>
                </n-card>
            </n-space>
            <Modal ref="modelRef" @success="() => compHandle.getTableData()" />
        </n-grid-item>
    </n-grid>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import { menus } from "@/app/admin/api/app.ts"
import { toTree } from "@/packages/utils/utils.ts"
import Modal from "./components/modal.vue"
import { createMenu, menuFiled } from "@api/app.ts"
import { createColumns } from "./data"
import { TYPE } from "../enum"

const modelRef = ref()

const compData = reactive({
    tableData: [],
    tablePage: 1,
    loading: true,
    columns: [],
    sourceColumns: [],
    columnsOptions: [],
    columnsOptionsValue: [],
    pagination: false,
})
const compHandle = reactive({
    getTableData() {
        compData.loading = true
        menus()
            .then((res) => {
                compData.tableData = toTree({ arr: res })
            })
            .finally(() => {
                compData.loading = false
            })
    },
    action(type, data = {}) {
        const method = TYPE.ADD ? createMenu : menuFiled
        modelRef.value.init(type, data, method)
    },
    handleColumnsOptions(value: (string | number)[]) {
        compData.columns = compData.sourceColumns.filter(
            (item) => value.indexOf(item.key) !== -1
        )
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
</script>
