<template>
  <div v-if="isError">
    <pre>
      {{ js_error.stack }}
    </pre>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item  
      v-for="(item, index) in js_error.stack_frames"
      :key="index"
      :name="index"
      :title="item.source"
      >
      <el-row :gutter="20">
        <el-col :span="20">
          <div>{{ item.fileName }}</div>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="small" @click="openDialog(item, index)">
          映射源码</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <template v-if="item.origin">
          <PreView :orgin="item.origin"></PreView>
        </template>
        <template v-else>
          <div>{{ item.fileName }}</div>
        </template>
      </el-row>
      </el-collapse-item>
    </el-collapse>
    <el-dialog
      v-model="dialogVisible"
      title="soureMap源码映射"
      width="500"
    >
    <el-tabs v-model="tabActiveName" class="demo-tabs">
    <el-tab-pane label="本地上传" name="local">
      <el-upload drag :before-upload="sourceMapUpload">
        <i class="el-icon-upload"></i>
        <div>将文件拖到此处，或者<em>点击上传</em></div>
      </el-upload>
    </el-tab-pane>
    <el-tab-pane label="远程加载" name="request">远程加载</el-tab-pane>
  </el-tabs>
  </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import sourceMap from 'source-map-js'
import { onMounted, ref} from 'vue';
import PreView from './PreView.vue';
const dialogVisible = ref(false);
const tabActiveName = ref('local');
const activeName = ref<string[]>(['1']);
let js_error = ref<any>(null);
let isError = ref(false);
let stackFrameObj = {
  line: 0,
  column: 0,
  index: 0,
};
onMounted(() => {
  try {
    let jsErrorList = localStorage.getItem('jsErrorList');
    if (jsErrorList) {
      isError.value = true;
      js_error.value = JSON.parse(jsErrorList);
    }
  } catch (e) {
    console.log(e);
  }
});
const openDialog = (item: any, index: number) => {
  dialogVisible.value = true;
  stackFrameObj = {
    line: item.lineNumber,
    column: item.columnNumber,
    index: index,
  }

}
const sourceMapUpload =  async (file: any) => {
  if(file.name.substring(file.name.lastIndexOf('.') + 1) !== 'map') {
    ElMessage.error('请上传正确的sourceMap文件');
    return;
  }
  const reader = new FileReader();
  reader.readAsText(file, "utf-8");
  reader.onload = async function(evt) {
    const code = await getSource(evt.target?.result, stackFrameObj.line, stackFrameObj.column);
    js_error.value.stack_frames[stackFrameObj.index].origin = code;
    dialogVisible.value = false;
  }
}
const getSource = async (sourcemap: any, line: number, column: number) => {
  try {
    const consumer = await new sourceMap.SourceMapConsumer(JSON.parse(sourcemap));
  // 通过报错位置查找到对应的源文件名称以及报错行数
  const originalPosition = consumer.originalPositionFor({
    line: line,
    column: column
  });
  const source = consumer.sourceContentFor(originalPosition.source);
  return {
    source,
    column: originalPosition.column,
    line: originalPosition.line,
  }
  } catch (e) {
    ElMessage.error('sourceMap解析失败');
  }
}
</script>