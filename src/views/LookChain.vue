<template>
    <div>hello world</div>
</template>
<script setup lang="ts">
import { onMounted } from "vue"
import { provider } from "@/utils/ethProvider"

onMounted(async () => {
    const accounts = await provider.listAccounts()
    const num = await provider.getBlockNumber()
    console.log(num, accounts, 'lll')
    const blocks = await provider.getBlock(5);
    console.log(blocks, 'p')
    accounts.forEach(async (address: string) => {
        const balance = await provider.getBalance(address);
        console.log(balance, 'oop')
    })
})
</script>