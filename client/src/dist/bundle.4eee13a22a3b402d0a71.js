/*! For license information please see bundle.4eee13a22a3b402d0a71.js.LICENSE.txt */
(()=>{"use strict";var e={};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var s=e.g.document;if(!t&&s&&(s.currentScript&&(t=s.currentScript.src),!t)){var o=s.getElementsByTagName("script");o.length&&(t=o[o.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})();const t=document.querySelector(":root"),s=getComputedStyle(t),o={"--board-color":s.getPropertyValue("--board-color"),"--snake-color":s.getPropertyValue("--snake-color"),"--tile-color":s.getPropertyValue("--tile-color"),"--background":s.getPropertyValue("--background"),"--food-color":s.getPropertyValue("--food-color"),"--text-color":s.getPropertyValue("--text-color")};let a={boardColor:localStorage.getItem("board-theme")||o["--board-color"],snakeColor:localStorage.getItem("snake-color")||o["--snake-color"],tileColor:localStorage.getItem("tile-color")||o["--tile-color"],foodColor:localStorage.getItem("food-color")||o["--food-color"],background:localStorage.getItem("background")||o["--background"]};const l=class{constructor(e){this.board=e,t.style.setProperty("--board-color",this.board.boardColor),t.style.setProperty("--text-color",this.board.textColor),t.style.setProperty("--snake-color",this.board.snakeColor),t.style.setProperty("--background",this.board.background),t.style.setProperty("--food-color",this.board.foodColor),t.style.setProperty("--tile-color",this.board.tileColor)}handlePickTheme=({theme:e})=>{const{textColor:s,boardColor:o,tileColor:a,background:l,foodColor:r,snakeColor:n}=e;t.style.setProperty("--board-color",o),t.style.setProperty("--text-color",s),t.style.setProperty("--snake-color",n),t.style.setProperty("--background",l),t.style.setProperty("--food-color",r),t.style.setProperty("--tile-color",a),localStorage.setItem("--board-color",o),localStorage.setItem("--text-color",s),localStorage.setItem("--snake-color",n),localStorage.setItem("--background",l),localStorage.setItem("--food-color",r),localStorage.setItem("--tile-color",a)};handleNystagmus=()=>{let e,s=!1;e=setInterval((()=>{s=!s,t.style.setProperty("--tile-color",s?"#fff":"#000"),t.style.setProperty("--snake-color",s?"#000":"#fff"),t.style.setProperty("--food-color",s?"#f00":"#00f")}),50),setTimeout((()=>{t.style.setProperty("--snake-color",this.board.snakeColor),t.style.setProperty("--tile-color",this.board.tileColor),t.style.setProperty("--food-color",this.board.foodColor),clearInterval(e)}),4e3)}},r=e.p+"assets/point.mp3",n=e.p+"assets/gameover.wav",i=e.p+"assets/speed_acceleration.wav",c=e.p+"assets/jump.wav",d=e.p+"assets/start.wav",u=e.p+"assets/explosion.wav",m=({min:e,max:t})=>(e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e),p=[],y={min:10,max:40};let h=20,b={class:"",set:({payload:e,attr:t})=>{t?b.class[t]=e:b.class=e}},g={class:"",set:({payload:e,attr:t})=>{t?g.class[t]=e:g.class=e}},v={val:!1,set:e=>{v.val=e}};const f=[];let k={time:0,increment:()=>{k.time++},set:({payload:e})=>{k.time=e}},x={isMuted:!1,toggle:()=>{x.isMuted=!x.isMuted}},L={val:0,set:e=>{L.val=e}},I={interval:"",set:e=>{I.interval=e}},S={interval:"",set:e=>{S.interval=e}},w={state:!1,set:e=>{w.state=e}};const P=class{constructor(e,t,s=""){this.name=s,this.x=e,this.y=t}},C=document.querySelector("[data-parameter=time]"),E=document.querySelector("[data-parameter=board-size]"),M=document.querySelector("[data-parameter=speed]"),A=document.querySelector("[data-parameter=length]"),q=(document.querySelector("[data-direction=top]"),document.querySelector("[data-direction=bottom]"),document.querySelector("[data-direction=left]"),document.querySelector("[data-direction=right]"),document.querySelector(".gameboard")),T=document.querySelector(".sound"),D=document.querySelectorAll(".control"),$=({snakeLength:e,speed:t,timer:s,boardSize:o})=>{t&&(M.textContent=`${t}`),e&&(A.textContent=`${e}`),o&&(E.textContent=`Rozmiar planszy: ${o}x${o}`),s&&(C.textContent=`Czas gry: \n    ${Math.floor(s/60/60)<10?"0"+Math.floor(s/60/60):Math.floor(s/60/60)}:${Math.floor(s/60)%60<10?"0"+Math.floor(s/60)%60:Math.floor(s/60)%60}:${s%60<10?"0"+s%60:s%60}\n    `)},z=[];let N={state:!0,toggle:()=>{N.state=!N.state}},X={val:"",set:({payload:e})=>{X.val=e}};const B=document.querySelector(".game-over"),F=document.querySelector(".container"),H=document.querySelector("[data-points]"),W=document.querySelector("[data-speed]"),j=document.querySelector("[data-length]"),R=document.querySelector("[data-boardSize]"),V=document.querySelector("[data-timer]"),Y=document.querySelector("[data-username-input]"),O=(document.querySelector("[data-message-input]"),document.querySelector(".play-again")),U=document.querySelector(".pencil"),_=document.querySelector(".gameover-form"),G=e=>{e.preventDefault()},J=()=>{B.style.display="none",F.style.display="none",document.querySelectorAll(".tile").forEach((e=>e.remove()));let e=f.length;for(let t=0;t<e;t++)f.shift();for(let e=0;e<h;e++)p.pop();let t=ke.length;for(let e=0;e<t;e++)clearInterval(ke[0].boostInterval),ke.shift();clearInterval(X.val),X.val="";let s=z.length;for(let e=0;e<s;e++)clearInterval(z[0].bombInterval),z.shift();O.removeEventListener("click",J),U.removeEventListener("click",K),h=(()=>{let e;for(;!e||e<y.min||e>y.max;){const t=prompt(`Podaj wielkość planszy (minimalna - ${y.min}, maksymalna - ${y.max}):`);e=parseInt(t),(!e||e<y.min||e>y.max)&&alert("Wprowadź poprawną wartość!")}return e})(),Ae()},K=()=>{Y.focus()},Q=()=>{B.style.display="flex",F.style.display="flex",clearInterval(S.interval),clearInterval(I.interval),v.val=!1;const{speed:e,length:t}=b.class,s={totalPoints:Math.round(t*e*h*15),speed:e,boardSize:h,length:t,time:{hours:Math.floor(k.time/60/60),minutes:Math.floor(k.time/60)%60,seconds:k.time%60}};H.textContent=`${s.totalPoints} Punkty`,W.textContent=`${s.speed.toFixed(2)} Prędkość`,j.textContent=`${s.length} Długość`,R.textContent=`${s.boardSize}x${s.boardSize} Rozmiar`,V.textContent=`${s.time.hours>10?s.time.hours:"0"+s.time.hours}:${s.time.minutes>10?s.time.minutes:"0"+s.time.minutes}:${s.time.seconds>10?s.time.seconds:"0"+s.time.seconds} Czas gry`,O.addEventListener("click",J),U.addEventListener("click",K),_.addEventListener("submit",G),setTimeout((()=>{navigator.vibrate([200,100,300])}),150),x.isMuted||Pe.play()},Z=()=>{const{x:e,y:t}=f[0],{x:s,y:o}=f[1]?f[1]:{x:void 0,y:void 0};if(!s||!o){let s={x:0,y:0};switch(b.class.direction){case"W":s.x=e,s.y=t+1;break;case"S":s.x=e,s.y=t-1;break;case"A":s.x=e+1,s.y=t;break;case"D":s.x=e-1,s.y=t}return{newX:s.x,newY:s.y}}return((e,t,s,o)=>{let a=s,l=o;return 0!==e?a=(s-e+h)%h:0!==t&&(l=(o-t+h)%h),p[l][a].classList.contains("tile--snake")?(Q(),{newX:a,newY:l}):{newX:a,newY:l}})(s-e,o-t,e,t)},ee=class extends P{handleIsEaten=()=>{if(b.class.x===this.x&&b.class.y===this.y){x.isMuted||we.play(),p[this.y][this.x].classList.remove("tile--food"),re({mode:"food"});const{newX:e,newY:t}=Z();if(!v.val)return;let s=f.length;const{x:o,y:a}=f[0],l=p[a][o]?p[a][o]:void 0;if(l)if(l.classList.contains("tile--snake-added-point"))for(let e=0;e<s;e++){const{x:t,y:s}=f[e];p[s][t].classList.remove("tile--snake-added-point")}else if(l.classList.contains("tile--snake-subtracted-point"))for(let e=0;e<s;e++){const{x:e,y:t}=f[0],s=p[t][e];if(!s.classList.contains("tile--snake-subtracted-point"))break;s.classList.remove("tile--snake-subtracted-point"),s.classList.remove("tile--snake"),f.shift(),b.class.length--}b.class.length++,$({snakeLength:b.class.length}),A.style.color="#d1d122",f.unshift({x:e,y:t}),p[t][e].classList.add("tile--snake"),setTimeout((()=>{A.style.color="#000"}),300)}}};let te={class:"",set:({payload:e,attr:t})=>{t?te.class[t]=e:te.class=e}};const se=te,oe=({type:e})=>{let s;switch(e){case"Nystagmus":se.class.handleNystagmus();break;case"+5 points":setTimeout((()=>{for(let e=0;e<f.length;e++){let{x:t,y:s}=f[e];if(!p[s][t].classList.contains("tile--snake-added-point"))break;p[s][t].classList.remove("tile--snake-added-point")}}),500),s=f.length;for(let e=0;e<s;e++){const{x:e,y:t}=f[0],s=p[t][e];if(!s.classList.contains("tile--snake-subtracted-point"))break;s.classList.remove("tile--snake-subtracted-point"),s.classList.remove("tile--snake"),f.shift(),b.class.length--}for(let e=0;e<5;e++){const e=Z();if(!v.val)return;if(e){const{newX:t,newY:s}=e;b.class.length++,$({snakeLength:b.class.length}),f.unshift({x:t,y:s}),p[s][t].classList.add("tile--snake"),p[s][t].classList.add("tile--snake-added-point")}}break;case"-5 points":setTimeout((()=>{let e=f.length;for(let t=0;t<e;t++){const{x:e,y:t}=f[0],s=p[t][e];if(!s.classList.contains("tile--snake-subtracted-point"))break;s.classList.remove("tile--snake-subtracted-point"),s.classList.remove("tile--snake"),f.shift(),b.class.length--,$({snakeLength:b.class.length})}}),500);for(let e=0;e<5;e++){const{x:t,y:s}=f[e];if(p[s][t].classList.contains("tile--snake-added-point"))p[s][t].classList.remove("tile--snake-added-point"),p[s][t].classList.add("tile--snake-subtracted-point");else{if(e===f.length-1)break;p[s][t].classList.add("tile--snake-subtracted-point")}}break;case"Bombs":navigator.vibrate(100),""===X.val&&X.set({payload:setInterval((()=>{N.toggle(),console.log("interval"),t.style.setProperty("--bomb-color",N.state?"#000":"#f00")}),250)});for(let e=0;e<Math.floor(.4*h);e++)re({mode:"bomb"});break;default:console.error("#ERR -> Nieznany typ bonusu!")}},ae=class extends P{constructor(e,t,s,o,a,l){super(e,t,s),this.bonusID=o,this.imgPATH=a,this.audioPATH=l;const r=L.val*m({min:10,max:200})/100;this.boostInterval=setInterval(this.handleBonusTranslate,r)}handleBonusTranslate=()=>{if(v.val)if(p[this.y][this.x].classList.remove("tile--boost"),p[this.y][this.x].style.backgroundImage="",this.y++,this.x!==b.class.x||this.y!==b.class.y){if(this.y===h){const e=ke.findIndex((e=>e.bonusID===this.bonusID));return clearInterval(this.boostInterval),void ke.splice(e,1)}p[this.y][this.x].classList.add("tile--boost"),p[this.y][this.x].style.backgroundImage=`url('${fe[this.name].img}')`}else{clearInterval(this.boostInterval),console.log("eaten -> bonus ate snake");const e=ke.findIndex((e=>e.bonusID===this.bonusID));if(ke.splice(e,1),oe({type:this.name}),!x.isMuted){const e=new Audio;e.src=this.audioPATH,e.play()}}else clearInterval(this.boostInterval)}},le=class extends P{constructor(e,t){super(e,t),this.bombId=z.length,z.push(this);const s=m({min:50,max:250});this.bombInterval=setInterval(this.handleBombTranslate,s)}handleBombTranslate=()=>{if(v.val){if(p[this.y][this.x].classList.remove("tile--bomb"),0===this.x){clearInterval(this.bombInterval);const e=z.findIndex((e=>e.bombId===this.bombId));return console.log(z),z.splice(e,1),console.log(z),void(0===z.length&&(clearInterval(X.val),X.set({payload:""})))}this.x--,p[this.y][this.x].classList.add("tile--bomb"),this.handleBombCollide()}else clearInterval(this.bombInterval)};handleBombCollide=()=>{if(this.x===b.class.x&&this.y===b.class.y)return x.isMuted||Ee.play(),p[this.y][this.x].classList.remove("tile--bomb"),clearInterval(this.bombInterval),void Q()}},re=({mode:e,bonus:t})=>{if("bonus"===e){let e;t&&(e=new ae(0,0,t.name,ke.length,t.imgPATH,t.audioPATH));const s=[];if(p[0].forEach(((e,t)=>{e.classList.contains("tile--boost")||s.push(t)})),0===s.length)return;let o=m({min:0,max:s.length-1});return p[0][s[o]].classList.add("tile--boost"),p[0][s[o]].style.backgroundImage=`url('${e.imgPATH}')`,e.x=s[o],void ke.push(e)}const s=document.querySelectorAll(".tile"),o=document.querySelectorAll(".tile:not(.tile--snake)");if(0===o.length)return void Q();const a=m({min:0,max:o.length-1}),l=Array.from(s).indexOf(o[a]),r={x:l%h,y:Math.floor(l/h)},{x:n,y:i}=r;switch(e){case"food":g.class=new ee(n,i),p[g.class.y][g.class.x].classList.add("tile--food");break;case"bomb":let e=m({min:0,max:h-1});p[e][h-1].classList.add("tile--bomb"),new le(h-1,e);break;default:console.error("#ERR! -> Przesłano niepoprawny typ bonusu")}},ne=e.p+"assets/SPEED2X.png",ie=e.p+"assets/SPEED2X.wav",ce=e.p+"assets/SPEED 2Xlower.png",de=e.p+"assets/SPEED 2Xlower.wav",ue=e.p+"assets/Freeze.png",me=e.p+"assets/Freeze.mp3",pe=e.p+"assets/Bombs.png",ye=e.p+"assets/bombs.wav",he=e.p+"assets/+5 points.wav",be=e.p+"assets/-5 points.wav",ge=e.p+"assets/+5 points.png",ve=e.p+"assets/-5 points.png",fe={"SPEED 2X":{img:ne,audio:ie},"SPEED /2X":{img:ce,audio:de},Freeze:{img:ue,audio:me},Bombs:{img:pe,audio:ye},Nystagmus:{img:e.p+"assets/Nystagmus.png",audio:e.p+"assets/nystagmus.wav"},"+5 points":{img:ge,audio:he},"-5 points":{img:ve,audio:be}},ke=[],xe=[{name:"SPEED 2X",probability:100},{name:"SPEED /2X",probability:100},{name:"Freeze",probability:100},{name:"Bombs",probability:100},{name:"Nystagmus",probability:100},{name:"+5 points",probability:100},{name:"-5 points",probability:100}],Le=new Audio,Ie=new Audio,Se=new Audio,we=new Audio,Pe=new Audio,Ce=new Audio,Ee=new Audio,Me=class{constructor(e,t,s,o,a,l=0){this.direction=e,this.length=t,this.speed=s,this.x=o,this.y=a,this.jumps=l}},Ae=()=>{we.src=r,Pe.src=n,Se.src=i,Ie.src=c,Le.src=d,Ee.src=u,Ee.volume=1,Le.volume=.07,Ie.volume=.1,we.volue=.07,Se.volume=.3,Pe.volume=.3,Ce.volume=.1;let e={x:m({min:Math.floor(h/2)-3,max:Math.floor(h/2)+3}),y:m({min:Math.floor(h/2)-1,max:Math.floor(h/2)+1})};b.set({payload:new Me(null,Math.round(h/3),1,e.x,e.y)}),k.set({payload:0}),$({boardSize:h,speed:b.class.speed.toFixed(2),snakeLength:b.class.length,timer:`${k.time}`}),(e=>{let t=0;for(let s=0;s<h;s++){let s=[];for(let o=0;o<h;o++){let o=document.createElement("div");o.classList.add("tile"),o.style.width=e.width-2+"px",o.style.height=e.height-2+"px",q.appendChild(o);const a=document.querySelectorAll(".tile");s.push(a[t]),t++}p.push(s)}})({width:q.clientWidth/h,height:q.clientHeight/h}),(()=>{for(let e=0;e<b.class.length;e++){let t={x:b.class.x,y:b.class.y+e};f.unshift({x:t.x,y:t.y}),p[b.class.y+e][b.class.x].classList.add("tile--snake")}})(),re({mode:"food"})},qe=()=>{g.class.handleIsEaten(),(()=>{let e;if(ke.map(((t,s)=>{t.x===b.class.x&&t.y===b.class.y&&(e={bonus:t,index:s})})),e){const{bonus:t,index:s}=e;clearInterval(ke[s].boostInterval),console.log("eaten -> snake ate bonus");const o=p[t.y][t.x];if(o.classList.remove("tile--boost"),o.style.backgroundImage="",ke.splice(s,1),oe({type:t.name}),!x.isMuted){const e=new Audio;e.src=t.audioPATH,e.play()}}})();for(const e of z)e.handleBombCollide();if(!v.val)return;const{x:e,y:t}=f[0];if(p[b.class.y][b.class.x].classList.contains("tile--snake"))return void Q();const s=p[t][e]?p[t][e]:void 0;if(s)if(s.classList.contains("tile--snake-added-point")){for(let e=0;e<f.length;e++){const{x:t,y:s}=f[e],o=p[s][t];if(!o.classList.contains("tile--snake-added-point")){o.classList.add("tile--snake-added-point");break}}s.classList.remove("tile--snake-added-point")}else if(s.classList.contains("tile--snake-subtracted-point")){for(let e=0;e<f.length;e++){const{x:t,y:s}=f[e],o=p[s][t];if(!o.classList.contains("tile--snake-subtracted-point")){o.classList.add("tile--snake-subtracted-point");break}}s.classList.remove("tile--snake-subtracted-point")}p[t][e].classList.remove("tile--snake"),f.shift(),p[b.class.y][b.class.x].classList.add("tile--snake"),f.push({x:b.class.x,y:b.class.y})},Te=()=>{Math.random()<1&&0===ke.length&&(()=>{const e=m({min:0,max:100}),t=[...xe.filter((t=>t.probability>=e))];for(const e of t)re({mode:"bonus",bonus:{name:e.name,imgPATH:fe[e.name].img,audioPATH:fe[e.name].audio}})})(),(()=>{switch(b.class.direction){case"W":b.class.y=0===b.class.y?h-1:b.class.y-1,qe();break;case"S":b.class.y=b.class.y===h-1?0:b.class.y+1,qe();break;case"A":b.class.x=0===b.class.x?h-1:b.class.x-1,qe();break;case"D":b.class.x=b.class.x===h-1?0:b.class.x+1,qe();break;default:console.error("#ERR: Nieprawidłowy kierunek!")}})(),v.val&&(b.class.jumps++,(()=>{if(b.class.jumps%(9*Math.floor(h/10))==0){b.class.speed=parseFloat((b.class.speed+.1).toFixed(2));let e=parseFloat((b.class.speed/10).toFixed(3)),t=b.class.speed%e;console.log(b.class.speed,e,t),!x.isMuted&&(b.class.speed<2||b.class.speed>=2&&0===Math.floor(b.class.speed%(b.class.speed/10)))&&Se.play(),M.classList.add("parameter-speed--acceleration"),$({speed:b.class.speed.toFixed(2)}),setTimeout((()=>{M.classList.remove("parameter-speed--acceleration")}),1e3),L.val=750/(h/y.max)/4/b.class.speed,clearInterval(I.interval),I.set(setInterval(Te,L.val))}})(),w.set(!0))},De=Te,$e=({key:e})=>{if("M"===e)return x.isMuted=!x.isMuted,void T.classList.toggle("sound--muted");"W"===e&&"S"===b.class.direction||"S"===e&&"W"===b.class.direction||"A"===e&&"D"===b.class.direction||"D"===e&&"A"===b.class.direction||(v.val||0!==b.class.jumps||("S"===e&&(f.reverse(),b.set({attr:"y",payload:f[f.length-1].y})),b.class.direction=e,v.val=!0,x.isMuted||Le.play(),L.val=750/(h/y.max)/4/b.class.speed,I.set(setInterval(De,L.val)),S.set(setInterval((()=>{x.isMuted||Ie.play(),k.increment(),$({timer:k.time})}),1e3))),v.val&&w.state&&(w.set(!1),b.class.direction=e))},ze=e.p+"assets/1st-place.png";let Ne;T.addEventListener("click",(()=>{x.isMuted=!x.isMuted,T.classList.toggle("sound--muted")})),D.forEach(((e,t)=>{e.addEventListener("touchstart",(()=>{e.classList.add("control--pressed")})),e.addEventListener("touchend",(()=>{e.classList.remove("control--pressed"),$e({key:["W","S","A","D"][t]})})),e.addEventListener("mousedown",(()=>{e.classList.add("control--pressed")})),e.addEventListener("mouseup",(()=>{e.classList.remove("control--pressed"),$e({key:["W","S","A","D"][t]})}))})),document.addEventListener("keydown",(e=>{if("INPUT"!==document.activeElement.tagName)switch(e.keyCode||e.key||e.keyIdentifier){case 87:case 38:D[0].classList.add("control--pressed");break;case 83:case 40:D[1].classList.add("control--pressed");break;case 65:case 37:D[2].classList.add("control--pressed");break;case 68:case 39:D[3].classList.add("control--pressed")}})),document.addEventListener("keyup",(e=>{if("INPUT"===document.activeElement.tagName)return;let t=e.keyCode||e.key||e.keyIdentifier;switch(D.forEach((e=>e.classList.remove("control--pressed"))),t){case 87:case 38:Ne="W";break;case 83:case 40:Ne="S";break;case 65:case 37:Ne="A";break;case 68:case 39:Ne="D";break;case 77:Ne="M";break;default:return}$e({key:Ne})}));const Xe=document.querySelector("[data-trophy]");document.addEventListener("DOMContentLoaded",(()=>{Xe.src=ze,se.set({payload:new l({boardColor:a.boardColor,textColor:a.textColor,tileColor:a.tileColor,foodColor:a.foodColor,background:a.background,snakeColor:a.snakeColor})}),Ae()}))})();
//# sourceMappingURL=bundle.4eee13a22a3b402d0a71.js.map