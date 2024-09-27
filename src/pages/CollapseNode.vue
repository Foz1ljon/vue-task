<template>
  <div class="p-6">
    <tree-collapse :nodes="treeData" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TreeCollapse from '@/components/TreeCollapse.vue'

const treeData = ref([
  {
    name: 'Root',
    children: [
      {
        name: 'Child 1',
        children: [
          {
            name: 'Grandchild 1.1',
            children: [
              {
                name: 'Great Grandchild 1.1.1',
                children: [
                  { name: 'Great Great Grandchild 1.1.1.1' },
                  { name: 'Great Great Grandchild 1.1.1.2' }
                ]
              },
              { name: 'Great Grandchild 1.1.2' }
            ]
          },
          { name: 'Grandchild 1.2' }
        ]
      },
      {
        name: 'Child 2',
        children: [
          {
            name: 'Grandchild 2.1',
            children: [{ name: 'Great Grandchild 2.1.1' }, { name: 'Great Grandchild 2.1.2' }]
          },
          { name: 'Grandchild 2.2' }
        ]
      },
      {
        name: 'Child 3',
        children: [
          {
            name: 'Grandchild 3.1',
            children: [
              {
                name: 'Great Grandchild 3.1.1',
                children: [
                  {
                    name: 'Great Great Grandchild 3.1.1.1',
                    children: [{ name: 'Great Great Great Grandchild 3.1.1.1.1' }]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
])
</script>

<style>
body {
  @apply bg-gray-100;
}
</style>
