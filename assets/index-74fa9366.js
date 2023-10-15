(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const A=["loan-amount","loan-term","average-monthly-revenue"],E=["loan-amount-range","loan-term-range","average-monthly-revenue-range"],N=["company-registration-period","positive-or-neutral","regularly-every-month","number-of-employees"],O=["result-approval","result-rate","result-payment","result-overpayment"],I=["tooltip-total","tooltip-amortization","tooltip-interest"],l={},s={},y={},m={},v={},T=t=>t.replace(/-([a-z])/g,function(e){return e[1].toUpperCase()}),p=(t,e)=>{for(const n of t){const a=T(n);e[a]=document.getElementById(n)}};p(A,l);p(E,s);p(N,y);p(O,m);p(I,v);const g=[[.1,.5],[.6,.9],[1,3.9],[4,6.4],[6.5,8.9],[9,11.4],[11.5,13.9],[14,16.4],[16.5,20]],h=[[10,10],[10,60],[85,95],[86,95],[88,95],[89,95],[91,95],[92,95],[95,95]],R=[[[37,41],[32,26]],[[37,41],[32,26]],[[20,21],[15,16]],[[20,21],[15,16]],[[19,20],[14,15]],[[19,20],[14,15]],[[19,20],[14,15]],[[19,19],[14,14]],[[19,19],[14,14]]],b=[[37.3,32.3],[37.3,32.3],[20,15],[20,15],[19.4,14.4],[19.4,14.4],[19.1,14.1],[19,14],[18.9,13.9]],C=365,z=14,F=2.17;function f(t){return new Intl.NumberFormat("ru-RU",{style:"currency",currency:"RUB",maximumFractionDigits:0}).format(t)}function M(){const t=Number(l.loanAmount.value),e=Number(l.loanTerm.value),n=t/e/F;return i(v.tooltipAmortization,f(n)),n}function P(){const t=Number(l.loanAmount.value),[e,n]=$(),a=t*Number(e)/C*z,o=M(),r=(a/o).toFixed(0),u=a+o;V(u,r,`${n}`,a)}function i(t,e){t.innerText=e}function V(t,e,n,a){i(v.tooltipTotal,f(t)),i(m.resultPayment,f(t)),i(m.resultOverpayment,`${e}%`),i(m.resultRate,n),i(v.tooltipInterest,f(a))}function $(){const t=y.numberOfEmployees.checked,e=Number(l.averageMonthlyRevenue.value);for(let n=0;n<g.length;n++){const[a,o]=g[n].map(r=>r*1e6);if(e>a&&e<o){const r=t?h[n][1]:h[n][0],u=t?b[n][1]:b[n][0],d=t?R[n][1]:R[n][0];return i(m.resultApproval,`${r}%`),[u,`${(d[0]/12).toFixed(1)}%-${(d[1]/12).toFixed(1)}%`]}}return[0,0]}const c=(t,e)=>{t.value===""||Number(t.value)<Number(t.min)||Number(t.value)>Number(t.max)?(t.classList.add("error"),e.type==="range"&&(e.style.setProperty("--value","0"),e.value="0")):((t.classList.contains("error")||e.classList.contains("error"))&&(t.classList.remove("error"),e.classList.remove("error")),e.type==="range"&&e.style.setProperty("--value",t.value),e.value=t.value)};function x(t){P();const e=t.target;e!==null&&(e.type==="range"?(c(s.loanAmountRange,l.loanAmount),c(s.loanTermRange,l.loanTerm),c(s.averageMonthlyRevenueRange,l.averageMonthlyRevenue)):e.type==="number"||e.type==="text"?(c(l.loanAmount,s.loanAmountRange),c(l.loanTerm,s.loanTermRange),c(l.averageMonthlyRevenue,s.averageMonthlyRevenueRange)):e.type==="checkbox"&&console.log(1))}const L=(t,e)=>{Object.values(t).forEach(n=>{n!==null&&e.forEach(a=>{n.addEventListener(a,x,!1)})})};function B(t){for(const e of Object.values(t))if(e){e.style.setProperty("--value",e.value),e.style.setProperty("--min",e.min===""?"0":e.min),e.style.setProperty("--max",e.max===""?"100":e.max),e.style.setProperty("--value",e.value);const n=a=>{e.style.setProperty("--value",e.value),x(a)};e.addEventListener("input",n),e.addEventListener("change",n)}}(function(){P(),B(s),L(l,["input","focus","paste"]),L(y,["input","change"])})();
