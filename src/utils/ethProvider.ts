import { ethers } from 'ethers'
import config from '../../app.config'
let provider = new ethers.providers.JsonRpcProvider(config.RpcUrl)
const setProvider = (rpcUrl: string) => {
  provider = new ethers.providers.JsonRpcProvider(rpcUrl)
  return provider
}
export { provider, setProvider }

export default provider
