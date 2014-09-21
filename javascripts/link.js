define(function(){return{init:function(t,r,a){var e,s,i,y,n,h,o;for(this.bindEvents(),this._datas=a,n=[],this._darray=$.map(a,function(t){return[t]}),e=document.getElementById("c"),s=e.getContext("2d"),this.ctx=s,this.mapW=t,this.mapH=r,this.mapArray=[],h=0,o=0,this.mapArray=this.creatMap(),this.mapArray=this.random(this.mapArray),i=0;i<this.mapH;){for(y=0;y<this.mapW;)0===this.mapArray[i][y]?(this.mapArray[i][y]={},this.mapArray[i][y].type=0,this.mapArray[i][y].nu=0):this.drawImg(this.mapArray[i][y],h,o,i,y),h=h<100*(this.mapW-1)?h+100:0,++y;o=o<100*(this.mapH-1)?o+100:0,++i}},randomPic:function(t){var r;for(r=Math.floor(8*Math.random())-1;!this._darray[t][r];)r=Math.floor(8*Math.random())-1;return r},creatMap:function(){var t,r,a,e;for(a=1,e=[],t=0;t<this.mapH;){for(e.push([]),r=0;r<this.mapW;)0===r||r===this.mapW-1||0===t||t===this.mapH-1?(e[t].push(0),++r):(e[t].push(a),++r,e[t].push(a),++a,++r,a>10&&(a=1));++t}return e},random:function(t){var r,a,e,s,i,y,n,h,o;for(a=1,r=this.mapH-2;r>=a;){for(e=1,i=this.mapW-2;i>=e;)h=parseInt(100*Math.random()%r+1),y=parseInt(100*Math.random()%i+1),o=parseInt(100*Math.random()%r+1),n=parseInt(100*Math.random()%i+1),s=t[h][y],t[h][y]=t[o][n],t[o][n]=s,++e;++a}return t},drawImg:function(t,r,a,e,s){var i,y,n,h;i=this.ctx,h=100,n=100,t-=1,t>=0&&(e&&s&&(y=this.randomPic(t),this.mapArray[e][s]={},this.mapArray[e][s].type=t+1,this.mapArray[e][s].nu=y),i.fillStyle="rgba(255, 255, 255, 0.3)",i.fillRect(r,a,100,100),i.drawImage(document.getElementById(this._darray[t][y]),r,a,98,98),i.lineWidth=1,i.strokeStyle="rgba(255, 255, 255, 0.3)",i.strokeRect(r,a,99,99))},selectImg:function(t,r){var a;a=this.ctx,a.strokeStyle="rgba(0, 0, 0, 0.8)",a.fillRect(100*t,100*r,98,98)},clearImg:function(t){var r;r=this.ctx,r.save(),r.clearRect(100*t.x-1,100*t.y-1,101,101),r.restore(),this.lastPos=null},getImgPos:function(t){var r,a,e,s;return r=t.offsetX||t.layerX,a=t.offsetY||t.layerY,e=Math.floor(r/100),s=Math.floor(a/100),{x:e,y:s}},bindEvents:function(){var t;t=this,$("#c").off().on("click",function(r){var a,e,s,i,y,n,h,o,p;return r.preventDefault(),t.checkDead(),i=t.getImgPos.apply(t,arguments),o=i&&i.x||0,p=i&&i.y||0,e=t.mapArray,0===e[p][o].type||t.lastPos&&o===t.lastPos.x&&p===t.lastPos.y?void 0:(t.selectImg(o,p),t.lastPos&&e[i.y][i.x].type===e[t.lastPos.y][t.lastPos.x].type&&t.getRoad(t.lastPos,i)?t.isSuccess()&&console.log("success"):t.lastPos&&0!==e[t.lastPos.y][t.lastPos.x].type&&(a=t.ctx,y=100*t.lastPos.x,n=100*t.lastPos.y,h=e[t.lastPos.y][t.lastPos.x].type,s=e[t.lastPos.y][t.lastPos.x].nu,a.clearRect(y,n,98,98),a.strokeStyle="rgba(0, 0, 0, 0.8)",a.fillRect(100*o,100*p,98,98),a.drawImage(document.getElementById(t._darray[h-1][s]),y,n,98,98)),t.lastPos={x:o,y:p})})},drawRoad:function(t){var r,a;for(r=this.ctx,r.beginPath(),r.strokeStyle="rgba(0, 0, 0, 0.2)",r.lineWidth=4,r.moveTo(100*t[0].x+50,100*t[0].y+50),a=1;a<t.length;)r.lineTo(100*t[a].x+50,100*t[a].y+50),a++;r.stroke()},clearPath:function(t){var r,a,e,s,i;for(e=this,r=0;r<t.length;)r+1<t.length&&t[r].y===t[r+1].y&&(t[r].x>t[r+1].x?(s=t[r+1].x,a=t[r].x-t[r+1].x+1):t[r].x<t[r+1].x&&(s=t[r].x,a=t[r+1].x-t[r].x+1),this.ctx.clearRect(100*s,100*t[r].y,100*a,100)),r+1<t.length&&t[r].x===t[r+1].x&&(t[r].y>t[r+1].y?(i=t[r+1].y,a=t[r].y-t[r+1].y+1):t[r].y<t[r+1].y&&(i=t[r].y,a=t[r+1].y-t[r].y+1),this.ctx.clearRect(100*t[r].x,100*i,100,100*a)),r++},checkLine:function(t,r){var a,e,s;if(t.x===r.x&&t.y===r.y)return!1;if(t.x===r.x){for(e=r.y>t.y?1:-1,s=t.y+e;s!==r.y;){if(0!==this.mapArray[s][t.x].type)return!1;s+=e}return!0}if(t.y===r.y){for(a=r.x>t.x?1:-1,s=t.x+a;s!==r.x;){if(0!==this.mapArray[t.y][s].type)return!1;s+=a}return!0}return!1},getRoad:function(t,r,a){var e,s,i,y,n,h,o,p,c,m;if(m=this,(t.y===r.y||t.x===r.x)&&this.checkLine(t,r))return a?!0:(c=[t,r],this.mapArray[t.y][t.x].type=0,this.mapArray[r.y][r.x].type=0,this.getConnect(c,[t,r]),!0);for(e=0;2>e;){if(i=null,p=null,0===e?(i=this.mapArray[r.y][t.x].type,p={x:t.x,y:r.y}):(i=this.mapArray[t.y][r.x].type,p={x:r.x,y:t.y}),0===i&&this.checkLine(t,p)&&this.checkLine(p,r))return a?!0:(c=[t,p,r],this.mapArray[t.y][t.x].type=0,this.mapArray[r.y][r.x].type=0,this.getConnect(c,[t,r]),!0);e++}for(e=0;e<this.mapW;)if(e!==t.x&&e!==r.x){if(y=this.mapArray[t.y][e].type,n={x:e,y:t.y},h=this.mapArray[r.y][e].type,o={x:e,y:r.y},0===y&&0===h&&this.checkLine(t,n)&&this.checkLine(n,o)&&this.checkLine(o,r))return a?!0:(c=[t,n,o,r],this.mapArray[t.y][t.x].type=0,this.mapArray[r.y][r.x].type=0,this.getConnect(c,[t,r]),!0);e++}else e++;for(s=0;s<this.mapH;)if(s!==t.y&&s!==r.y){if(y=this.mapArray[s][t.x].type,n={x:t.x,y:s},h=this.mapArray[s][r.x].type,o={x:r.x,y:s},0===y&&0===h&&this.checkLine(t,n)&&this.checkLine(n,o)&&this.checkLine(o,r))return a?!0:(c=[t,n,o,r],this.mapArray[t.y][t.x].type=0,this.mapArray[r.y][r.x].type=0,this.getConnect(c,[t,r]),!0);s++}else s++;return!1},getRandomPot:function(){var t,r;for(t=Math.floor(Math.random()*this.mapW),r=Math.floor(Math.random()*this.mapH);!this.mapArray[r][t].type||0===this.mapArray[r][t].type;)t=Math.floor(Math.random()*this.maoW),r=Math.floor(Math.random()*this.mapH);return{x:t,y:r}},checkDead:function(){var t,r,a,e,s,i;for(r=1;r<this.mapH;){for(a=1;a<this.mapW;)if(this.mapArray[r][a].type&&0!==this.mapArray[r][a].type){for(i={x:a,y:r},e=1;e<this.mapH;){for(s=1;s<this.mapW;)if(this.mapArray[e][s].type&&0!==this.mapArray[e][s].type)if(t={x:s,y:e},i.x!==t.x||i.y!==t.y){if(this.mapArray[r][a].type===this.mapArray[e][s].type&&this.getRoad(i,t,!0))return;s++}else s++;else s++;e++}++a}else a++;++r}this.rearrange()},rearrange:function(){console.log("rearranged")},isSuccess:function(){var t,r;for(t=1;t<this.mapH;){for(r=1;r<this.mapW;){if(0!==this.mapArray[t][r].type)return!1;++r}++t}return!0},getConnect:function(t,r){var a;a=this,this.drawRoad(t),setTimeout(function(){var e;for(e=0;e<r.length;)a.clearImg(r[e]),e++;return a.clearPath(t)},300)},successShow:function(){}}});