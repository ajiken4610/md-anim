<template lang="pug">
div
  .anim-md.w-full(ref="mdElement", v-auto-animate)
    component.inline-block(
      :is="element.r[2].break ? 'br' : 'span'",
      v-for="element of elements",
      :key="element.k"
    )
      span.animation.whitespace-pre(
        v-if="!element.r[2].break",
        :style="element.r"
      ) {{ element.c }}
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ md: string }>(), {
  md: "# MD_NOT_PROVIDED",
});
const elements: {
  r: [number, number, { [key: string]: string }];
  k?: number | undefined;
  c?: string | undefined;
}[] = reactive([]);
const copyKeys = ["font"];
const parentNodeSize = ref([0, 0]);
const mdElement = ref<HTMLDivElement>();
const parse = async (md: string, { sessionId }: { sessionId: string }) => {
  let parsed = await parseMD(md, true);
  // console.log(parsed);
  let count = 0;
  const planeArray: string[] = [];
  parsed = parsed.replaceAll(/(\[c\](.))|\[b\]/g, (_, _2, p2) => {
    p2 ? planeArray.push(p2) : planeArray.push("\n");
    // console.log(_, p1, p2)
    return p2
      ? `<span class="${sessionId}-${count++}">${p2}</span>`
      : `<br class="${sessionId}-${count++}">`;
  });
  // parsed = parsed.replaceAll("", () => `<br class="${sessionId}-${count++}">`);
  // console.log(parsed);
  const plane = planeArray.join("");
  const divEl = document.createElement("div");
  divEl.style.width = "max-content";
  divEl.style.position = "fixed";
  divEl.style.top = "0";
  divEl.innerHTML = parsed;
  mdElement.value!.appendChild(divEl);
  const parentBoundingBox = divEl.getBoundingClientRect();
  const parentNodeSize = [parentBoundingBox.width, parentBoundingBox.height];
  const rects: [number, number, { [key: string]: string }][] = [];
  for (var i = 0; i < count; i++) {
    const el = divEl.querySelector(`.${sessionId}-${i}`)!;
    if (el instanceof HTMLSpanElement) {
      const rect = el.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(el);
      const copyValues: { [key: string]: string } = {};
      for (const key of copyKeys) {
        copyValues[key] = computedStyle.getPropertyValue(key);
      }
      rects.push([rect.x, rect.y, copyValues]);
    } else if (el instanceof HTMLBRElement) {
      rects.push([0, 0, { break: "true" }]);
    }
  }
  mdElement.value!.removeChild(divEl);

  return { plane, count, rects, parentNodeSize };
};
onMounted(() => {
  let lastKey = 0;
  let lastKeys: { c: string; k: number }[] = [];
  watch(
    toRef(props, "md"),
    async (md, mdOld = "") => {
      const sessionId = "_" + Math.random().toString(36).substring(2);
      const {
        plane,
        count,
        rects,
        parentNodeSize: parentNodeSizeNew,
      } = await parse(md, { sessionId });
      parentNodeSize.value = parentNodeSizeNew;
      const { plane: planeOld } = await parse(mdOld, {
        sessionId: sessionId + "_",
      });
      const diffs = await calDiffAsync(planeOld, plane);
      let pointer = 0;
      let offset = 0;
      const oldNewHandler: { [key: number]: number } = {};
      for (const diff of diffs) {
        const charCount = diff.count || 0;
        for (var i = 0; i < charCount; i++) {
          const char = diff.value.charAt(i);
          if (diff.added) {
            lastKeys.splice(pointer + offset, 0, { c: char, k: lastKey++ });
          }
          if (diff.removed) {
            lastKeys.splice(pointer + offset, 1);
            offset--;
          }
          oldNewHandler[pointer] = pointer + offset;
          pointer++;
        }
      }
      elements.length = 0;
      for (var i = 0; i < count; i++) {
        const lastKey = lastKeys[i];
        // console.log(lastKey)
        elements.push({
          r: rects[i]!,
          k: lastKey?.k,
          c: lastKey?.c,
        });
      }
    },
    { immediate: true },
  );
});
</script>

<style scoped lang="scss">
.animation {
  transition: font 0.25s ease-in-out;
}

.anim-md :deep(ul) {
  list-style-type: disc;
  padding-left: 2rem;
}

.anim-md :deep(ol) {
  list-style-type: decimal;
  padding-left: 1rem;
}

@for $headingIndex from 1 through 6 {
  .anim-md :deep(h#{$headingIndex}) {
    font-size: (8 - $headingIndex) * 0.5rem;
  }
}

.anim-md :deep(code) {
  border: 1px solid black;
  border-radius: 0.25rem;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}

.anim-md :deep(blockquote) {
  border-left: 0.25rem solid;
  padding-left: 0.5rem;
  border-color: gray;
}

.anim-md :deep(table) {
  border-spacing: 0px;
}

.anim-md :deep(td),
.anim-md :deep(th) {
  border: 1px black solid;
  padding: 0.2rem;
}
</style>
