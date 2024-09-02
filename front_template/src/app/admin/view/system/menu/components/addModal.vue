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
            <n-form-item path="parentType" label="是否父类" required>
                <n-radio-group v-model:value="model.form.parentType">
                    <n-radio :value="'1'">是</n-radio>
                    <n-radio :value="'0'">否</n-radio>
                </n-radio-group>
            </n-form-item>
            <n-form-item
                path="pid"
                label="父级"
                v-if="model.form.parentType == '0'"
                required
            >
                <n-select
                    v-model:value="model.form.pid"
                    placeholder="请选择父级"
                    :options="menuList"
                />
            </n-form-item>
            <n-form-item label="菜单名称" path="title">
                <n-input
                    v-model:value="model.form.title"
                    placeholder="请输入菜单名称"
                />
            </n-form-item>
            <n-form-item label="路径" path="path">
                <n-input
                    v-model:value="model.form.path"
                    placeholder="请输入hash路径"
                />
            </n-form-item>
            <n-form-item label="文件地址" path="file">
                <n-input
                    v-model:value="model.form.file"
                    placeholder="请输入文件地址"
                />
            </n-form-item>
            <n-form-item label="图标" path="icon">
                <n-button :circle="model.form.icon?.length" @click="selectIcon">
                    <template #icon v-if="model.form.icon">
                        <n-icon>
                            <component :is="model.form.icon" />
                        </n-icon>
                    </template>
                    <template v-if="!model.form.icon"> 请选择图标 </template>
                </n-button>
                <ChooseIcon ref="chooseIconRef" @choose="chooseEmit" />
            </n-form-item>
            <n-form-item label="是否显示" path="shows">
                <n-switch v-model:value="model.form.shows" />
            </n-form-item>
            <n-form-item label="是否外链" path="isIframe">
                <n-switch v-model:value="model.form.isIframe" />
            </n-form-item>
            <n-form-item label="外链地址" path="url" v-if="model.form.isIframe">
                <n-input
                    v-model:value="model.form.url"
                    placeholder="请输入外链地址"
                />
            </n-form-item>
            <n-form-item label="是否缓存" path="keepAlive">
                <n-switch v-model:value="model.form.keepAlive" />
            </n-form-item>
            <n-form-item label="是否固定" path="tabFix">
                <n-switch v-model:value="model.form.tabFix" />
            </n-form-item>
            <n-form-item label="是否显示tab" path="tabHidden">
                <n-switch v-model:value="model.form.tabHidden" />
            </n-form-item>
            <n-form-item label="权限" path="premission">
                <n-select
                    multiple
                    v-model:value="model.form.premission"
                    placeholder="请选择权限"
                    :options="[
                        {
                            label: '管理员',
                            value: 'ROLE_ADMIN',
                        },
                        {
                            label: '用户',
                            value: 'ROLE_USER',
                        },
                    ]"
                /> </n-form-item
            ><n-form-item label="排序" path="order" required>
                <n-input-number
                    v-model:value="model.form.order"
                    button-placement="both"
                    placeholder="请输入排序"
                />
            </n-form-item>
        </n-form>
    </n-modal>
</template>
<script lang="ts" setup>
import { ref, defineExpose, computed } from "vue"
import ChooseIcon from "@components/chooseIcon.vue"
import appPinia from "@/packages/pinia/app.ts"
import { validateUrl } from "@/packages/utils/utils.ts"

const appStore = appPinia()
const emit = defineEmits(["success"])
const formRef = ref()
const model = ref({
    form: {
        parentType: "1",
        pid: undefined,
        title: "",
        path: "",
        file: "",
        icon: "",
        isIframe: false,
        url: "",
        shows: true,
        keepAlive: false,
        tabFix: false,
        tabHidden: true,
        order: 0,
        premission: [],
    },
    visible: false,
    title: "",
    methods: () => {},
})
const menuList = ref(
    appStore.treeMenus
        .filter((e) => e.path !== "/home")
        .map((e) => ({
            label: e.title,
            value: e.id,
        }))
)
const rules = computed(() => {
    return {
        title: [
            {
                required: true,
                message: "请输入标题",
                trigger: "blur",
            },
        ],
        path: [
            {
                required: true,
                message: "请输入hash路径",
                trigger: "blur",
            },
        ],
        file: [
            {
                required: true,
                message: "请输入文件路径",
                trigger: "blur",
            },
        ],
        icon: [
            {
                required: true,
                message: "请选择图标",
                trigger: "blur",
            },
        ],
        pid: [
            {
                required: true,
                message: "请选择父级",
                trigger: "blur",
            },
        ],
        url: {
            required: model.value.form.isIframe,
            message: "请输入外链地址",
            trigger: "blur",
            validator: (rule, value) => {
                return validateUrl(value)
            },
        },
    }
})
const loading = ref(false)
const submit = async () => {
    loading.value = true
    await formRef.value.validate()
    model.value
        .methods({
            ...model.value.form,
        })
        .then(() => {
            cancel()
            emit("success")
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
const chooseIconRef = ref()
const selectIcon = () => {
    chooseIconRef.value.visible = true
}
const chooseEmit = (item) => {
    model.value.form.icon = item.name
    formRef.value.validate("icon")
}
defineExpose({
    model,
})
</script>
