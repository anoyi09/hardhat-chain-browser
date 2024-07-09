import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ethers } from 'ethers'

export const useProvider = defineStore('provider', () => {
  const rpcUrl = 'http://127.0.0.1:8545/'
  let provider = new ethers.providers.JsonRpcProvider(rpcUrl)
  const setProvider = (rpcUrl: string) => {
    provider = new ethers.providers.JsonRpcProvider(rpcUrl)
  }
  return { provider, setProvider }
})
