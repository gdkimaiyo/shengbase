import{c as d,h as q,b as Q}from"./render.51a2b3c4.js";import{c as n,h as r,r as b,m as I,z as K,g as k,R as P}from"./index.6da78808.js";import{u as g,a as y}from"./use-dark.4004475e.js";import{u as $,d as A}from"./QBtn.e503fa9a.js";var N=d({name:"QItemSection",props:{avatar:Boolean,thumbnail:Boolean,side:Boolean,top:Boolean,noWrap:Boolean},setup(e,{slots:l}){const a=n(()=>`q-item__section column q-item__section--${e.avatar===!0||e.side===!0||e.thumbnail===!0?"side":"main"}`+(e.top===!0?" q-item__section--top justify-start":" justify-center")+(e.avatar===!0?" q-item__section--avatar":"")+(e.thumbnail===!0?" q-item__section--thumbnail":"")+(e.noWrap===!0?" q-item__section--nowrap":""));return()=>r("div",{class:a.value},q(l.default))}}),W=d({name:"QItem",props:{...g,...$,tag:{type:String,default:"div"},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:["click","keyup"],setup(e,{slots:l,emit:a}){const{proxy:{$q:u}}=k(),c=y(e,u),{hasRouterLink:h,hasLink:v,linkProps:B,linkClass:R,linkTag:_,navigateToRouterLink:L}=A(),o=b(null),s=b(null),m=n(()=>e.clickable===!0||v.value===!0||e.tag==="label"),i=n(()=>e.disable!==!0&&m.value===!0),C=n(()=>"q-item q-item-type row no-wrap"+(e.dense===!0?" q-item--dense":"")+(c.value===!0?" q-item--dark":"")+(v.value===!0&&e.active===null?R.value:e.active===!0?`${e.activeClass!==void 0?` ${e.activeClass}`:""} q-item--active`:"")+(e.disable===!0?" disabled":"")+(i.value===!0?" q-item--clickable q-link cursor-pointer "+(e.manualFocus===!0?"q-manual-focusable":"q-focusable q-hoverable")+(e.focused===!0?" q-manual-focusable--focused":""):"")),S=n(()=>{if(e.insetLevel===void 0)return null;const t=u.lang.rtl===!0?"Right":"Left";return{["padding"+t]:16+e.insetLevel*56+"px"}});function w(t){i.value===!0&&(s.value!==null&&(t.qKeyEvent!==!0&&document.activeElement===o.value?s.value.focus():document.activeElement===s.value&&o.value.focus()),h.value===!0&&L(t),a("click",t))}function x(t){if(i.value===!0&&I(t,13)===!0){K(t),t.qKeyEvent=!0;const f=new MouseEvent("click",t);f.qKeyEvent=!0,o.value.dispatchEvent(f)}a("keyup",t)}function E(){const t=Q(l.default,[]);return i.value===!0&&t.unshift(r("div",{class:"q-focus-helper",tabindex:-1,ref:s})),t}return()=>{const t={ref:o,class:C.value,style:S.value,onClick:w,onKeyup:x};return i.value===!0?(t.tabindex=e.tabindex||"0",Object.assign(t,B.value)):m.value===!0&&(t["aria-disabled"]="true"),r(_.value,t,E())}}}),p=d({name:"QList",props:{...g,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean},setup(e,{slots:l}){const a=k(),u=y(e,a.proxy.$q),c=n(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(u.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>r("div",{class:c.value},q(l.default))}});function z(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),P.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}export{p as Q,W as a,N as b,z as c};