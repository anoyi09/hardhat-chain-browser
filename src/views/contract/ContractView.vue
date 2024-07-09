

<template>
    <BaseQuery :columns="columns" :apiFn="$apis.Contract.getContractsDeployedByAddress"></BaseQuery>
</template>
  
<script setup lang="ts">
import { inject } from 'vue';
const $apis = inject('$apis') as Record<string, any>
import { dateFormat } from "@/utils/index"
const columns = [
    { label: 'Index', prop: 'index', type: 'index', width: 80 },
    { label: 'name', prop: 'name' },
    { label: 'blockNumber', prop: 'blockNumber' },
    { label: 'contractAddress', prop: 'contractAddress' },
    { label: 'timestamp', prop: 'timestamp', formatter: (row: Record<string, any>) => `${dateFormat(row.timestamp * 1000)}` },
    { label: 'transactionHash', prop: 'transactionHash' },
]
</script>
  