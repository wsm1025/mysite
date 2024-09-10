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
        style="width: 600px"
    >
        <n-form
            ref="formRef"
            :model="model.form"
            :rules="rules"
            label-placement="left"
            label-width="100"
        >
            <n-form-item path="userName" label="用户名">
                <n-input
                    v-model:value="model.form.userName"
                    maxlength="10"
                    placeholder="请输入用户名"
                />
            </n-form-item>
            <n-form-item path="nickName" label="昵称">
                <n-input
                    v-model:value="model.form.nickName"
                    maxlength="10"
                    placeholder="请输入昵称"
                />
            </n-form-item>
            <n-form-item path="avatar" label="头像"> </n-form-item>
            <n-form-item path="email" label="邮箱">
                <n-input
                    v-model:value="model.form.email"
                    maxlength="20"
                    placeholder="请输入邮箱"
                />
            </n-form-item>
            <n-form-item path="operationList" label="权限">
                <n-select
                    v-model:value="model.form.operationList"
                    placeholder="请选择权限"
                    multiple
                    clearable
                    :options="operationOptions"
                />
            </n-form-item>
            <n-form-item label="角色" path="role">
                <n-select
                    v-model:value="model.form.role"
                    placeholder="请选择角色"
                    :options="roleOptions"
                />
            </n-form-item>
        </n-form>
    </n-modal>
</template>
<script lang="ts" setup>
import { ref, defineExpose } from "vue"
import { TYPE } from "../../enum"
import { findDicByParentName, getOperationList } from "@/app/admin/api/app.ts"
import { validateEmail } from "@/packages/utils/utils.ts"

const emit = defineEmits(["success"])
const formRef = ref()
const operationOptions = ref([])
getOperationList().then((res) => {
    operationOptions.value = res.map((item) => {
        return {
            label: item.text,
            value: item.value,
        }
    })
})
const roleOptions = ref([])
findDicByParentName("ROLE").then((res) => {
    roleOptions.value = res.map((e) => ({
        label: e.dictionaryName,
        value: e.dictionaryValue,
    }))
})

const model = ref({
    form: {
        userName: "",
        nickName: "",
        avatar: "",
        operationList: [],
        role: undefined,
        email: "",
    },
    visible: false,
    title: "",
    methods: () => {},
})
const rules = {
    userName: [
        {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
        },
    ],
    avatar: [
        {
            required: true,
            message: "请上传头像",
            trigger: "blur",
        },
    ],
    role: [
        {
            required: true,
            message: "请选择角色",
            trigger: "blur",
        },
    ],
    email: [
        {
            message: "请输入正确的邮箱",
            trigger: "blur",
            validator: (rule, value) => {
                return validateEmail(value)
            },
        },
    ],
    operationList: [
        {
            required: true,
            message: "请选择权限",
            trigger: "blur",
        },
    ],
}
const loading = ref(false)
const submit = async () => {
    await formRef.value.validate()
    loading.value = true
    model.value
        .methods({
            ...model.value.form,
        })
        .then(() => {
            cancel()
            emit("success")
            window.$message.success("操作成功")
        })
        .finally(() => {
            loading.value = false
        })
}
const cancel = () => {
    model.value = {
        form: {},
        visible: false,
        title: "",
        methods: () => {},
    }
}
const init = (type, data, method) => {
    model.value.visible = true
    model.value.title = type == TYPE.ADD ? "新增用户" : "编辑用户"
    model.value.methods = method
    if (type == TYPE.EDIT) {
        model.value.form = {
            ...data,
            operationList: data.operationList.split(","),
        }
    }
}
defineExpose({
    init,
})
</script>
