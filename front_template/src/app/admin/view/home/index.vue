<template>
    <n-grid cols="24" y-gap="12" x-gap="12" item-responsive responsive="screen">
        <n-grid-item span="24 m:24 l:14">
            <n-card
                style="height: 100%"
                :segmented="{ content: true, footer: true }"
                header-style="padding:10px;font-size:14px"
                footer-style="padding:10px"
                content-style="padding:10px;height:100%"
            >
                <template #header> 欢迎您 </template>
                <div class="home-head">
                    <n-image
                        width="80"
                        style="border-radius: 50%"
                        :src="headImg"
                    ></n-image>
                    <div style="margin-left: 20px">
                        <h1 class="title">
                            嗨，{{ tleData.pam }} 今天是{{ tleData.date }}
                            {{ tleData.week }} {{ tleData.time }}，准备吃什么呢?
                        </h1>
                        <p class="des">
                            vue-wsm-admin，🍁采用Vite4、Vue3、Pinia 、Naive UI
                            构建，构建企业npm依赖包中后台管理系统基础框架，做到框架(packages)和应用(app)分开，即可以减少项目之间的耦合，也能提升项目扩展性...
                        </p>
                    </div>
                </div>
            </n-card>
        </n-grid-item>
        <n-grid-item span="24 m:24 l:24">
            <n-card
                :segmented="{ content: true, footer: true }"
                header-style="padding:10px;font-size:14px"
                footer-style="padding:10px"
                content-style="padding:10px;"
            >
                <template #header> 依赖 </template>
                <n-table size="small" bordered :single-line="false">
                    <tbody>
                        <tr v-for="item in packageJson" :key="item">
                            <td v-for="(i, v) in item" :key="v">
                                {{ i[0] }}
                                {{ i[1] }}
                            </td>
                        </tr>
                    </tbody>
                </n-table>
            </n-card>
        </n-grid-item>
    </n-grid>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from "vue";
import dayjs from "dayjs";
import { useRouter } from "vue-router";
import headImg from "@/packages/assets/yanghang.jpg";
import _ from "lodash";
import packageJson from "@/../package.json";
export default defineComponent({
    setup() {
        const router = useRouter();
        const getPamFormat = (hour) => {
            if (hour < 6) {
                return "凌晨好！";
            } else if (hour < 9) {
                return "早上好！";
            } else if (hour < 12) {
                return "上午好！";
            } else if (hour < 14) {
                return "中午好！";
            } else if (hour < 17) {
                return "下午好！";
            } else if (hour < 19) {
                return "傍晚好！";
            } else if (hour < 22) {
                return "晚上好！";
            } else {
                return "夜里好！";
            }
        };
        const tleData = reactive({
            date: dayjs().format("YYYY年MM月DD日"),
            time: dayjs().format("HH时mm分ss秒"),
            week:
                "星期" + "日一二三四五六".charAt(parseInt(dayjs().format("d"))),
            pam: getPamFormat(dayjs().format("HH")),
        });

        let tleDataTime = function () {
            setTimeout(() => {
                tleData.time = dayjs().format("HH时mm分ss秒");
                tleDataTime();
            }, 1000);
        };
        tleDataTime();
        return {
            tleData,
            headImg,
            // 分两组
            packageJson: _.chunk(Object.entries(packageJson.dependencies), 2),
        };
    },
});
</script>
<style lang="less" scoped>
.home-head {
    display: flex;
    align-items: center;
    height: 100%;

    .title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 5px;
    }

    .des {
    }
}

.icon {
    text-align: center;
    background-color: var(--n-border-color);
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: center;
    width: 80px;
    height: 60px;
    border-radius: 10px;
    cursor: pointer;
}

.carousel-img {
    width: 100%;
    height: 240px;
    object-fit: cover;
}

.custom-arrow {
    display: flex;
    position: absolute;
    bottom: 25px;
    right: 10px;
}

.custom-arrow button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    margin-right: 12px;
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
    border-width: 0;
    border-radius: 8px;
    transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.custom-arrow button:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.custom-arrow button:active {
    transform: scale(0.95);
    transform-origin: center;
}

.custom-dots {
    display: flex;
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 20px;
    left: 20px;
}

.custom-dots li {
    display: inline-block;
    width: 12px;
    height: 4px;
    margin: 0 3px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.4);
    transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.custom-dots li.is-active {
    width: 40px;
    background: #fff;
}
</style>
