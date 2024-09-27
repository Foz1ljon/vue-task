<template>
  <div class="container mx-auto p-4">
    <h1 class="text-xl font-semibold mb-4">User Table</h1>
    <Table :data="tableData" :columns="columns" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Table from '@/components/TableComponent.vue'

// Sample data for the table
const tableData = ref([
  {
    fullname: 'John Doe',
    age: 28,
    address: '123 Main St',
    tags: ['Admin', 'User'],
    invitedPerson: 'Alice'
  },
  {
    fullname: 'Jane Smith',
    age: 34,
    address: '456 Maple Ave',
    tags: ['User'],
    invitedPerson: 'Bob'
  },
  {
    fullname: 'Alice Johnson',
    age: 23,
    address: '789 Oak St',
    tags: ['User', 'Moderator'],
    invitedPerson: 'Charlie'
  },
  {
    fullname: 'David Brown',
    age: 30,
    address: '101 Pine Rd',
    tags: ['User'],
    invitedPerson: 'Diana'
  }
])

// Define columns for the table
const columns = ref([
  { label: 'Name', field: 'fullname' },
  { label: 'Age', field: 'age' },
  { label: 'Address', field: 'address' },
  { label: 'Tags', field: 'tags' },
  { label: 'Invite Person', field: 'invitedPerson' }
])
</script>
