<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
  import {getVersion} from "@learnmono/requestcenter"
import {marked} from "marked";
import 'github-markdown-css/github-markdown.css';

  const result = ref("")

const compiledMarkdown = computed(() => {
  return marked(result.value)
})

  onMounted(() => {
    /*    getVersion()
            .then((response) => {
              console.log("返回response")
            })
            .catch((error) => {
              console.log("返回error")
            })*/
    callStreaming()
  })

  async function callStreaming() {
    // 构造 multipart/form-data（浏览器自动生成 boundary）
    const form = new FormData();
    form.append("aiApiType", "2");
    form.append("channelCode", "tx_newszu_aiAssistant");
    form.append("query", "一年四季的介绍,多回复一些,请用markdown的格式总结");
    form.append("userId", "1122334");
    form.append("userName", "lx");
    form.append("groupId", "");
    form.append("platform", "newszu");
    form.append("operationName", "AI助手");
    form.append("siteId", "1");
    form.append("input", JSON.stringify({ type: "1" }));
    form.append("isMemory", "true");
    form.append("responseMode", "streaming");
    form.append(
        "files",
        JSON.stringify([
          {
            type: "image",
            transfer_method: "remote_url",
            url: "https://www.oushinet.com/image/2025-05-29/thumb/1377707574526349312.jpg"
          },
          {
            type: "image",
            transfer_method: "remote_url",
            url: "https://www.oushinet.com/image/2025-05-29/thumb/1377707574526349312.jpg"
          }
        ])
    );


    const response = await fetch("http://10.8.13.49:8080/aiapi/unification", {
      method: "POST",
      body: form,
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let buffer = ""; // 用来缓存不完整的片段

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      let lines = buffer.split("\n");

      // 最后一行可能是未完成的，留着
      buffer = lines.pop();

      for (const line of lines) {
        if (line.startsWith("data:")) {
          const jsonStr = line.replace("data:", "").trim();

          try {
            const msg = JSON.parse(jsonStr);
            console.log("✔ 完整消息：", msg);

            // 你想怎么处理 message.answer 在这里写：
            if (msg.event === 'message'){
              if (msg.answer !== undefined) {
                let answer = ""
                if (msg.answer !== "" && msg.answer !== null){
                  answer = msg.answer;
                }
                console.log("AI流式 answer:", answer)
                result.value = result.value + answer
              }
            }

          } catch (e) {
            console.warn("⚠ JSON 不完整，等待下一段:", jsonStr);
          }
        }
      }
    }

    console.log("🚀 流式结束");
  }
</script>

<template>
  <div v-html="compiledMarkdown">
  </div>
</template>

<style scoped>
.markdown-body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
  background: palegreen;
}
</style>