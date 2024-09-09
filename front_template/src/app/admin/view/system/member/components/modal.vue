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
        </n-form>
    </n-modal>
</template>
<script lang="ts" setup>
import { ref, defineExpose, computed } from "vue"
import { useMessage } from "naive-ui"
import { TYPE } from "../../enum"

const message = useMessage()
const emit = defineEmits(["success"])
const formRef = ref()
const model = ref({
    form: {},
    visible: false,
    title: "",
    methods: () => {},
})
const rules = computed(() => {
    return {}
})
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
            message.success("操作成功")
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
        }
    }
}
defineExpose({
    init,
})
</script>
