<template lang="pug">
div
  PartsMarkdown(
    md="# LICENSE INFORMATIONS\nThis software was developed using the following libraries. Thanks to everyone who contributed to their development."
  ) 
  hr
  template(
    v-for="({ publisher, licenseText, copylight }, libName) in typedLicense",
    :key="libName"
  )
    .text-4xl
      code.mr-2.rounded-lg.border-2.border-solid.border-black {{ libName }}
      | published by
      code.rounded-lg.border-2.border-solid.border-black(
        :class="{ 'text-base': !publisher }"
      ) {{  publisher || "[[ The author's name couldn't be automatically retrieved. Please refer to the license below. ]]"  }}
    PartsMarkdown(:md="licenseText")
    div {{ copylight }}
    hr.my-2
</template>

<script setup lang="ts">
const typedLicense = (await $fetch("/license-info.json")) as {
  [key: string]: {
    name: string;
    version: string;
    description: string;
    licenses: string;
    copyright: string;
    licenseText: string;
    publisher: string;
    copylight: string;
  };
};
</script>
