import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import fs from 'fs'
import path from 'path'
import config from './app.config'
const hardHatPath = config.hardHatProjectPath
const contractPath = path.resolve(hardHatPath, 'artifacts/contracts/')
const jsonArray: Record<string, any>[] = []
// 读文件夹
const readFilesBag = (contractPath: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    fs.readdir(contractPath, (err, files) => {
      if (err) {
        reject(err)
        return console.error(`无法读取文件夹: ${err.message}`)
      }
      resolve(files)
    })
  })
}
// 读文件
const readFile = (bagPath: string, file: string): Promise<string> => {
  const filePath = path.join(bagPath, file)
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
        return console.error(`无法读取文件 ${file}: ${err.message}`)
      }
      resolve(data)
    })
  })
}

// 读文件夹下的文件
const readFileBagAdnFile = async (contractPath: string) => {
  const fileBags = await readFilesBag(contractPath)
  for (const filebag of fileBags) {
    const fileBagPath = path.join(contractPath, filebag)
    const fileBags1 = await readFilesBag(fileBagPath)
    for (const file of fileBags1) {
      const fileData = await readFile(fileBagPath, file)
      const isABIFile = new RegExp(/^[a-z,A-Z]+\.json$/).test(file)
      // console.log(new RegExp(/^[a-z,A-Z]+\.json$/).test(file), file, 'jjjjjjjjjj')
      if (isABIFile) {
        try {
          // 解析 JSON 内容并存入数组
          const jsonContent = JSON.parse(fileData)
          jsonArray.push(jsonContent)
        } catch (parseError: any) {
          console.error(`无法解析文件 ${file} 的内容: ${parseError.message}`)
        }
      }
    }
  }
  widteFiles()
}
// 写文件
const widteFiles = () => {
  const outputFilePath = path.resolve(__dirname, './src/assets/abi.ts')
  const jsonData = `export default ${JSON.stringify(jsonArray, null, 2)}`
  // console.log(__dirname, outputFilePath, 'ppppp')
  fs.writeFile(outputFilePath, jsonData, 'utf8', (err) => {
    if (err) {
      console.error(`无法写入文件 ${outputFilePath}: ${err.message}`)
    } else {
      console.log(`文件写入成功: ${outputFilePath}`)
    }
  })
}
readFileBagAdnFile(contractPath)
widteFiles()

// const contractJson = JSON.parse(fs.readFileSync(contractPath, 'utf8'))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
