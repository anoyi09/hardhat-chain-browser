<template>
    <BaseQuery :columns="columns" :apiFn="$apis.Blocks.getBlocks"></BaseQuery>
</template>
  
<script setup lang="ts">
import { inject } from 'vue';
const $apis = inject('$apis') as Record<string, any>
import { dateFormat } from "@/utils/index"
const columns = [
    { label: 'Number', prop: 'number', width: 80 },
    { label: 'Hash', prop: 'hash' },
    { label: 'ParentHash', prop: 'parentHash' },
    { label: 'MinedOn', prop: 'timestamp', formatter: (row: Record<string, any>) => `${dateFormat(row.timestamp * 1000)}` },
    { label: 'gasLimit', prop: 'gasLimit._hex', formatter: (row: any) => `${parseInt(row.gasLimit._hex, 16)} wei` },
    { label: 'gasUsed', prop: 'gasUsed._hex', formatter: (row: any) => `${parseInt(row.gasUsed._hex, 16)} wei` },
    { label: 'TxCount', prop: 'transactions', formatter: (row: any) => `${row.transactions.length}` },
]
</script>
  