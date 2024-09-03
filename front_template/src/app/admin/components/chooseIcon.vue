<template>
  <n-modal
    v-model:show="visible"
    :mask-closable="false"
    preset="dialog"
    title="选择icon"
    style="width: 620px"
    @close="visible = false"
  >
    <div class="icons">
      <n-grid
        y-gap="20"
        x-gap="0"
        cols="24"
        item-responsive
        responsive="screen"
      >
        <n-grid-item
          v-for="(item, idx) in icons"
          :key="idx"
          span="12 m:2 l:2 xl:2"
        >
          <div class="icons-item">
            <div class="icons-item_content">
              <n-icon class="icon" :size="18">
                <component :is="item" @click="select(item)"></component>
              </n-icon>
            </div>
          </div>
        </n-grid-item>
      </n-grid>
    </div>
  </n-modal>
</template>

<script lang="ts" setup>
import { ref, defineExpose } from "vue"
import { icons } from "@/packages/config/icon.ts"
const emit = defineEmits(["choose"])
const select = (item: any) => {
  emit("choose", item)
  visible.value = false
}
const visible = ref(false)
defineExpose({
  visible,
})
</script>

<style lang="less" scoped>
.icons {
  &-item {
    width: 100%;
    text-align: center;
    padding: 0 10px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    &_content {
      padding: 10px;
      border: 1px solid var(--code-color);
      box-sizing: border-box;
    }
    .icon {
      transition: top 0.3s;
      position: relative;
      top: 0;
    }
    &:hover {
      .icon {
        transform: scale(2);
      }
    }
  }
}
</style>