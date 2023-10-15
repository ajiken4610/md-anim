<template lang="pug">
Title Animate Markdown Changes
AnimatedMarkdown(:md="md")
textarea.w-full(v-for="(_,index) of mds", :key="index", v-model="mds[index]")
button(@click="add") ADD
div For license inforamation please see
  NuxtLink(to="/license") /license
</template>
<script setup lang="ts">
const md = ref("");
const add = () =>
  mds.push(
    "#".repeat(Math.random() * 4 + 1) +
      " " +
      Math.random().toString(16).substring(2),
  );
const mds = reactive([]);
for (var i = 0; i < 8; i++) {
  add();
}
i = 0;
const id = setInterval(() => {
  md.value = mds[i];
  i = (i + 1) % mds.length;
}, 1000);
onUnmounted(() => {
  clearInterval(id);
});
</script>
