<template>
    <div class="user-set">
        <template v-if="app.configOptions.components.headerUserSet">
            <component
                v-bind="$attrs"
                :app="app"
                :darkTheme="darkTheme"
                :compData="compData"
                :is="app.configOptions.components.headerUserSet"
            ></component>
        </template>
        <template v-else>
            <template v-if="!app.browser.sm">
                <template v-for="(item, idx) in userIcon" :key="idx">
                    <n-el
                        v-if="item.show"
                        tag="div"
                        class="set-item hover-color"
                        @click="compData[item.name]"
                    >
                        <n-icon :size="item.size" :color="item.color">
                            <n-popover
                                v-if="item.name === 'NotificationsOutline'"
                                trigger="click"
                                style="padding: 0"
                            >
                                <template #trigger>
                                    <component :is="item.name"></component>
                                </template>
                                <n-card title="" style="margin-bottom: 16px">
                                    <n-tabs type="line" animated>
                                        <n-tab-pane name="oasis" tab="待办">
                                            <n-list
                                                style="width: 300px"
                                                hoverable
                                                clickable
                                            >
                                                <n-list-item>
                                                    <n-thing
                                                        title="你好，我是羊先生"
                                                        content-style="margin-top: 10px;"
                                                    >
                                                        <template #description>
                                                            <n-space
                                                                size="small"
                                                                style="
                                                                    margin-top: 4px;
                                                                "
                                                            >
                                                                <n-tag
                                                                    :bordered="
                                                                        false
                                                                    "
                                                                    type="info"
                                                                    size="small"
                                                                    >暑夜
                                                                </n-tag>
                                                                <n-tag
                                                                    :bordered="
                                                                        false
                                                                    "
                                                                    type="info"
                                                                    size="small"
                                                                    >晚春
                                                                </n-tag>
                                                            </n-space>
                                                        </template>
                                                        努力<br />
                                                    </n-thing>
                                                </n-list-item>
                                                <n-list-item>
                                                    <n-thing
                                                        title="我的标签"
                                                        content-style="margin-top: 10px;"
                                                    >
                                                        <template #description>
                                                            <n-space
                                                                size="small"
                                                                style="
                                                                    margin-top: 4px;
                                                                "
                                                            >
                                                                <n-tag
                                                                    :bordered="
                                                                        false
                                                                    "
                                                                    type="info"
                                                                    size="small"
                                                                    >前端程序员
                                                                </n-tag>
                                                                <n-tag
                                                                    :bordered="
                                                                        false
                                                                    "
                                                                    type="info"
                                                                    size="small"
                                                                    >杭州·西湖
                                                                </n-tag>
                                                                <n-tag
                                                                    :bordered="
                                                                        false
                                                                    "
                                                                    type="warning"
                                                                    size="small"
                                                                >
                                                                    上进
                                                                </n-tag>
                                                            </n-space>
                                                        </template>
                                                        看山看海<br />
                                                        会终生<br />
                                                        寻自我<br />
                                                    </n-thing>
                                                </n-list-item>
                                            </n-list>
                                        </n-tab-pane>
                                        <n-tab-pane
                                            name="the beatles"
                                            tab="消息"
                                        >
                                            <n-statistic
                                                label="你一共处理了"
                                                tabular-nums
                                            >
                                                <n-number-animation
                                                    ref="numberAnimationInstRef"
                                                    :from="0"
                                                    :to="12039"
                                                />
                                                <template #suffix>
                                                    条群消息
                                                </template>
                                            </n-statistic>
                                            <n-space vertical>
                                                花时间、花精力、花心思，愿你每一份努力都不负所望
                                                <n-button>处理群消息</n-button>
                                            </n-space>
                                        </n-tab-pane>
                                        <n-tab-pane name="jay chou" tab="通知">
                                            <n-empty
                                                description="你什么也找不到"
                                            >
                                                <template #extra>
                                                    <n-button size="small">
                                                        要不看看别的
                                                    </n-button>
                                                </template>
                                            </n-empty>
                                        </n-tab-pane>
                                    </n-tabs>
                                </n-card>
                            </n-popover>
                            <n-popover
                                v-else-if="item.name === 'HappyOutline'"
                                trigger="click"
                                style="padding: 0"
                            >
                                <template #trigger>
                                    <component :is="item.name"></component>
                                </template>
                                <n-card title="" style="margin-bottom: 16px">
                                    <n-tabs type="segment">
                                        <n-tab-pane name="chap1" tab="故乡">
                                            <n-h2>许巍</n-h2>
                                            天边夕阳再次映上我的脸庞，再次映着我那不安的心<br /><br />
                                            这是什么地方依然是如此的荒凉，那无尽的旅程如此漫长<br /><br />
                                            我是永远向着远方独行的浪子，你是茫茫人海之中我的女人<br /><br />
                                            在异乡的路上每一个寒冷的夜晚，这思念它如刀让我伤痛<br /><br />
                                            总是在梦里我看到你无助的双眼，我的心又一次被唤醒<br /><br />
                                            我站在这里想起和你曾经离别情景，你站在人群中间那么孤单<br /><br />
                                            那是你 衣裙漫飞，那是你 温柔如水<br />
                                        </n-tab-pane>
                                        <n-tab-pane name="chap2" tab="平凡之路">
                                            <n-h2>朴树</n-h2>
                                            徘徊着的 在路上的 你要走吗 Via Via
                                            易碎的 骄傲着 那也曾是我的模样<br /><br />
                                            沸腾着的 不安着的 你要去哪 Via Via
                                            谜一样的 沉默着的
                                            故事你真的在听吗<br /><br />
                                            我曾经跨过山和大海 也穿过人山人海
                                            <br /><br />
                                            我曾经拥有着的一切 转眼都飘散如烟<br /><br />
                                            我曾经失落失望失掉所有方向
                                            直到看见平凡才是唯一的答案<br />
                                        </n-tab-pane>
                                        <n-tab-pane name="chap3" tab="成都">
                                            <n-h2>赵雷</n-h2>
                                            让我掉下眼泪的
                                            不止昨夜的酒，让我依依不舍的
                                            不止你的温柔<br /><br />
                                            雨路还要走多久
                                            你攥着我的手，让我感到为难的
                                            是挣扎的自由<br /><br />
                                            分别总是在九月
                                            回忆是思念的愁，深秋嫩绿的垂柳
                                            亲吻着我额头<br /><br />
                                            在那座阴雨的小城里
                                            我从未忘记你，成都 带不走的
                                            只有你<br />
                                        </n-tab-pane>
                                    </n-tabs>
                                </n-card>
                            </n-popover>
                            <component v-else :is="item.name"></component>
                        </n-icon>
                    </n-el>
                </template>
            </template>
            <n-el tag="div" class="set-item">
                <n-switch
                    @update:value="compData.handleDarkTheme"
                    v-model:value="darkTheme"
                    size="medium"
                >
                    <template #checked-icon>
                        <n-icon :size="14">
                            <MoonOutline />
                        </n-icon>
                    </template>
                    <template #unchecked-icon>
                        <n-icon :size="14">
                            <SunnyOutline />
                        </n-icon>
                    </template>
                </n-switch>
            </n-el>
        </template>
        <div class="set-item">
            <n-dropdown
                @select="compData.handleSelect"
                trigger="click"
                :options="userOptions"
                >管理员</n-dropdown
            >
        </div>
    </div>
    <UserSetting ref="UserSettingRef" />
