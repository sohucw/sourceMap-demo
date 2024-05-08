import axios from 'axios'
import sourceMap from 'source-map-js'
const getSourceMap = async (url: string) => {
  return await axios.get(url)
}
// // stackFrame.fileName 就是报错的Js代码，需要根据这个Js 获取到对应的source-map
const findCodeBySourceMap = async (stackFrame: any) => {
  const sourceData: any = await getSourceMap(stackFrame.fileName + '.map')
  const fileContent = sourceData.data
  const consumer = await new sourceMap.SourceMapConsumer(fileContent)
  // 通过报错位置查找到对应的源文件名称以及报错行数
  const originalPosition = consumer.originalPositionFor({
    line: stackFrame.lineNumber,
    column: stackFrame.columnNumber
  })
  // 那么就可以通过 sourceContentFor 这个方法找到报错的源代码
  const code = consumer.sourceContentFor(originalPosition.source)
  console.log(code, '还原之后的 code')
}
export { findCodeBySourceMap }
