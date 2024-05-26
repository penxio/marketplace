"use strict";(()=>{function o(t){let e=new MessageChannel;e.port1.onmessage=s=>{t(s.data.value)},self.postMessage({type:"InitOnFilterChange"},[e.port2])}function r(t){postMessage({type:"Loading.",data:t})}function a(t){postMessage({type:"Render",component:t.toJSON()})}var h=class{constructor(t=[]){this.items=t,this.isShowingDetail=!1,this.isLoading=!1,this.filtering=!0,this.titleLayout="row",this.setItems=e=>(this.items=e,this),this.addItem=e=>(this.items.push(e),this),this.setLoading=e=>(this.isLoading=e,this),this.setShowingDetail=e=>(this.isShowingDetail=e,this)}setTitleLayout(t){return this.titleLayout=t,this}setFiltering(t){return this.filtering=t,this}toJSON(){return{type:"list",isLoading:this.isLoading,isShowingDetail:this.isShowingDetail,filtering:this.filtering,titleLayout:this.titleLayout,items:this.items.map(t=>t.detail?{...t,detail:t.detail.toJSON()}:t)}}};async function c(t){let e=`https://hacker-news.firebaseio.com/v0/${t}stories.json`;return await fetch(e).then(n=>n.json()).then(n=>{let i=n.slice(0,10).map(l=>fetch(`https://hacker-news.firebaseio.com/v0/item/${l}.json`).then(p=>p.json()));return Promise.all(i)})}async function d(){r({type:"spinner"});let t=await u(),e=new h(t);o(async s=>{r({type:"spinner"});let n=await u(s.type);e.setItems(n),a(e)}),a(e)}async function u(t="top"){return(await c(t)).map((n,i)=>({icon:i+1,title:n.title,actions:[{type:"OpenInBrowser",url:n.url}],extra:[{icon:"comment.svg",text:n.descendants||0},{icon:"up.svg",text:n.score||0}]}))}d();})();