</template>
<script lang="ts">
import { NAvatar, NText, FormInst } from "naive-ui";
import { h, defineComponent, ref, computed, reactive } from "vue";
import UserSetting from "@/packages/layout/components/UserSetting.vue";
import appStore from "@/packages/pinia/app.ts";
import { useFullscreen } from "@vueuse/core";
import { useRouter } from "vue-router";
import headImg from "@/packages/assets/yanghang.jpg";
import locaStore from "@/packages/utils/locaStore.ts";

function renderCustomHeader() {
    return h(
        "div",
        {
            style: "display: flex; align-items: center; padding: 8px 12px;",
        },
        [
            h(NAvatar, {
                round: true,
                style: "margin-right: 12px;",
                src: headImg,
            }),
            h("div", null, [
                h("div", null, [
                    h(NText, { depth: 2 }, { default: () => "羊先生" }),
                ]),
                h("div", { style: "font-size: 12px;" }, [
                    h(
                        NText,
                        {
                            depth: 3,
                            style: "margin-top: 5px;display:inline-block;",
                        },
                        { default: () => "毫无疑问，你是办公室里最亮的星" }
                    ),
                ]),
            ]),
        ]
    );
}

export default defineComponent({
    components: {
        UserSetting,
    },
    setup() {
        const UserSettingRef = ref(null);
        const app = appStore();
        const router = useRouter();
        const { themeName } = app.userSetting;
        const { isFullscreen, toggle } = useFullscreen(document.body);
        app.userSetting.isFullscreen = isFullscreen;
        const formRef = ref<FormInst | null>(null);
        const userIcon = ref([
            {
                size: 18,
                color: "0e7a0d",
                name: "SearchOutline",
                show: computed(() => !app.browser.xs),
            },
            {
                size: 18,
                color: "0e7a0d",
                name: "NotificationsOutline",
                show: true,
            },
            { size: 18, color: "0e7a0d", name: "HappyOutline", show: true },
            { size: 18, color: "0e7a0d", name: "LanguageOutline", show: true },
            {
                size: 18,
                color: "0e7a0d",
                name: "ScanOutline",
                show: computed(() => !app.browser.xs),
            },
            { size: 18, color: "0e7a0d", name: "SettingsOutline", show: true },
        ]);
        const compData = reactive({
            handleValidateClick(e: MouseEvent) {
                e.preventDefault();
            },
            SettingsOutline: () => {
                UserSettingRef.value.change();
            },
            LanguageOutline() {
                app.userSetting.language = app.userSetting.language
                    ? null
                    : "zhCN";
            },
            ScanOutline() {
                toggle();
            },
            handleDarkTheme(value) {
                app.userSetting.themeName = value ? "darkTheme" : null;
            },
            handleSelect(key: string | number) {
                if (key === "stmt4") {
                    app.$reset();
                    locaStore.remove("access_token");
                    locaStore.remove("app");
                    router.push("/login");
                }
            },
        });
        return {
            compData,
            app,
            formRef,
            UserSettingRef,
            darkTheme: themeName !== null,
            userOptions: [
                { key: "header", type: "render", render: renderCustomHeader },
                { key: "header-divider", type: "divider" },
                { label: "处理群消息 342 条", key: "stmt1" },
                { label: "加入群 17 个", key: "stmt3" },
                { label: "退出登录", key: "stmt4" },
            ],
            userIcon,
        };
    },
});
</script>
<style lang="less" scoped>
.user-set {
    display: flex;
    height: 50px;
    flex-shrink: 0;
    margin-left: 50px;

    .set-item {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 12px;
        padding-right: 12px;
        cursor: pointer;
        flex-shrink: 0;

        .n-icon {
            outline: none;

            svg {
                outline: none;
            }
        }

        &.hover-color {
            &:last-of-type {
                padding-right: 2px;
            }

            &:hover {
                color: var(--primary-color);
            }
        }
    }
}
</style>
