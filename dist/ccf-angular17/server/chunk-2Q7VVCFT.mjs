import './polyfills.server.mjs';
import{Ea as m,Fa as d,La as f,Ma as h,Pa as p,Q as l,ra as c}from"./chunk-44XUN57R.mjs";var D=(()=>{let e=class e{ngOnInit(){}constructor(){this.countDownDate=new Date("March 17, 2024 09:00:00").getTime(),this.x=setInterval(()=>{let a=new Date().getTime(),t=this.countDownDate-a,n=Math.floor(t/(1e3*60*60*24)),i=Math.floor(t%(1e3*60*60*24)/(1e3*60*60)),r=Math.floor(t%(1e3*60*60)/(1e3*60)),s=Math.floor(t%(1e3*60)/1e3);n==0&&i==0&&r==0&&s==0?this.timer="Hoy es el dia, \xA1Vamos!":this.timer="Faltan: "+n+"d "+i+"h "+r+"m "+s+"s"})}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=l({type:e,selectors:[["app-countdown-carrera"]],standalone:!0,features:[p],decls:2,vars:1,template:function(t,n){t&1&&(m(0,"p"),f(1),d()),t&2&&(c(1),h(n.timer))}});let o=e;return o})();export{D as a};
