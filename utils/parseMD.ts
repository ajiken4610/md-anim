import { Marked, Renderer } from "marked";
import createDomPurify from "dompurify";
// import { markedHighlight } from "marked-highlight";
// import hljs from "highlight.js";
import "highlight.js/styles/github.css";
const marked = new Marked();
//   markedHighlight({
//     langPrefix: "hljs language-",
//     highlight(code, lang) {
//       const language = hljs.getLanguage(lang) ? lang : "plaintext";
//       return hljs.highlight(code, { language }).value;
//     },
//   }),
const renderer = new Renderer();
renderer.text = (text) => {
  const retArray = [];
  let escaping = "";

  for (const char of text) {
    if (char === "&") {
      escaping = "&";
    } else if (escaping && char === ";") {
      retArray.push(escaping + ";");
      escaping = "";
    } else if (escaping) {
      escaping += char;
    } else {
      retArray.push(char);
    }
  }
  return retArray.map((c) => `[c]${c}`).join("");
};
const defaultCode = renderer.code;
renderer.code = (code, info, escaped) => {
  return defaultCode(renderer.text(code), info, escaped);
};
const defaultCodeSpan = renderer.codespan;
renderer.codespan = (text) => {
  return defaultCodeSpan(renderer.text(text));
};

renderer.paragraph = (text) => `<p>${text}[b]</p>`;
renderer.heading = (text, level) => {
  return `<h${level}>${text}[b]</h${level}>`;
};
const sanitize = createDomPurify().sanitize;
export default async (dirtyMD: string, textAnnotation?: boolean) =>
  sanitize(
    await marked.parse(dirtyMD, {
      renderer: textAnnotation ? renderer : undefined,
    }),
  );
