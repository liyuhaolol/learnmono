<script setup>
  import {onMounted} from "vue";
  import {getForum} from "@learnmono/requestcenter"

  onMounted(() => {
    getForum(-1)
        .then((response) => {
          console.log("返回response")
        })
        .catch((error) => {
          console.log("返回error")
        })
  })
</script>

<template>
  <div>
    hello vue
  </div>
</template>

<style scoped>

</style>