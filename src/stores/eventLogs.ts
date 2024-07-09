import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ethers } from 'ethers'
import { provider } from '@/utils/ethProvider'
import { getContractsDeployedEvents } from '@/apis/Contract'
type Item = Record<string, any>
export const useEventsLogsStore = defineStore('eventsLogs', () => {
  let logs = []
  try {
    logs = JSON.parse(sessionStorage.getItem('EventsLogs') || '[]')
  } catch (err) {
    logs = []
    console.log(err)
  }
  const eventsLogs = ref<Item[]>(logs)
  const hadOnEvents = ref<Item[]>([])
  let timer = 0
  const pushEventsLogs = (obj: Item) => {
    eventsLogs.value.push(obj)
    clearTimeout(timer)
    timer = window.setTimeout(() => {
      sessionStorage.setItem('EventsLogs', JSON.stringify(eventsLogs.value))
    }, 500)
  }

  const setEventsLogs = (obj: Item[]) => {
    eventsLogs.value = obj
  }

  const initEventsLogs = async (refresh: boolean = false) => {
    if (!refresh) return
    try {
      const events = await getContractsDeployedEvents()
      events.forEach((res: Item) => {
        const { eventABI, contractInfo } = res
        pushEventsLogs({
          name: contractInfo.name,
          timestamp: new Date(),
          contractAddress: contractInfo.contractAddress,
          eventName: eventABI.name,
          msg: `监听了合约 ${contractInfo.name} 的 事件： ${eventABI.name}`
        })
        // 如果已经监听了事件，就不监听了
        const isHadOn = hadOnEvents.value.some((im) => {
          return im.address === contractInfo.contractAddress && im.eventName === eventABI.name
        })
        if (isHadOn) {
          return
        }
        const contract = new ethers.Contract(contractInfo.contractAddress, [eventABI], provider)
        contract.removeAllListeners(eventABI.name)
        hadOnEvents.value.push({ address: contractInfo.contractAddress, eventName: eventABI.name })
        contract.on(eventABI.name, (arg1, arg2, ev) => {
          console.log('Ev:', ev)
          pushEventsLogs({
            timestamp: new Date(),
            name: contractInfo.name,
            contractAddress: contractInfo.contractAddress,
            eventName: eventABI.name,
            msg: `触发了合约 ${contractInfo.name} 的 事件： ${eventABI.name}，arg1: ${arg1},arg2: ${arg2}`
          })
        })
      })
    } catch (error) {
      console.error(error)
    }
  }
  if (logs.length === 0) initEventsLogs(true)

  return { eventsLogs, initEventsLogs, setEventsLogs }
})
