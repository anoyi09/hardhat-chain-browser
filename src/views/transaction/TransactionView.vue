<template>
    <BaseQuery ref="BQuery" :dataTransFn="dataTransFn" :columns="columns" :apiFn="$apis.Blocks.getBlockWithTransactions">
        <template v-slot:topButton>
            <div class="top-button">
                <span>当前块：{{ currentBlock.number }}，时间戳：{{ dateFormat(currentBlock.timestamp * 1000) }}</span>
                <div>
                    <el-button @click="handleRefresh">刷新</el-button>
                    <el-button type="primary" @click="up">上一个块</el-button>
                    <el-button type="primary" @click="next">下一个块</el-button>
                </div>
            </div>
        </template>
    </BaseQuery>
</template>
<script setup lang="ts">
import { ref, inject } from 'vue'
import { dateFormat } from "@/utils/index"
const $apis = inject('$apis') as Record<string, any>
const columns = [
    { label: 'index', prop: 'index', type: 'index', width: 80 },
    { label: 'chainId', prop: 'chainId' },
    { label: 'from', prop: 'from' },
    { label: 'to', prop: 'to' },
    { label: 'creates', prop: 'creates' },
    { label: 'value', prop: 'value' },
    { label: 'gasPrice', prop: 'gasPrice._hex', formatter: (row: any) => `${parseInt(row.gasPrice._hex, 16)} wei` },
    { label: 'maxFeePerGas', prop: 'maxFeePerGas._hex', formatter: (row: any) => `${parseInt(row.maxFeePerGas._hex, 16)} wei` },
    { label: 'gasLimit', prop: 'gasLimit._hex', formatter: (row: any) => `${parseInt(row.gasLimit._hex, 16)} wei` }
]
const currentBlock = ref<Record<string, any>>({})
const maxNumber = ref(0)
const BQuery = ref()
const handleRefresh = () => {
    BQuery.value?.initData()
}
const dataTransFn = (data: any) => {
    currentBlock.value = data
    maxNumber.value = data.number > maxNumber.value ? data.number : maxNumber.value
    return data.transactions
}
const up = () => {
    const number = currentBlock.value.number > 0 ? currentBlock.value.number - 1 : 0
    BQuery.value?.initData({ blockNumber: number })
}

const next = () => {
    const number = currentBlock.value.number < maxNumber.value ? currentBlock.value.number + 1 : maxNumber.value
    BQuery.value?.initData({ blockNumber: number })
}
</script>
<style lang="scss" scoped>
.top-button {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
</style>
  