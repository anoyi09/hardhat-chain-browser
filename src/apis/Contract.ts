import provider from '@/utils/ethProvider'
import { ethers } from 'ethers'
import contractInfos from '@/assets/abi'
type Item = Record<string, any>
export const getContractsDeployedByAddress = async () => {
  try {
    // 获取最新区块号
    const latestBlockNumber = await provider.getBlockNumber()
    const contractDeployments = []
    // 遍历所有区块
    for (let i = 0; i <= latestBlockNumber; i++) {
      const block = await provider.getBlockWithTransactions(i)
      // 遍历区块中的所有交易
      for (const tx of block.transactions as Record<string, any>[]) {
        // 检查交易是否由指定地址发起且是合约创建交易
        if (tx.to === null && tx.creates !== null) {
          // 3. 创建合约实例
          const contractABI = [
            {
              constant: true,
              inputs: [],
              name: 'name',
              outputs: [
                {
                  name: '',
                  type: 'string'
                }
              ],
              payable: false,
              stateMutability: 'view',
              type: 'function'
            }
          ]
          let cName = ''
          try {
            const contract = new ethers.Contract(tx.creates, contractABI, provider)
            cName = await contract.name()
          } catch (err) {
            console.warn("get name undefined or ''")
          }
          contractDeployments.push({
            name: cName,
            contractAddress: tx.creates,
            transactionHash: tx.hash,
            blockNumber: tx.blockNumber,
            timestamp: block.timestamp
          })
        }
      }
    }
    console.log('Deployed contracts:', contractDeployments)
    return {
      data: contractDeployments.sort((a, b) => b.timestamp - a.timestamp),
      total: contractDeployments.length
    }
  } catch (error) {
    console.error('Error fetching contract info:', error)
    return { data: [], total: 0 }
  }
}

export const getContractsDeployedEvents = async () => {
  const res = await getContractsDeployedByAddress()
  const contractsData = res.data.filter((im, i) => i < 2000)
  const contractEvents: Item[] = []
  contractsData.forEach((conInfo) => {
    const contractInfo = contractInfos.find((it) => it.contractName === conInfo.name)
    if (!contractInfo) return
    const events = contractInfo.abi.filter((im) => im.type === 'event')
    if (events.length > 0) {
      const cEv = events.map((im) => ({ eventABI: im, contractInfo: conInfo }))
      contractEvents.push(...cEv)
    }
  })
  console.log(contractEvents, 'plo')
  return contractEvents
}
