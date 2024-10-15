<template>
    <div>
        <NaiveUiTable
            ref="naiveUiTableRef"
            :columns="columns"
            :requestApi="getTableList"
            striped
            :isPageApi="false"
            :search-props="search"
        >
            <template #tableHeader>
                <n-button
                    size="small"
                    type="primary"
                    @click="fun(TYPE.ADD, {})"
                >
                    新增
                </n-button>
            </template>
            <template #operation="row, index">
                <n-button
                    size="small"
                    type="primary"
                    ghost
                    @click="fun(TYPE.EDIT, row)"
                >
                    编辑
                </n-button>
                <n-popconfirm @positive-click="fun(TYPE.DELETE, row)">
                    <template #trigger>
                        <n-button type="error" size="small" ghost>
                            删除
                        </n-button>
                    </template>
                    确认删除该条数据嘛？
                </n-popconfirm>
            </template>
        </NaiveUiTable>
        <ModalForm
            v-model:show="showModal"
            :schemas="schemas"
            ref="modalFormRef"
            :title="title == TYPE.ADD ? '新增菜单' : '编辑菜单'"
            :loading="loading"
            @submit="handleSubmit"
        />
    </div>
</template>

<script lang="tsx" setup>
import useDictionary from "./useDictionary.tsx"
import { NButton } from "naive-ui"
import { TYPE } from "../enum"

const {
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
} = useDictionary()
</script>
