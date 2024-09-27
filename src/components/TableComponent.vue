<template>
  <div class="shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th v-for="col in columns" :key="col.field" class="px-6 py-3">
            {{ col.label }}
          </th>
          <th class="px-6 py-3">Amallar</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in tableData"
          :key="rowIndex"
          class="bg-white border-b hover:bg-gray-50"
        >
          <td
            v-for="col in columns"
            :key="col.field"
            class="px-6 py-4"
            @dblclick="startEditing(rowIndex, col.field)"
          >
            <template v-if="isEditing(rowIndex, col.field)">
              <input
                v-model="row[col.field]"
                @blur="finishEditing()"
                @keyup.enter="finishEditing()"
                :placeholder="col.field === 'tags' ? 'Enter tags separated by commas' : ''"
                class="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-1.5 px-2 w-full"
              />
            </template>
            <template v-else>
              <span v-if="col.field === 'tags'">
                <span
                  v-for="tag in row.tags"
                  :key="tag"
                  class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  {{ tag }}
                </span>
              </span>
              <span v-else>{{ row[col.field] }}</span>
            </template>
          </td>
          <td class="px-6 py-4 relative">
            <button @click="toggleDropdown(rowIndex)" class="text-gray-500 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                />
              </svg>
            </button>
            <div
              v-if="isDropdownOpen(rowIndex)"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
              @click.self="closeDropdown"
            >
              <div class="py-1">
                <button
                  @click="handleAction('edit', row, rowIndex)"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Tahrirlash
                </button>
                <button
                  @click="handleAction('delete', row)"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  O'chirish
                </button>
                <button
                  @click="handleAction('view', row)"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Ko'rish
                </button>
                <button
                  @click="handleAction('invite', row)"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Taklif qilish
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  data: { type: Array, required: true },
  columns: { type: Array, required: true }
})

const emit = defineEmits(['update:data', 'view-person', 'invite-person', 'delete-person'])

const tableData = ref(JSON.parse(JSON.stringify(props.data)))
const editingCell = ref({ rowIndex: null, field: null })
const dropdownRowIndex = ref(null)

watch(
  () => props.data,
  (newData) => {
    tableData.value = JSON.parse(JSON.stringify(newData))
  },
  { deep: true }
)

const startEditing = (rowIndex, field) => {
  editingCell.value = { rowIndex, field }
  if (field === 'tags' && Array.isArray(tableData.value[rowIndex][field])) {
    tableData.value[rowIndex][field] = tableData.value[rowIndex][field].join(', ')
  }
}

const isEditing = (rowIndex, field) =>
  editingCell.value.rowIndex === rowIndex && editingCell.value.field === field

const finishEditing = () => {
  const { rowIndex, field } = editingCell.value
  if (field === 'tags' && typeof tableData.value[rowIndex][field] === 'string') {
    tableData.value[rowIndex][field] = tableData.value[rowIndex][field]
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag)
  }
  editingCell.value = { rowIndex: null, field: null }
  emit('update:data', tableData.value)
}

const toggleDropdown = (rowIndex) =>
  (dropdownRowIndex.value = dropdownRowIndex.value === rowIndex ? null : rowIndex)

const closeDropdown = () => (dropdownRowIndex.value = null)

const isDropdownOpen = (rowIndex) => dropdownRowIndex.value === rowIndex

const handleAction = (action, row, rowIndex) => {
  switch (action) {
    case 'edit':
      editRow(rowIndex)
      break
    case 'delete':
      emit('delete-person', row)
      tableData.value = tableData.value.filter((r) => r !== row)
      break
    case 'view':
      emit('view-person', row)
      break
    case 'invite':
      emit('invite-person', row)
      break
  }
  closeDropdown()
}

const editRow = (rowIndex) => {
  const row = tableData.value[rowIndex]
  for (const field in row) {
    startEditing(rowIndex, field)
  }
}
</script>
