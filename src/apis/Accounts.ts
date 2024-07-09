import provider from '@/utils/ethProvider'
// 获取账户信息
export const getAccounts = async (
  params: { pageNo: number; pageSize: number } = { pageNo: 1, pageSize: 10 }
) => {
  // console.log(params, 'lkjh')
  const accounts = await provider.listAccounts()
  const accountsData = []
  const { pageNo, pageSize } = params
  const total = accounts.length
  const addressArr = accounts.splice((pageNo - 1) * pageSize, pageSize)
  for (const address of addressArr) {
    const [balanceObj, txCount] = await Promise.all([
      provider.getBalance(address),
      provider.getTransactionCount(address)
    ])
    let balance = parseInt(balanceObj._hex, 16)
    if (balanceObj._isBigNumber) {
      balance = parseInt(balanceObj._hex, 16) / 1e18
    }
    accountsData.push({ address, balance, txCount })
  }
  return { data: accountsData, total }
}
