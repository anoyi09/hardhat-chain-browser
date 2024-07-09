import provider from '@/utils/ethProvider'
import { createArrayWithPagination } from '@/utils/index'
// 获取账户信息
export const getBlocks = async (
  params: { pageNo: number; pageSize: number } = { pageNo: 1, pageSize: 10 }
) => {
  const blockNum = await provider.getBlockNumber()
  const bolcksData = []
  const blockArr = createArrayWithPagination(blockNum, params.pageNo, params.pageSize)
  for (const index of blockArr) {
    const block = await provider.getBlock(index)
    bolcksData.push(block)
  }

  const result = { data: bolcksData, total: blockNum + 1 }
  console.log(blockArr, result)
  return result
}

export const getBlockWithTransactions = async (params: { blockNumber?: number }) => {
  const blockNum = await provider.getBlockNumber()
  const block = await provider.getBlockWithTransactions(params?.blockNumber || blockNum)

  const result = { data: block, total: block.transactions.length }
  console.log(result)
  return result
}
