

<template>
  <BaseQuery :columns="columns" :apiFn="$apis.Accounts.getAccounts"></BaseQuery>
</template>

<script setup lang="ts">
import { inject } from 'vue';
const $apis = inject('$apis') as Record<string, any>
const columns = [
  { label: 'Index', prop: 'index', type: 'index', width: 80 },
  { label: 'Address', prop: 'address' },
  { label: 'Balance', prop: 'balance', formatter: (row: Record<string, any>) => `${row.balance} ETH` },
  { label: 'TxCount', prop: 'txCount' },
  { label: 'PrivateKey', prop: 'privateKey' },
]
</script>
