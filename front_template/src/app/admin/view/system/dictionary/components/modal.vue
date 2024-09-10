<template>
    <n-modal
        :show="model.visible"
        :mask-closable="false"
        preset="dialog"
        :title="model.title"
        positive-text="确认"
        negative-text="取消"
        @positive-click="submit"
        @negative-click="cancel"
        @close="cancel"
        :loading="loading"
    >
        <n-form
            ref="formRef"
            :model="model.form"
            :rules="rules"
            label-placement="left"
            label-width="100"
            style="padding-top: 10px"
        >
            <n-form-item path="parentType" label="是否父类" required>
                <n-radio-group v-model:value="model.form.parentType">
                    <n-radio :value="'1'">是</n-radio>
                    <n-radio :value="'0'">否</n-radio>
                </n-radio-group>
            </n-form-item>
            <n-form-item
                path="parentId"
                label="父级"
                v-if="model.form.parentType == '0'"
            >
                <n-select
                    v-model:value="model.form.parentId"
                    placeholder="请选择父级"
                    :options="
                        model.tabData.filter(
                            (item) => item.value !== model.form.id
                        )
                    "
                />
            </n-form-item>
            <n-form-item path="dictionaryName" label="字典名称" required>
                <n-input
                    v-model:value="model.form.dictionaryName"
                    maxlength="10"
                />
            </n-form-item>
            <n-form-item path="dictionaryValue" label="字典值" required>
                <n-input
                    :disabled="model.form.type === TYPE.EDIT"
                    v-model:value="model.form.dictionaryValue"
                    maxlength="10"
                />
            </n-form-item>
            <n-form-item path="dictionaryDesc" label="字典描述">
                <n-input
                    v-model:value="model.form.dictionaryDesc"
                    maxlength="50"
                />
            </n-form-item>
            <n-form-item path="status" label="是否启用" required>
                <n-radio-group v-model:value="model.form.status">
                    <n-radio :value="'0'">是</n-radio>
                    <n-radio :value="'1'">否</n-radio>
                </n-radio-group>
            </n-form-item>
        </n-form>
    </n-modal>
</template>
<script lang="ts" setup>
import { ref, defineExpose } from "vue"
import { TYPE } from "../../enum.ts"
const emit = defineEmits(["success"])
const formRef = ref()
const model = ref({
    form: {
        parentType: "1",
        parentId: null,
        dictionaryName: "",
        dictionaryValue: "",
        dictionaryDesc: "",
        status: "0",
    },
    visible: false,
    tabData: [],
    title: "",
    methods: () => {},
})
const rules = ref({
    dictionaryName: [
        {
            required: true,
            message: "请输入字典名称",
            trigger: "blur",
        },
    ],
    dictionaryValue: [
        {
            required: true,
            message: "请输入字典值",
            trigger: "blur",
        },
    ],
    status: [
        {
            required: true,
            message: "请选择是否启用",
            trigger: "blur",
        },
    ],
    parentId: [
        {
            required: model.value.form.parentType == "1",
            message: "请选择父级",
            trigger: "blur",
        },
    ],
})
const loading = ref(false)
const submit = async () => {
    await formRef.value.validate()
    loading.value = true
    model.value
        .methods({
            ...model.value.form,
            parentId:
                model.value.form.parentType == "1"
                    ? null
                    : model.value.form.parentId,
        })
        .then(() => {
            window.$message.success("操作成功")
            cancel()
            emit("success")
        })
        .finally(() => {
            loading.value = false
        })
}
const cancel = () => {
    model.value = {
        form: {
            parentType: "1",
            parentId: null,
            dictionaryName: "",
            dictionaryValue: "",
            dictionaryDesc: "",
            status: "0",
        },
        visible: false,
        tabData: [],
        title: "",
        methods: () => {},
    }
}
defineExpose({
    model,
})
</script>
../../enum.ts
