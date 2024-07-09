<template>
    <div class="table-con">
        <el-table ref="TableRef" :max-height="autoMaxHeight" :data="data" v-bind="$attrs">
            <template v-for="(column, index) in columns" :key="column.prop || index">
                <el-table-column v-bind="filterKeys(column, ['visible', 'component', 'componentAttrs'])">
                    <template v-if="column.component && !column.children" #default="{ row }">
                        <component :is="column.component" size="small" v-model="row[column.prop]"
                            v-bind="computedAttrs(column.componentAttrs, column, row)">
                        </component>
                    </template>
                </el-table-column>
            </template>
            <slot name="rowButton"></slot>
        </el-table>
        <el-pagination v-if="showPagination" @size-change="sizeChange" @current-change="currentChange"
            :current-page="pagination.pageNo" :page-sizes="[10, 20, 30, 40, 50]"
            layout="total, sizes, prev, pager, next, jumper" :total="pagination.total" class="my-pagination">
        </el-pagination>
    </div>
</template>
<script setup lang="ts">
import { filterKeys, computeAttrs } from "@/utils/template"
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
type Item = Record<string, any>;
interface Props {
    data?: Item[]
    columns: Item[]
    maxHeight?: number
    showPagination?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    data: () => [],
    columns: () => [],
    showPagination: true
})
const emit = defineEmits(['pageChange'])
const pagination = reactive({
    pageNo: 1,
    pageSize: 10,
    total: 0
})
const sizeChange = (size: number) => {
    pagination.pageSize = size;
    emit('pageChange', pagination);
}
const currentChange = (current: number) => {
    pagination.pageNo = current;
    emit('pageChange', pagination);
}
const computedAttrs = (source: any, column: Item, row: Item) => {
    const args = ['column', 'row', 'formData'];
    const argsData = [column, row];
    return computeAttrs(source, args, argsData);
}

const setPagination = (pageObj: Object) => {
    Object.assign(pagination, pageObj)
}
const TableRef = ref()
const rTop = ref(0)
const autoMaxHeight = ref(props.maxHeight || 'auto')
const setMaxHeight = () => {
    const screenHeight = window.innerHeight; // document.body.clientHeight;
    const TRef = TableRef.value;
    // console.log(TRef, 'lkj')
    if (!TRef) return;
    const tableTop = TRef.$el.getBoundingClientRect().top;
    if (tableTop !== rTop.value) {
        rTop.value = tableTop;
        const pgHeight = props.showPagination ? 64 : 0;
        // 屏幕高度，减去 底部留白高度，减去分页高度
        autoMaxHeight.value = screenHeight - rTop.value - pgHeight + 'px';
        // console.log(screenHeight, 'table-max-height: ', autoMaxHeight.value, 'rTop.value:', rTop.value);
        TRef.doLayout();
    }
}
onMounted(() => {
    setMaxHeight()
    window.addEventListener('resize', setMaxHeight)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', setMaxHeight)
})

defineExpose({
    setPagination
})
</script>
<style lang="scss" scoped>
.table-con {
    border-top: 1px solid #dedfe0;
    margin-top: 8px;
}

.my-pagination {
    margin-top: 16px;
}
</style>