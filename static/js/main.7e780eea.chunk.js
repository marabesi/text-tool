(this["webpackJsonptext-tool"]=this["webpackJsonptext-tool"]||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),c=n(5),s=n.n(c),o=n(6),l=n(2),i=(n(11),n(0));var u=function(){var e=Object(r.useState)(""),t=Object(l.a)(e,2),n=t[0],a=t[1],c=Object(r.useState)(),s=Object(l.a)(c,2),u=s[0],d=s[1],f=Object(r.useState)(),j=Object(l.a)(f,2),h=j[0],b=j[1],v=Object(r.useState)([]),O=Object(l.a)(v,2),x=O[0],p=O[1],m=Object(r.useState)([]),w=Object(l.a)(m,2),g=w[0],N=w[1];return Object(r.useEffect)((function(){d(n.length);var e=n.split(" ");if(n){var t=e.filter((function(e){return""!==e}));g.length&&(t=t.filter((function(e){var t,n=Object(o.a)(g);try{for(n.s();!(t=n.n()).done;){var r=t.value;if(e.includes(r))return!1}}catch(a){n.e(a)}finally{n.f()}return!0})));var r=[];for(var a in t)r.push({rank:0,word:t[a],count:0});var c=function(e){var n=r.find((function(n){return n.word===t[e]}));n&&n.count++};for(var s in t)c(s);for(var l=r.sort((function(e,t){return t.count-e.count})),i=0;i<l.length;i++)l[i].rank=i+1;p(l),b(t.length)}else b(0),p([])}),[n,g]),Object(i.jsxs)("div",{className:"flex h-screen overflow-hidden",children:[Object(i.jsxs)("div",{className:"flex flex-col w-4/5",children:[Object(i.jsxs)("div",{className:"flex",children:[Object(i.jsxs)("p",{className:"p-2 m-2 border-2 w-60",children:["Chars: ",u]}),Object(i.jsxs)("p",{className:"p-2 m-2 border-2 w-60",children:["Words: ",h]})]}),Object(i.jsxs)("div",{className:"m-2",children:[Object(i.jsx)("textarea",{className:"border-2 w-full outline-none",style:{minHeight:"70vh"},"data-testid":"text-area",onChange:function(e){return a(e.target.value)},defaultValue:n,rows:10,placeholder:"Type here"}),Object(i.jsx)("textarea",{"data-testid":"stop-words-area",className:"border-2 w-full outline-none",style:{minHeight:"15vh"},onChange:function(e){return function(e){var t=e.split(",").filter((function(e){return""!==e})).map((function(e){return e.replace("\n","")}));N(t)}(e.target.value)},placeholder:"Stop words: the, an, I"})]})]}),Object(i.jsxs)("div",{className:"overflow-y-scroll w-1/5",children:[Object(i.jsx)("h1",{className:"font-bold",children:"Most frequent words"}),x.map((function(e,t){return Object(i.jsxs)("p",{children:[e.rank,". ",e.word,": ",e.count]},t)}))]})]})},d=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,15)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),r(e),a(e),c(e),s(e)}))};n(13);s.a.render(Object(i.jsx)(a.a.StrictMode,{children:Object(i.jsx)(u,{})}),document.getElementById("root")),d()}},[[14,1,2]]]);
//# sourceMappingURL=main.7e780eea.chunk.js.map