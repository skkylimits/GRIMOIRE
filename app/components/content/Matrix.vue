<template>
  <div
    class="table-responsive my-5 p-4 box-shadow bg-[var(--tw-prose-pre-bg)] dark:bg-[var(--tw-prose-pre-bg)] border rounded-md border-[var(--tw-prose-pre-border)] dark:border-[var(--tw-prose-invert-pre-border)]">
    <table class="table table-striped text-left w-full">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header"
            class="px-4 py-2 border-b border-[var(--tw-prose-pre-border)] dark:border-[var(--tw-prose-invert-pre-border)]">
            {{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex" class="hover:bg-gray-100 dark:hover:bg-gray-700">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex"
            class="px-4 py-2 border-b border-[var(--tw-prose-pre-border)] dark:border-[var(--tw-prose-invert-pre-border)]">
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TableComponent',
  props: {
    headers: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid var(--tw-prose-pre-border);
}

.table-striped tbody tr:nth-child(odd) {
  background-color: var(--tw-prose-pre-bg);
}
</style>