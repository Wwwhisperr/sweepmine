let that;class sweepmine{constructor(col,row,minenum){that=this;this.col=col;this.row=row;this.minenum=minenum;this.changepart=document.querySelector(".changemouse");this.changebtn=this.changepart.querySelector("button");this.changetext=this.changepart.querySelector("span");this.table=document.querySelector("table");this.tbody=this.table.querySelector("tbody");this.text=document.querySelector(".text");this.timer=document.querySelector(".timer");this.nowtime="";this.second=0;this.sumarr=[];this.tablearr=[];this.hadopenarr=[];this.firstclick=[];this.gamewinorlost=2;this.myfirstclick=[];this.changeemoji=true;this.createtable();this.clickopen();this.inittext();this.mytimer()}mytimer(){this.starttimer()}starttimer(){this.second=0;this.timer.innerText="00:00:00";this.thistimer=setInterval(that.settimer,1e3)}endtimer(){clearInterval(that.thistimer)}settimer(){that.second+=1;that.timerfunction();that.timer.innerText=that.nowtime}timerfunction(){let second="";let hour="";let minute="";if(this.second%60!=0){if(this.second%60<10){second="0"+this.second%60}else{second=this.second%60}}else{second="00"}let myminute=Math.floor(this.second/60%60);if(myminute!=0){if(myminute<10){minute="0"+myminute}else{minute=myminute}}else{minute="00"}let myhour=Math.floor(this.second/3600);if(this.second>3600){if(myhour<10){hour="0"+myhour}else{hour=myhour}}else{hour="00"}this.nowtime=hour+":"+minute+":"+second}inittext(){if(this.minenum==10){that.text.innerHTML="初级扫雷";that.text.style.color="#000"}if(this.minenum==40){that.text.innerHTML="中级扫雷";that.text.style.color="#000"}if(this.minenum==99){that.text.innerHTML="高级扫雷";that.text.style.color="#000"}}changefunction(){that.changeemoji=!that.changeemoji;if(that.changeemoji){that.changetext.innerHTML="👆🏻";for(let j=0;j<that.tr.length;j++){that.td=that.tr[j].querySelectorAll("td");for(let i=0;i<that.td.length;i++){that.td[i].removeEventListener("click",that.flag);that.td[i].addEventListener("click",that.click)}}}else{that.changetext.innerHTML="🚩";for(let j=0;j<that.tr.length;j++){that.td=that.tr[j].querySelectorAll("td");for(let i=0;i<that.td.length;i++){that.td[i].addEventListener("click",that.flag);that.td[i].removeEventListener("click",that.click);that.td[i].addEventListener("click",function(){let div=this.querySelector("div");if(this.id!="x"&&this.className=="open"&&div.outerText!=0){that.openeasy(div.outerText,this)}});that.td[i].addEventListener("click",that.clickflagfunction)}}}}clickflagfunction(){if(this.id!="x"&&that.hadopenarr.indexOf(this.id)==-1){that.hadopenarr.push(this.id)}that.win()}init(){this.tr=this.tbody.querySelectorAll("tr")}createtable(){this.timer.style.color="black";console.log(this.col);for(let i=0;i<this.col;i++){this.tbody.insertAdjacentHTML("beforeend","<tr></tr>")}this.init();for(let j=0;j<this.tr.length;j++){this.trr=this.tr[j];for(let i=0;i<this.row;i++){this.trr.insertAdjacentHTML("beforeend","<td><div></div></td>");this.td=this.trr.querySelectorAll("td");this.td[i].id=j+"_"+i}}}createminearr(){for(let a=0;a<this.minenum;a++){let x=parseInt(Math.random()*this.col);let y=parseInt(Math.random()*this.row);console.log(x);this.sumarr[a]=[x,y]}}clickopen(){this.init();for(let i=0;i<this.tr.length;i++){this.td=this.tr[i].querySelectorAll("td");for(let j=0;j<this.td.length;j++){this.td[j].addEventListener("click",this.click)}}this.changebtn.addEventListener("click",this.changefunction);for(let j=0;j<this.tr.length;j++){this.td=this.tr[j].querySelectorAll("td");for(let i=0;i<this.td.length;i++){this.td[i].addEventListener("contextmenu",this.flag)}}}createmine(){that.createminearr();this.sumarr=this.ifexit(this.sumarr);for(let a=0;a<this.sumarr.length;a++){this.init();this.trr=this.tr[this.sumarr[a][0]];this.td=this.trr.querySelectorAll("td");this.td[this.sumarr[a][1]].id="x";this.div=this.td[this.sumarr[a][1]].querySelector("div");this.div.innerHTML="💣"}}ifexit(){for(let i=0;i<this.sumarr.length-1;i++){for(let j=i+1;j<this.sumarr.length;j++){if(this.sumarr[i][0]==this.sumarr[j][0]&&this.sumarr[i][1]==this.sumarr[j][1]){this.sumarr.splice(j,1);this.x=parseInt(Math.random()*this.col);this.y=parseInt(Math.random()*this.row);this.sumarr.push([this.x,this.y]);this.ifexit(this.sumarr)}}}let myfirstclick0=parseInt(that.myfirstclick[0]);let myfirstclick1=parseInt(that.myfirstclick[1]);for(let i=0;i<this.sumarr.length;i++){if(myfirstclick0==this.sumarr[i][0]&&myfirstclick1==this.sumarr[i][1]||myfirstclick0-1==this.sumarr[i][0]&&myfirstclick1-1==this.sumarr[i][1]||myfirstclick0-1==this.sumarr[i][0]&&myfirstclick1==this.sumarr[i][1]||myfirstclick0-1==this.sumarr[i][0]&&myfirstclick1+1==this.sumarr[i][1]||myfirstclick0==this.sumarr[i][0]&&myfirstclick1-1==this.sumarr[i][1]||myfirstclick0==this.sumarr[i][0]&&myfirstclick1+1==this.sumarr[i][1]||myfirstclick0+1==this.sumarr[i][0]&&myfirstclick1-1==this.sumarr[i][1]||myfirstclick0+1==this.sumarr[i][0]&&myfirstclick1==this.sumarr[i][1]||myfirstclick0+1==this.sumarr[i][0]&&myfirstclick1+1==this.sumarr[i][1]){this.sumarr.splice(i,1);this.x=parseInt(Math.random()*this.col);this.y=parseInt(Math.random()*this.row);this.sumarr.push([this.x,this.y]);this.ifexit(this.sumarr)}}return this.sumarr}sum(){this.init();for(let i=0;i<this.tr.length;i++){this.td=this.tr[i].querySelectorAll("td");for(let j=0;j<this.td.length;j++){this.div=this.td[j].querySelector("div");let num=0;for(let a=0;a<this.sumarr.length;a++){if(i==this.sumarr[a][0]&&j==this.sumarr[a][1]){break}else{if(i-1==this.sumarr[a][0]&&j-1==this.sumarr[a][1]){num+=1}else if(i-1==this.sumarr[a][0]&&j==this.sumarr[a][1]){num+=1}else if(i-1==this.sumarr[a][0]&&j+1==this.sumarr[a][1]){num+=1}else if(i==this.sumarr[a][0]&&j-1==this.sumarr[a][1]){num+=1}else if(i==this.sumarr[a][0]&&j+1==this.sumarr[a][1]){num+=1}else if(i+1==this.sumarr[a][0]&&j-1==this.sumarr[a][1]){num+=1}else if(i+1==this.sumarr[a][0]&&j==this.sumarr[a][1]){num+=1}else if(i+1==this.sumarr[a][0]&&j+1==this.sumarr[a][1]){num+=1}}if(a==this.sumarr.length-1){num=parseInt(num);this.div.innerHTML=num}}}}}failmine(thistd){if(thistd.className!="on"){that.removemineclick();that.openmine();that.changebtn.removeEventListener("click",that.changefunction);that.text.innerHTML="😟输了";that.timer.style.color="red";that.text.style.color="red";thistd.style.backgroundColor="#E37979";that.removeflag();this.endtimer()}}removemineclick(){this.init();for(let i=0;i<this.tr.length;i++){this.td=this.tr[i].querySelectorAll("td");for(let j=0;j<this.td.length;j++){this.td[j].removeEventListener("click",that.click);this.td[j].removeEventListener("click",that.failmine);this.td[j].removeEventListener("click",that.clickflagfunction);this.td[j].removeEventListener("click",that.flag)}}}flag(e){if(this.className!="open"){if(this.className!="on"){this.style.backgroundColor="#979797";this.removeEventListener("click",that.click);this.className="on"}else{this.style.backgroundColor="#bbb";this.addEventListener("click",that.click);this.className=""}}e.preventDefault()}removeflag(){this.init();for(let i=0;i<this.tr.length;i++){this.td=this.tr[i].querySelectorAll("td");for(let j=0;j<this.td.length;j++){this.td[j].removeEventListener("contextmenu",this.flag)}}}clickzero(thistd){let div=thistd.querySelector("div");if(div.outerText==0){div.style.visibility="hidden"}let idd=thistd.id.split("_");let y=parseInt(idd[0]);let x=parseInt(idd[1]);let xp=x+1;let yp=y+1;let xj=x-1;let yj=y-1;let youj=parseInt(this.row)-1;let xiaj=parseInt(this.col)-1;let checknum=0;if(x!=0){let zuo=y+"_"+xj;if(y!=0){let zuoshang=yj+"_"+xj;that.otheropen(zuoshang)}if(y!=xiaj){let zuoxia=yp+"_"+xj;that.otheropen(zuoxia)}that.otheropen(zuo)}if(x!=youj){let you=y+"_"+xp;if(y!=0){let youshang=yj+"_"+xp;that.otheropen(youshang)}if(y!=xiaj){let youxia=yp+"_"+xp;that.otheropen(youxia)}that.otheropen(you)}if(y!=0){let shang=yj+"_"+x;that.otheropen(shang)}if(y!=xiaj){let xia=yp+"_"+x;that.otheropen(xia)}}openeasy(thisnum,thistd){if(that.checkflagandnum(thistd)[0]==thisnum){if(that.checkflagandnum(thistd)[1].length==0){that.clickzero(thistd)}else{let falsetd=that.checkflagandnum(thistd)[1];for(let i=0;i<that.sumarr.length;i++){if(that.sumarr[i][0]==parseInt(falsetd[0][0])&&that.sumarr[i][1]==parseInt(falsetd[0][1])){let tr=that.tbody.querySelectorAll("tr");let tdlist=tr[that.sumarr[i][0]];let td=tdlist.querySelectorAll("td");let thismytd=td[that.sumarr[i][1]];that.failmine(thismytd)}}}}}checkflagandnum(thistd){let div=thistd.querySelector("div");let idd=thistd.id.split("_");let y=parseInt(idd[0]);let x=parseInt(idd[1]);let xp=x+1;let yp=y+1;let xj=x-1;let yj=y-1;let xiaj=parseInt(this.col)-1;let youj=parseInt(this.row)-1;let checknum=0;let arr=[];if(x!=0){let zuo=y+"_"+xj;if(y!=0){let zuoshang=yj+"_"+xj;checknum+=that.checkfunction(zuoshang)[0];if(that.checkfunction(zuoshang)[1]!=0){arr.push(that.checkfunction(zuoshang)[1])}}if(y!=xiaj){let zuoxia=yp+"_"+xj;checknum+=that.checkfunction(zuoxia)[0];if(that.checkfunction(zuoxia)[1]!=0){arr.push(that.checkfunction(zuoxia)[1])}}checknum+=that.checkfunction(zuo)[0];if(that.checkfunction(zuo)[1]!=0){arr.push(that.checkfunction(zuo)[1])}}if(x!=youj){let you=y+"_"+xp;if(y!=0){let youshang=yj+"_"+xp;checknum+=that.checkfunction(youshang)[0];if(that.checkfunction(youshang)[1]!=0){arr.push(that.checkfunction(youshang)[1])}}if(y!=xiaj){let youxia=yp+"_"+xp;checknum+=that.checkfunction(youxia)[0];if(that.checkfunction(youxia)[1]!=0){arr.push(that.checkfunction(youxia)[1])}}checknum+=that.checkfunction(you)[0];if(that.checkfunction(you)[1]!=0){arr.push(that.checkfunction(you)[1])}}if(y!=0){let shang=yj+"_"+x;checknum+=that.checkfunction(shang)[0];if(that.checkfunction(shang)[1]!=0){arr.push(that.checkfunction(shang)[1])}}if(y!=xiaj){let xia=yp+"_"+x;checknum+=that.checkfunction(xia)[0];if(that.checkfunction(xia)[1]!=0){arr.push(that.checkfunction(xia)[1])}}return[checknum,arr]}checkfunction(aaa){aaa=aaa.split("_");this.z=parseInt(aaa[0]);this.y=parseInt(aaa[1]);this.init();let arr=[];this.td=this.tr[this.z].querySelectorAll("td");let tdd=this.td[this.y];this.div=this.td[this.y].querySelector("div");if(tdd.id=="x"&&tdd.className!="on"){arr[1]=aaa}else{arr[1]=0}if(tdd.className=="on"){arr[0]=1}else{arr[0]=0}return arr}click(){if(this.id!="x"&&that.hadopenarr.indexOf(this.id)==-1){that.hadopenarr.push(this.id)}if(this.className!="on"){this.div=this.querySelector("div");this.div.style.visibility="visible";this.style.backgroundColor="#e5e5e5";this.className="open"}if(that.hadopenarr.length==1){that.myfirstclick=this.id.split("_");that.createmine();that.sum()}if(this.id=="x"&&this.className!="on"){that.failmine(this)}if(this.id!="x"&&this.className=="open"&&this.div.outerText!=0){that.openeasy(this.div.outerText,this)}if(this.div.outerText==0){this.div.style.visibility="hidden";that.clickzero(this)}that.win()}win(){let row=parseInt(that.row);let col=parseInt(that.col);let minenum=parseInt(that.minenum);let winnum=row*col-minenum;if(that.hadopenarr.length==winnum){that.text.innerHTML="你赢啦！🎉";that.text.style.color="green";that.timer.style.color="green";that.changebtn.removeEventListener("click",that.changefunction);that.removemineclick();that.removeflag();this.endtimer()}}otheropen(o){o=o.split("_");this.z=parseInt(o[0]);this.y=parseInt(o[1]);this.init();let tdlist=this.tr[this.z].querySelectorAll("td");let td=tdlist[this.y];let div=td.querySelector("div");if(td.className!="on"&&td.id!="x"){div.style.visibility="visible";td.style.backgroundColor="#e5e5e5";td.className="open";if(div.outerText==0){div.style.visibility="hidden"}if(that.hadopenarr.indexOf(td.id)==-1){that.hadopenarr.push(td.id);let odiv=td.querySelector("div");let thisss=td;if(odiv.outerText==0){setTimeout(function(){that.yibu(thisss)},2)}}else{return}}}yibu(td){that.clickzero(td)}openmine(){this.init();for(let a=0;a<that.sumarr.length;a++){this.td=this.tr[that.sumarr[a][0]].querySelectorAll("td");this.div=this.td[that.sumarr[a][1]].querySelector("div");this.td[that.sumarr[a][1]].style.backgroundColor="#D2B4B4";this.td[that.sumarr[a][1]].className="";this.div.style.visibility="visible"}}openminewin(){this.init();for(let a=0;a<that.sumarr.length;a++){this.td=this.tr[that.sumarr[a][0]].querySelectorAll("td");this.div=this.td[that.sumarr[a][1]].querySelector("div");this.td[that.sumarr[a][1]].style.backgroundColor="#bbb";this.td[that.sumarr[a][1]].className="";this.div.style.visibility="visible"}}}new sweepmine(10,9,10);let box=document.querySelector(".level");let btn=box.querySelectorAll("button");function initboard(){let table=document.querySelector("table");let tbody=table.querySelector("tbody");let tr=tbody.firstElementChild;while(tr){tr.remove();tr=tbody.firstElementChild}}btn[0].addEventListener("click",function(){that.endtimer();initboard();that.changetext.innerHTML="👆🏻";this.one=new sweepmine(10,9,10);this.one=null});btn[1].addEventListener("click",function(){that.endtimer();initboard();that.changetext.innerHTML="👆🏻";this.two=new sweepmine(14,20,40);this.two=null});btn[2].addEventListener("click",function(){that.endtimer();initboard();that.changetext.innerHTML="👆🏻";this.three=new sweepmine(20,35,99);this.three=null});