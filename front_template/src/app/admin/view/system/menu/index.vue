<template>
    <div>
        <NaiveUiTable
            ref="naiveUiTableRef"
            :columns="columns"
            :requestApi="getTableList"
            striped
            :isPageApi="false"
            :dataCallback="dataCallback"
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
        >
            <template #icon="{ formValue, field }">
                <n-button
                    :circle="Boolean(formValue.icon?.length)"
                    @click="selectIcon"
                >
                    <template #icon v-if="formValue.icon">
                        <n-icon>
                            <component :is="formValue.icon" />
                        </n-icon>
                    </template>
                    <template v-if="!formValue.icon"> 请选择图标 </template>
                </n-button>
                <ChooseIcon ref="chooseIconRef" @choose="chooseEmit" />
            </template>
        </ModalForm>
    </div>
</template>

<script lang="tsx" setup>
import { NButton } from "naive-ui"
import useMenu from "./useMenu"
import { TYPE } from "../enum"
import ChooseIcon from "@components/chooseIcon.vue"
import { ref } from "vue"

const {
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
} = useMenu()
const chooseIconRef = ref()

const selectIcon = () => {
    chooseIconRef.value.visible = true
}
const chooseEmit = (item) => {
    modalFormRef.value.setValue({
        ...modalFormRef.value.getValue(),
        icon: item.name,
    })
    modalFormRef.value?.validate(["icon"])
}
</script>
