

<template>
    <div>
        <BaseQuery v-loading="bLoading" :tableData="eventsLogs" :showPagination="false" :columns="columns">
            <template v-slot:topButton>
                <div style="margin-top:26px">
                    <el-button @click="handleRefresh">刷新</el-button>
                </div>
            </template>
        </BaseQuery>
    </div>
</template>
  
<script setup lang="ts">
// import { ethers } from "ethers"
// import provider from "@/utils/ethProvider"
import { ref, inject, onBeforeMount } from 'vue'
type Item = Record<string, any>
const $apis = inject('$apis') as Record<string, any>
const columns = [
    { label: 'Index', prop: 'index', type: 'index', width: 80 },
    { label: 'name', prop: 'name', width: 90 },
    { label: 'blockNumber', prop: 'blockNumber', width: 120 },
    { label: 'eventName', prop: 'eventName', width: 180 },
    { label: 'contractAddress', prop: 'contractAddress', width: 380 },
    { label: 'msg', prop: 'msg' }
]

const eventsLogs = ref<Item[]>([])
// const hadOnEvents = ref<Item[]>([])
const bLoading = ref(false)
const initData = async () => {
    try {
        const events = await $apis.Contract.getContractsDeployedEvents()
        events.forEach((res: Item) => {
            const { eventABI, contractInfo } = res
            eventsLogs.value.push({
                name: contractInfo.name,
                blockNumber: contractInfo.blockNumber,
                timestamp: new Date(),
                contractAddress: contractInfo.contractAddress,
                eventName: eventABI.name,
                msg: `监听了合约 ${contractInfo.name} 的 事件： ${eventABI.name}`
            })
            // 如果已经监听了事件，就不监听了
            /* if (hadOnEvents.value.some(im => im.address === contractInfo.contractAddress && im.eventName === eventABI.name)) {
                return
            }
            const contract = new ethers.Contract(contractInfo.contractAddress, [eventABI], provider)
            contract.removeAllListeners(eventABI.name);
            hadOnEvents.value.push({ address: contractInfo.contractAddress, eventName: eventABI.name })
            contract.on(eventABI.name, (arg1, arg2, ev) => {
                console.log('Ev:', ev)
                eventsLogs.value.push({
                    timestamp: new Date(),
                    name: contractInfo.name,
                    contractAddress: contractInfo.contractAddress,
                    msg: `触发了合约 ${contractInfo.name} 的 事件： ${eventABI.name}，arg1: ${arg1},arg2: ${arg2}`
                })
            }); */
        })
        bLoading.value = false
    } catch (error) {
        console.error(error)
        bLoading.value = false
    }
}

const handleRefresh = () => {
    eventsLogs.value = []
    bLoading.value = true
    setTimeout(() => {
        initData()
    }, 300)

}

onBeforeMount(() => {
    initData()
})

</script>
  