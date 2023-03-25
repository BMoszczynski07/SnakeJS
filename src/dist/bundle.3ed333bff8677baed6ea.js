(()=>{"use strict";var e={};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var s=e.g.document;if(!t&&s&&(s.currentScript&&(t=s.currentScript.src),!t)){var a=s.getElementsByTagName("script");a.length&&(t=a[a.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})();const t=e.p+"assets/point.a41846ef811ebc769132d677a9d33a21.mp3",s=e.p+"assets/gameover.0242c96fc833693dc721ea75ebb2d1b4.wav",a=e.p+"assets/speed_acceleration.952b0801786b04a70a0133de0ce831a6.wav",o=e.p+"assets/jump.ae2de8e7e136703f362699ea22c8a8c5.wav",n=e.p+"assets/start.105e220c664c62490ce0c19c670010fc.wav",r=({min:e,max:t})=>(e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e),l=class{constructor(e,t,s,a,o,n=0){this.direction=e,this.length=t,this.speed=s,this.x=a,this.y=o,this.jumps=n}},c=[],i={min:10,max:50};let d=(()=>{let e;for(;!e||e<i.min||e>i.max;){const t=prompt(`Podaj wielkość planszy (minimalna - ${i.min}, maksymalna - ${i.max}):`);e=parseInt(t),(!e||e<i.min||e>i.max)&&alert("Wprowadź poprawną wartość!")}return e})(),u={class:"",set:({payload:e,attr:t})=>{t?u.class[t]=e:u.class=e}},m={class:"",set:({payload:e,attr:t})=>{t?m.class[t]=e:m.class=e}};const h=[];let p={val:!1,set:e=>{p.val=e}},y={mute:!1,toggle:()=>{y.mute=!y.mute}},f={interval:0,set:e=>{f=e}},g={interval:"",set:e=>{g=e}},x={interval:"",set:e=>{x=e}},k=!1;const w=document.querySelector("[data-parameter=time]"),b=document.querySelector("[data-parameter=board-size]"),v=document.querySelector("[data-parameter=speed]"),S=document.querySelector("[data-parameter=length]"),L=(document.querySelector("[data-direction=top]"),document.querySelector("[data-direction=bottom]"),document.querySelector("[data-direction=left]"),document.querySelector("[data-direction=right]"),document.querySelector(".gameboard")),M=document.querySelector(".sound"),A=document.querySelectorAll(".control"),E=class{constructor(e,t,s=""){this.name=s,this.x=e,this.y=t}},q=class extends E{handleIsEaten=()=>{if(snake.x===this.x&&snake.y===this.y){mute||point.play(),board[this.y][this.x].classList.remove("tile--food"),handlePlaceTile({mode:"food"});const{x:e,y:t}=snakePositions[0],{x:s,y:a}=snakePositions[1],o=s-e,n=a-t,{newX:r,newY:l}=getNewTile(o,n,e,t);snake.length++,length.textContent=snake.length,length.style.color="#d1d122",snakePositions.unshift({x:r,y:l}),board[l][r].classList.add("tile--snake"),setTimeout((()=>{length.style.color="#000"}),300)}}},$=class extends E{handleTransformBonus=()=>{};handleIsEaten=()=>{}},C=({key:e})=>{if("M"===e)return mute=!mute,void sound.classList.toggle("sound--muted");"W"===e&&"S"===u.direction||"S"===e&&"W"===u.direction||"A"===e&&"D"===u.direction||"D"===e&&"A"===u.direction||(p||(u.direction=e,p.val=!0,mute||start.play(),f=750/(boardSize/sizeRange.max)/SPEED_CONSTANT/snake.speed,g=setInterval(handleJump,f),x=setInterval((()=>{mute||jump.play(),timer++,handleDisplay({timer})}),1e3)),p&&k&&(k=!1,u.direction=e))};let z;M.addEventListener("click",(()=>{y=!y,M.classList.toggle("sound--muted")})),A.forEach(((e,t)=>{e.addEventListener("mousedown",(()=>{e.classList.add("control--pressed")})),e.addEventListener("mouseup",(()=>{e.classList.remove("control--pressed"),C({key:["W","S","A","D"][t]})}))})),document.addEventListener("keydown",(e=>{switch(e.keyCode||e.key||e.keyIdentifier){case 87:case 38:A[0].classList.add("control--pressed");break;case 83:case 40:A[1].classList.add("control--pressed");break;case 65:case 37:A[2].classList.add("control--pressed");break;case 68:case 39:A[3].classList.add("control--pressed")}})),document.addEventListener("keyup",(e=>{let t=e.keyCode||e.key||e.keyIdentifier;switch(A.forEach((e=>e.classList.remove("control--pressed"))),t){case 87:case 38:z="W";break;case 83:case 40:z="S";break;case 65:case 37:z="A";break;case 68:case 39:z="D";break;case 77:z="M";break;default:return}C({key:z})})),document.addEventListener("DOMContentLoaded",(()=>{(()=>{const e=new Audio,r=new Audio,l=new Audio,c=new Audio,i=new Audio;c.src=t,i.src=s,l.src=a,r.src=o,e.src=n,e.volume=.07,r.volume=.1,c.volue=.2,l.volume=.3,i.volume=.3})();let e={x:r({min:Math.floor(d/2)-3,max:Math.floor(d/2)+3}),y:r({min:Math.floor(d/2)-1,max:Math.floor(d/2)+1})};u.set({payload:new l(null,Math.round(d/3),1,e.x,e.y)}),console.log(u),(({snakeLength:e,speed:t,timer:s,boardSize:a})=>{t&&(v.textContent=`${t}`),e&&(S.textContent=`Długość: ${e}`),a&&(b.textContent=`Rozmiar planszy: ${a}x${a}`),s&&(w.textContent=`Czas gry: \n    ${Math.floor(s/60/60)<10?"0"+Math.floor(s/60/60):Math.floor(s/60/60)}:${Math.floor(s/60)%60<10?"0"+Math.floor(s/60)%60:Math.floor(s/60)%60}:${s%60<10?"0"+s%60:s%60}\n    `)})({boardSize:d,speed:u.class.speed.toFixed(2),length:u.class.length}),(e=>{let t=0;for(let s=0;s<d;s++){let s=[];for(let a=0;a<d;a++){let a=document.createElement("div");a.classList.add("tile"),a.style.width=e.width-2+"px",a.style.height=e.height-2+"px",L.appendChild(a);const o=document.querySelectorAll(".tile");s.push(o[t]),t++}c.push(s)}})({width:L.clientWidth/d,height:L.clientHeight/d}),(()=>{for(let e=0;e<u.length;e++){let t={x:u.x,y:u.y+e};snakePositions.unshift({x:t.x,y:t.y}),c[u.y+e][u.x].classList.add("tile--snake")}})(),(({mode:e})=>{const t=document.querySelectorAll(".tile"),s=document.querySelectorAll(".tile:not(.tile--snake):not(.tile--boost)"),a=r({min:0,max:s.length-1}),o=Array.from(t).indexOf(s[a]),n={x:o%d,y:Math.floor(o/d)},{x:l,y:i}=n;switch(e){case"food":m.class=new q(l,i),c[m.class.y][m.class.x].classList.add("tile--food");break;case"bonus":let e=new $("bonus",l,i);h.push(e);break;default:console.error("#ERR! -> Przesłano niepoprawny typ bonusu")}})({mode:"food"})}))})();
//# sourceMappingURL=bundle.3ed333bff8677baed6ea.js.map