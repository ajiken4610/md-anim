import{p as w}from"./parseMD.d2c01e17.js";import{f as m,g as x,Q as y,o as n,c as o,v as p,_ as f,V as k,b as c,F as u,m as g,a as t,t as a,d as M,W as T}from"./entry.6511e5b3.js";const I=["innerHTML"],L=m({__name:"Markdown",props:{md:{default:"# MD_NOT_PROVIDED"}},setup(r){const e=r,s=x("");return y(async()=>{s.value=await w(e.md)}),(d,h)=>(n(),o("div",{class:"md",innerHTML:p(s)},null,8,I))}});const N=f(L,[["__scopeId","data-v-19430ce5"]]),D=t("hr",null,null,-1),E={class:"text-4xl"},V={class:"mr-2 rounded-lg border-2 border-solid border-black"},$=t("hr",{class:"my-2"},null,-1),C=m({__name:"LicenseInfo",async setup(r){let e,s;const d=([e,s]=k(()=>$fetch("/md-anim/license-info.json")),e=await e,s(),e);return(h,P)=>{const _=N;return n(),o("div",null,[c(_,{md:`# LICENSE INFORMATIONS
This software was developed using the following libraries. Thanks to everyone who contributed to their development.`}),D,(n(!0),o(u,null,g(p(d),({publisher:l,licenseText:b,copylight:v},i)=>(n(),o(u,{key:i},[t("div",E,[t("code",V,a(i),1),M("published by"),t("code",{class:T(["rounded-lg border-2 border-solid border-black",{"text-base":!l}])},a(l||"[[ The author's name couldn't be automatically retrieved. Please refer to the license below. ]]"),3)]),c(_,{md:b},null,8,["md"]),t("div",null,a(v),1),$],64))),128))])}}}),O={class:"m-4"};function B(r,e){const s=C;return n(),o("div",O,[c(s)])}const F={},H=f(F,[["render",B]]);export{H as default};