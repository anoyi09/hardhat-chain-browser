export const createArrayWithPagination = (
  start: number,
  pageNo: number,
  pageSize: number
): number[] => {
  // 计算当前页的第一个元素的索引
  const startIndex = start - (pageNo - 1) * pageSize

  // 使用 Array.fill 来创建一个初始填充为 null 的数组
  const result: number[] = Array(pageSize).fill(null)

  // 使用 forEach 来填充数组元素
  result.forEach((_value, index) => {
    result[index] = startIndex - index
  })

  return result.filter((im) => im >= 0)
}

export const base16To10 = (num: string) => {
  return parseInt(num, 16) / 1e18
}

export function dateFormat(dateData: Date | number | string, fmt = 'yyyy-MM-dd hh:mm:ss') {
  const date = dateData instanceof Date ? dateData : new Date(dateData)
  const o: Record<string, any> = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (const k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}
