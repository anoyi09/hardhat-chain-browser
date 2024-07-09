

<template>
    <div>
        <slot name="topButton">
            <div><el-button @click="handleRefresh">刷新</el-button></div>
        </slot>
        <BaseTable ref="BTable" v-loading="tLoding" :data="data" :columns="columns" v-bind="$attrs"
            @pageChange="pageChange">
            <slot name="rowButton"></slot>
        </BaseTable>

    </div>
</template>
  
<script setup lang="ts">
import { watch, ref, onBeforeMount } from 'vue';
type Item = Record<string, any>;
interface Props {
    apiFn?: Function
    dataTransFn?: Function
    columns: Item[]
    tableData?: Item[]
}
const props = withDefaults(defineProps<Props>(), {
    data: () => [],
    columns: () => [],
    showPagination: true
})

watch(() => props.tableData, () => {
    data.value = props.tableData || []
})
const data = ref<Item[]>(props.tableData || [])
const BTable = ref()
const tLoding = ref(false)

const initData = (params?: { pageNo: number, pageSize: number }) => {
    if (!props.apiFn) return
    tLoding.value = true
    props.apiFn(params).then((res: any) => {
        data.value = props.dataTransFn?.(res?.data) || res?.data || []
        BTable.value.setPagination({ total: res?.total || 0 })
    }).finally(() => {
        setTimeout(() => {
            tLoding.value = false
        }, 300);
    })
}

const pageChange = (params: any) => {
    initData(params)
}

const handleRefresh = () => {
    initData()
}

onBeforeMount(() => {
    initData()
})

defineExpose({
    initData
})
</script>
  