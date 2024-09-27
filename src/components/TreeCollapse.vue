<template>
  <ul>
    <li v-for="(node, index) in nodes" :key="index" class="mb-1">
      <div
        @click="toggleCollapse(node)"
        class="cursor-pointer flex items-center gap-2 p-2 bg-white rounded-sm shadow hover:bg-gray-50 transition"
        :class="{ 'border-l-4 border-blue-500': !node.children || !node.children.length }"
      >
        <span v-if="node.children && node.children.length">
          <ArrowComponent :collapse="node.collapsed" />
        </span>
        <span class="text-gray-700 font-medium">{{ node.name }}</span>
      </div>
      <tree-collapse v-if="node.children && !node.collapsed" :nodes="node.children" class="pl-2" />
    </li>
  </ul>
</template>

<script setup>
import ArrowComponent from './icons/ArrowComponent.vue'

import { watchEffect } from 'vue'

// Props orqali tree node'larining massivini olish
const props = defineProps({
  nodes: {
    type: Array,
    required: true
  }
})

// Collapse/Expand funksiyasi
const toggleCollapse = (node) => {
  node.collapsed = !node.collapsed
}

// watchEffect orqali nodes massivini boshqarish
watchEffect(() => {
  // Har bir node'ga collapsed flag qo'shiladi
  const initializeNodes = (nodes) => {
    nodes.forEach((node) => {
      if (node.children) {
        node.collapsed = true // Default collapse
        initializeNodes(node.children) // Bola node'lar uchun rekursiv qo'llash
      }
    })
  }

  initializeNodes(props.nodes) // Dastlab node'larni initsializatsiya qilish
})
</script>

<style scoped></style>
