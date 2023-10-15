module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    "plugin:vue/vue3-recommended",
    "plugin:vue-pug/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "prettier",
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    "vue/multi-word-component-names": "off",
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    templateTokenizer: {
      // template tokenizer for `<template lang="pug">`
      pug: "vue-eslint-parser-template-tokenizer-pug",
    },
  },
  ignorePatterns: ["docs"],
};
