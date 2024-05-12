<template>
    <div class="pre-code">
        <div class="error-detail">
            <pre class="error-code" v-html="preLine()"></pre>
        </div>
    </div>
</template>
<script>
export default {
    name: 'PreView',
    props: {
        orgin: Object
    },
    methods: {
        preLine(){
            // 错误的行数
            const line = this.orgin.line
            // 先获取源码有多少行
            const originCodeLine = this.orgin.source.split('\n')
            const len = originCodeLine.length - 1
            const start =  line- 3 >= 0 ? line - 3 : 0
            const end = start + 5 >= len ? len : start + 5 // 最多展示6行
            let newLines = []
            for (var i = start; i <= end; i++) {
                const content = i + 1 + '.    ' + this.encodeHTML(originCodeLine[i])
                newLines.push(
                    `<div class='code-line ${i + 1 == line ? 'heightlight' : ''}'>${content}</div>`
                )
            }
            return newLines.join('')
        },
        encodeHTML(str) {
            if (!str || str.length == 0) return ''
            return str
                .replace(/&/g, '&#38;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/'/g, '&#39;')
        }
    }
}
</script>
<style>
.error-code {
    padding: 10px;
    overflow: hidden;
    font-family: consolas, monospace;
    word-wrap: normal;
}
.code-line {
    padding: 4px;
}
.heightlight {
    color: #fff;
    background: #f12926;
}
</style>