const reg = /\{\{(.+?)\}\}/g
const reg1 = /^\{\{(.+?)\}\}$/g
// 创建函数
export const getTemplateFn = ($1: string, arg: string[], argData: any[]) => {
  try {
    const fn = new Function(...arg, `return ${$1}`)
    return fn(...argData)
  } catch (e: any) {
    console.error(`${e.name}: {{${$1}}} ->> ${e.message}`)
    return ''
  }
}

export const computeAttrs = (source: any, args: string[], argsData: any[]) => {
  if (!source) return source
  if (typeof source !== 'object') return source
  const newSource = Array.isArray(source) ? [...source] : { ...source }
  for (const key in newSource) {
    const strOrObj = newSource[key]
    if (typeof strOrObj === 'string') {
      const matchs = new RegExp(reg1).exec(strOrObj)
      if (matchs?.length) {
        newSource[key] = getTemplateFn(matchs[1], args, argsData)
      } else {
        newSource[key] = strOrObj.replace(reg, (val, $1) => {
          return getTemplateFn($1, args, argsData)
        })
      }
    }
  }
  return newSource
}

// 过滤对象对应的 key
export function filterKeys(obj: Record<string, any>, keys: string[] = []) {
  const newObj = { ...obj }
  Object.keys(newObj).forEach((key) => {
    if (keys.includes(key)) {
      Reflect.deleteProperty(newObj, key)
    }
  })
  return newObj
}
